import { useState } from 'react'
import type { Transaccion, TipoTransaccion } from '../types'
import { CATEGORIAS_INGRESO, CATEGORIAS_GASTO } from '../types'

interface FormularioTransaccionProps {
  transaccionEditando: Transaccion | null
  onGuardar: (datos: Omit<Transaccion, 'id'>) => void
  onCancelarEdicion: () => void
}

function fechaDeHoy(): string {
  return new Date().toISOString().slice(0, 10)
}

const ESTADO_INICIAL = {
  tipo: 'gasto' as TipoTransaccion,
  categoria: '',
  descripcion: '',
  monto: '',
  fecha: fechaDeHoy(),
}

/**
 * Formulario para registrar o editar una transacción.
 * Valida tipo, categoría, descripción, monto y fecha antes de guardar.
 *
 * Nota: el componente padre debe pasar una `key` distinta (por ejemplo
 * el id de la transacción o 'nuevo') para que React reinicie el estado
 * interno al cambiar entre modo creación y edición.
 */
export default function FormularioTransaccion({
  transaccionEditando,
  onGuardar,
  onCancelarEdicion,
}: FormularioTransaccionProps) {
  const [tipo, setTipo] = useState<TipoTransaccion>(
    transaccionEditando?.tipo ?? ESTADO_INICIAL.tipo
  )
  const [categoria, setCategoria] = useState(
    transaccionEditando?.categoria ?? ESTADO_INICIAL.categoria
  )
  const [descripcion, setDescripcion] = useState(
    transaccionEditando?.descripcion ?? ESTADO_INICIAL.descripcion
  )
  const [monto, setMonto] = useState(
    transaccionEditando ? String(transaccionEditando.monto) : ESTADO_INICIAL.monto
  )
  const [fecha, setFecha] = useState(
    transaccionEditando?.fecha ?? ESTADO_INICIAL.fecha
  )
  const [errores, setErrores] = useState<Record<string, string>>({})

  const categorias = tipo === 'ingreso' ? CATEGORIAS_INGRESO : CATEGORIAS_GASTO

  function limpiarFormulario() {
    setTipo(ESTADO_INICIAL.tipo)
    setCategoria(ESTADO_INICIAL.categoria)
    setDescripcion(ESTADO_INICIAL.descripcion)
    setMonto(ESTADO_INICIAL.monto)
    setFecha(fechaDeHoy())
    setErrores({})
  }

  function validar(): boolean {
    const nuevosErrores: Record<string, string> = {}
    const montoNumerico = Number(monto)

    if (!categoria) {
      nuevosErrores.categoria = 'Selecciona una categoría'
    }
    if (!descripcion.trim() || descripcion.length > 100) {
      nuevosErrores.descripcion =
        'La descripción es obligatoria y debe tener máximo 100 caracteres'
    }
    if (!monto || Number.isNaN(montoNumerico) || montoNumerico <= 0) {
      nuevosErrores.monto = 'El monto debe ser un número mayor que cero'
    }
    if (!fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function manejarEnvio(evento: React.FormEvent) {
    evento.preventDefault()
    if (!validar()) return

    onGuardar({
      tipo,
      categoria,
      descripcion: descripcion.trim(),
      monto: Number(monto),
      fecha,
    })

    limpiarFormulario()
  }

  function manejarCancelar() {
    limpiarFormulario()
    onCancelarEdicion()
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6"
    >
      <h2 className="font-bold text-lg text-gray-900">
        {transaccionEditando ? 'Editar transacción' : 'Nueva transacción'}
      </h2>

      <div className="flex gap-2" role="radiogroup" aria-label="Tipo de transacción">
        {(['gasto', 'ingreso'] as TipoTransaccion[]).map((opcion) => (
          <button
            key={opcion}
            type="button"
            role="radio"
            aria-checked={tipo === opcion}
            onClick={() => {
              setTipo(opcion)
              setCategoria('')
            }}
            className={`flex-1 rounded-xl p-3 font-medium capitalize transition ${
              tipo === opcion
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Categoría
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="rounded-xl border border-gray-200 p-3 font-medium text-gray-900 focus:border-gray-500 focus:outline-none"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errores.categoria && (
            <span className="text-sm font-medium text-gray-900">
              {errores.categoria}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Monto
          <input
            type="number"
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0.00"
            className="rounded-xl border border-gray-200 p-3 font-medium text-gray-900 focus:border-gray-500 focus:outline-none"
          />
          {errores.monto && (
            <span className="text-sm font-medium text-gray-900">
              {errores.monto}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 sm:col-span-2">
          Descripción
          <input
            type="text"
            value={descripcion}
            maxLength={100}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej. Almuerzo con amigos"
            className="rounded-xl border border-gray-200 p-3 font-medium text-gray-900 focus:border-gray-500 focus:outline-none"
          />
          {errores.descripcion && (
            <span className="text-sm font-medium text-gray-900">
              {errores.descripcion}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Fecha
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="rounded-xl border border-gray-200 p-3 font-medium text-gray-900 focus:border-gray-500 focus:outline-none"
          />
          {errores.fecha && (
            <span className="text-sm font-medium text-gray-900">
              {errores.fecha}
            </span>
          )}
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gray-900 p-3 font-bold text-white hover:bg-gray-700"
        >
          {transaccionEditando ? 'Guardar cambios' : 'Agregar transacción'}
        </button>
        {transaccionEditando && (
          <button
            type="button"
            onClick={manejarCancelar}
            className="rounded-xl bg-gray-100 p-3 font-bold text-gray-600 hover:bg-gray-200"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

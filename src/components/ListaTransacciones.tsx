import type { FiltroTipo, Transaccion } from '../types'
import { filtrarPorTipo, ordenarPorFechaDescendente } from '../utils/finanzas'
import TarjetaTransaccion from './TarjetaTransaccion'

interface ListaTransaccionesProps {
  transacciones: Transaccion[]
  filtro: FiltroTipo
  onCambiarFiltro: (filtro: FiltroTipo) => void
  onEliminar: (id: number) => void
  onEditar: (transaccion: Transaccion) => void
}

const OPCIONES_FILTRO: { valor: FiltroTipo; etiqueta: string }[] = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'ingreso', etiqueta: 'Ingresos' },
  { valor: 'gasto', etiqueta: 'Gastos' },
]

/**
 * Muestra la lista de transacciones filtradas y ordenadas,
 * junto con los controles de filtro por tipo.
 */
export default function ListaTransacciones({
  transacciones,
  filtro,
  onCambiarFiltro,
  onEliminar,
  onEditar,
}: ListaTransaccionesProps) {
  const filtradas = filtrarPorTipo(transacciones, filtro)
  const ordenadas = ordenarPorFechaDescendente(filtradas)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2" role="tablist" aria-label="Filtrar transacciones">
        {OPCIONES_FILTRO.map((opcion) => (
          <button
            key={opcion.valor}
            type="button"
            role="tab"
            aria-selected={filtro === opcion.valor}
            onClick={() => onCambiarFiltro(opcion.valor)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              filtro === opcion.valor
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>

      {ordenadas.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
          Aún no tienes transacciones
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {ordenadas.map((transaccion) => (
            <TarjetaTransaccion
              key={transaccion.id}
              transaccion={transaccion}
              onEliminar={onEliminar}
              onEditar={onEditar}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

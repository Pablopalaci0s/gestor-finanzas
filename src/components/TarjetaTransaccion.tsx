import type { Transaccion } from '../types'
import { formatearMoneda } from '../utils/finanzas'

interface TarjetaTransaccionProps {
  transaccion: Transaccion
  onEliminar: (id: number) => void
  onEditar: (transaccion: Transaccion) => void
}

/**
 * Muestra una transacción individual con sus datos y acciones
 * de editar y eliminar.
 */
export default function TarjetaTransaccion({
  transaccion,
  onEliminar,
  onEditar,
}: TarjetaTransaccionProps) {
  const esIngreso = transaccion.tipo === 'ingreso'

  function manejarEliminar() {
    const confirmado = window.confirm(
      `¿Seguro que deseas eliminar "${transaccion.descripcion}"?`
    )
    if (confirmado) {
      onEliminar(transaccion.id)
    }
  }

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md border px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
              esIngreso
                ? 'border-gray-300 text-gray-700'
                : 'border-gray-900 bg-gray-900 text-white'
            }`}
          >
            {esIngreso ? 'Ingreso' : 'Gasto'}
          </span>
          <p className="truncate font-medium text-gray-900">
            {transaccion.descripcion}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {transaccion.categoria} · {transaccion.fecha}
        </p>
      </div>

      <p className="font-bold text-gray-900">
        {esIngreso ? '+' : '-'}
        {formatearMoneda(transaccion.monto)}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          aria-label={`Editar ${transaccion.descripcion}`}
          onClick={() => onEditar(transaccion)}
          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          ✏️
        </button>
        <button
          type="button"
          aria-label={`Eliminar ${transaccion.descripcion}`}
          onClick={manejarEliminar}
          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}

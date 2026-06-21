import type { Resumen } from '../types'
import { formatearMoneda } from '../utils/finanzas'

interface ResumenFinancieroProps {
  resumen: Resumen
}

/**
 * Panel que muestra el total de ingresos, gastos y el balance
 * con color e indicador según sea positivo o negativo.
 */
export default function ResumenFinanciero({ resumen }: ResumenFinancieroProps) {
  const { totalIngresos, totalGastos, balance } = resumen
  const esPositivo = balance >= 0

  return (
    <section
      aria-label="Resumen financiero"
      className="grid gap-4 sm:grid-cols-3"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="font-medium text-gray-500">Total de ingresos</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {formatearMoneda(totalIngresos)}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="font-medium text-gray-500">Total de gastos</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {formatearMoneda(totalGastos)}
        </p>
      </div>

      <div
        className={`rounded-xl p-6 ${
          esPositivo ? 'border border-gray-200 bg-white' : 'bg-gray-900'
        }`}
      >
        <p
          className={`font-medium ${
            esPositivo ? 'text-gray-500' : 'text-gray-300'
          }`}
        >
          Balance
        </p>
        <p
          className={`mt-2 text-2xl font-bold ${
            esPositivo ? 'text-gray-900' : 'text-white'
          }`}
        >
          {formatearMoneda(balance)}
        </p>
        <p
          className={`mt-1 text-sm ${
            esPositivo ? 'text-gray-500' : 'text-gray-300'
          }`}
        >
          {esPositivo
            ? 'Vas bien, tus ingresos superan tus gastos'
            : 'Cuidado: tus gastos superan tus ingresos'}
        </p>
      </div>
    </section>
  )
}

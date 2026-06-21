import type { Transaccion, Resumen, FiltroTipo } from '../types'

/**
 * Calcula el resumen financiero (ingresos, gastos y balance) a partir
 * de una lista de transacciones.
 */
export function calcularResumen(transacciones: Transaccion[]): Resumen {
  const totalIngresos = transacciones
    .filter((t) => t.tipo === 'ingreso')
    .reduce((suma, t) => suma + t.monto, 0)

  const totalGastos = transacciones
    .filter((t) => t.tipo === 'gasto')
    .reduce((suma, t) => suma + t.monto, 0)

  return {
    totalIngresos,
    totalGastos,
    balance: totalIngresos - totalGastos,
  }
}

/**
 * Filtra las transacciones según el tipo seleccionado.
 * Si el filtro es 'todas', devuelve la lista completa sin modificar.
 */
export function filtrarPorTipo(
  transacciones: Transaccion[],
  filtro: FiltroTipo
): Transaccion[] {
  if (filtro === 'todas') return transacciones
  return transacciones.filter((t) => t.tipo === filtro)
}

/**
 * Ordena las transacciones por fecha descendente (más recientes primero).
 * No muta el arreglo original.
 */
export function ordenarPorFechaDescendente(
  transacciones: Transaccion[]
): Transaccion[] {
  return [...transacciones].sort((a, b) => b.fecha.localeCompare(a.fecha))
}

/**
 * Formatea un número como moneda en formato $1,234.56
 */
export function formatearMoneda(monto: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(monto)
}

/**
 * Genera un id único basado en timestamp + número aleatorio,
 * suficiente para uso local sin backend.
 */
export function generarId(): number {
  return Date.now() + Math.floor(Math.random() * 1000)
}

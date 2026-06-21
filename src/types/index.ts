export type TipoTransaccion = 'ingreso' | 'gasto'

export interface Transaccion {
  id: number
  tipo: TipoTransaccion
  categoria: string
  descripcion: string
  monto: number
  fecha: string // 'YYYY-MM-DD'
}

export interface Resumen {
  totalIngresos: number
  totalGastos: number
  balance: number
}

export type FiltroTipo = 'todas' | TipoTransaccion

export const CATEGORIAS_INGRESO = ['Salario', 'Freelance', 'Otros ingresos'] as const

export const CATEGORIAS_GASTO = [
  'Alimentación',
  'Transporte',
  'Salud',
  'Entretenimiento',
  'Servicios',
  'Otros',
] as const

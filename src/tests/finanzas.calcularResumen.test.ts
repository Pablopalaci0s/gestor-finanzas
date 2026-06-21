import { describe, it, expect } from 'vitest'
import { calcularResumen } from '../utils/finanzas'
import type { Transaccion } from '../types'

const transacciones: Transaccion[] = [
  {
    id: 1,
    tipo: 'ingreso',
    categoria: 'Salario',
    descripcion: 'Pago mensual',
    monto: 1000,
    fecha: '2026-06-01',
  },
  {
    id: 2,
    tipo: 'gasto',
    categoria: 'Alimentación',
    descripcion: 'Supermercado',
    monto: 200,
    fecha: '2026-06-02',
  },
  {
    id: 3,
    tipo: 'gasto',
    categoria: 'Transporte',
    descripcion: 'Gasolina',
    monto: 50,
    fecha: '2026-06-03',
  },
]

describe('calcularResumen', () => {
  it('calcula correctamente el total de ingresos y gastos', () => {
    // Arrange: lista de transacciones ya definida arriba

    // Act
    const resumen = calcularResumen(transacciones)

    // Assert
    expect(resumen.totalIngresos).toBe(1000)
    expect(resumen.totalGastos).toBe(250)
  })

  it('calcula un balance positivo cuando los ingresos superan los gastos', () => {
    // Arrange
    const datos = transacciones

    // Act
    const resumen = calcularResumen(datos)

    // Assert
    expect(resumen.balance).toBe(750)
    expect(resumen.balance).toBeGreaterThan(0)
  })

  it('devuelve totales en cero cuando no hay transacciones', () => {
    // Arrange
    const listaVacia: Transaccion[] = []

    // Act
    const resumen = calcularResumen(listaVacia)

    // Assert
    expect(resumen).toEqual({
      totalIngresos: 0,
      totalGastos: 0,
      balance: 0,
    })
  })
})

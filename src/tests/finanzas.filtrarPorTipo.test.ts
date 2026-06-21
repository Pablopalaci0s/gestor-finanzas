import { describe, it, expect } from 'vitest'
import { filtrarPorTipo } from '../utils/finanzas'
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
]

describe('filtrarPorTipo', () => {
  it('devuelve solo las transacciones de tipo ingreso', () => {
    // Arrange
    const filtro = 'ingreso'

    // Act
    const resultado = filtrarPorTipo(transacciones, filtro)

    // Assert
    expect(resultado).toHaveLength(1)
    expect(resultado[0].tipo).toBe('ingreso')
  })

  it('devuelve la lista completa cuando el filtro es "todas"', () => {
    // Arrange
    const filtro = 'todas'

    // Act
    const resultado = filtrarPorTipo(transacciones, filtro)

    // Assert
    expect(resultado).toHaveLength(2)
  })
})

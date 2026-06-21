import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ListaTransacciones from '../components/ListaTransacciones'
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
]

describe('ListaTransacciones', () => {
  it('muestra el mensaje "Aún no tienes transacciones" cuando la lista está vacía', () => {
    // Arrange
    render(
      <ListaTransacciones
        transacciones={[]}
        filtro="todas"
        onCambiarFiltro={vi.fn()}
        onEliminar={vi.fn()}
        onEditar={vi.fn()}
      />
    )

    // Act: el render ya ocurrió en el arrange

    // Assert
    expect(
      screen.getByText('Aún no tienes transacciones')
    ).toBeInTheDocument()
  })

  it('muestra las transacciones cuando la lista tiene elementos', () => {
    // Arrange
    render(
      <ListaTransacciones
        transacciones={transacciones}
        filtro="todas"
        onCambiarFiltro={vi.fn()}
        onEliminar={vi.fn()}
        onEditar={vi.fn()}
      />
    )

    // Act: el render ya ocurrió en el arrange

    // Assert
    expect(screen.getByText('Pago mensual')).toBeInTheDocument()
    expect(
      screen.queryByText('Aún no tienes transacciones')
    ).not.toBeInTheDocument()
  })
})

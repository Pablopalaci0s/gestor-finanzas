import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TarjetaTransaccion from '../components/TarjetaTransaccion'
import type { Transaccion } from '../types'

const transaccionIngreso: Transaccion = {
  id: 1,
  tipo: 'ingreso',
  categoria: 'Salario',
  descripcion: 'Pago mensual',
  monto: 1500,
  fecha: '2026-06-01',
}

const transaccionGasto: Transaccion = {
  id: 2,
  tipo: 'gasto',
  categoria: 'Alimentación',
  descripcion: 'Supermercado',
  monto: 80,
  fecha: '2026-06-02',
}

describe('TarjetaTransaccion', () => {
  it('muestra la descripción, categoría y monto formateado de la transacción', () => {
    // Arrange
    render(
      <TarjetaTransaccion
        transaccion={transaccionIngreso}
        onEliminar={vi.fn()}
        onEditar={vi.fn()}
      />
    )

    // Act: el render ya ocurrió en el arrange

    // Assert
    expect(screen.getByText('Pago mensual')).toBeInTheDocument()
    expect(screen.getByText(/Salario/)).toBeInTheDocument()
    expect(screen.getByText('+$1,500.00')).toBeInTheDocument()
  })

  it('muestra el monto de un gasto con signo negativo', () => {
    // Arrange
    render(
      <TarjetaTransaccion
        transaccion={transaccionGasto}
        onEliminar={vi.fn()}
        onEditar={vi.fn()}
      />
    )

    // Act / Assert
    expect(screen.getByText('-$80.00')).toBeInTheDocument()
  })

  it('llama a onEditar con la transacción al hacer clic en editar', async () => {
    // Arrange
    const onEditar = vi.fn()
    const usuario = userEvent.setup()
    render(
      <TarjetaTransaccion
        transaccion={transaccionIngreso}
        onEliminar={vi.fn()}
        onEditar={onEditar}
      />
    )

    // Act
    await usuario.click(
      screen.getByRole('button', { name: /editar pago mensual/i })
    )

    // Assert
    expect(onEditar).toHaveBeenCalledWith(transaccionIngreso)
  })
})

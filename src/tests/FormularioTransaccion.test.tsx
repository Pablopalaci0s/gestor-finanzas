import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioTransaccion from '../components/FormularioTransaccion'

describe('FormularioTransaccion', () => {
  it('muestra un error y no guarda cuando la descripción está vacía', async () => {
    // Arrange
    const onGuardar = vi.fn()
    const usuario = userEvent.setup()
    render(
      <FormularioTransaccion
        transaccionEditando={null}
        onGuardar={onGuardar}
        onCancelarEdicion={vi.fn()}
      />
    )

    // Act
    await usuario.click(
      screen.getByRole('button', { name: /agregar transacción/i })
    )

    // Assert
    expect(onGuardar).not.toHaveBeenCalled()
    expect(
      screen.getByText(/la descripción es obligatoria/i)
    ).toBeInTheDocument()
  })

  it('llama a onGuardar con los datos correctos al completar el formulario', async () => {
    // Arrange
    const onGuardar = vi.fn()
    const usuario = userEvent.setup()
    render(
      <FormularioTransaccion
        transaccionEditando={null}
        onGuardar={onGuardar}
        onCancelarEdicion={vi.fn()}
      />
    )

    // Act
    await usuario.selectOptions(
      screen.getByRole('combobox'),
      'Alimentación'
    )
    await usuario.type(
      screen.getByPlaceholderText(/almuerzo con amigos/i),
      'Cena familiar'
    )
    await usuario.type(screen.getByPlaceholderText('0.00'), '45.50')
    await usuario.click(
      screen.getByRole('button', { name: /agregar transacción/i })
    )

    // Assert
    expect(onGuardar).toHaveBeenCalledWith(
      expect.objectContaining({
        tipo: 'gasto',
        categoria: 'Alimentación',
        descripcion: 'Cena familiar',
        monto: 45.5,
      })
    )
  })

  it('cambia las categorías disponibles al seleccionar el tipo ingreso', async () => {
    // Arrange
    const usuario = userEvent.setup()
    render(
      <FormularioTransaccion
        transaccionEditando={null}
        onGuardar={vi.fn()}
        onCancelarEdicion={vi.fn()}
      />
    )

    // Act
    await usuario.click(screen.getByRole('radio', { name: /ingreso/i }))

    // Assert
    expect(
      screen.getByRole('option', { name: 'Salario' })
    ).toBeInTheDocument()
  })
})

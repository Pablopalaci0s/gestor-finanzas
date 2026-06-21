import { useState } from 'react'
import type { FiltroTipo, Transaccion } from './types'
import { useTransacciones } from './hooks/useTransacciones'
import { calcularResumen } from './utils/finanzas'
import FormularioTransaccion from './components/FormularioTransaccion'
import ResumenFinanciero from './components/ResumenFinanciero'
import ListaTransacciones from './components/ListaTransacciones'

function App() {
  const { transacciones, agregarTransaccion, editarTransaccion, eliminarTransaccion } =
    useTransacciones()
  const [filtro, setFiltro] = useState<FiltroTipo>('todas')
  const [transaccionEditando, setTransaccionEditando] = useState<Transaccion | null>(
    null
  )

  const resumen = calcularResumen(transacciones)

  function manejarGuardar(datos: Omit<Transaccion, 'id'>) {
    if (transaccionEditando) {
      editarTransaccion(transaccionEditando.id, datos)
      setTransaccionEditando(null)
    } else {
      agregarTransaccion(datos)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestor de Finanzas Personales</h1>
        <p className="font-medium text-gray-500">
          Registra tus ingresos y gastos, y controla tu balance en tiempo real
        </p>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
        <ResumenFinanciero resumen={resumen} />

        <FormularioTransaccion
          key={transaccionEditando?.id ?? 'nuevo'}
          transaccionEditando={transaccionEditando}
          onGuardar={manejarGuardar}
          onCancelarEdicion={() => setTransaccionEditando(null)}
        />

        <ListaTransacciones
          transacciones={transacciones}
          filtro={filtro}
          onCambiarFiltro={setFiltro}
          onEliminar={eliminarTransaccion}
          onEditar={setTransaccionEditando}
        />
      </main>
    </div>
  )
}

export default App

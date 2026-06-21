import { useState, useEffect } from 'react'
import type { Transaccion } from '../types'
import { generarId } from '../utils/finanzas'

const CLAVE_STORAGE = 'Gestor de Finanzas Personales-transacciones'

function leerDeStorage(): Transaccion[] {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    if (!guardado) return []
    return JSON.parse(guardado) as Transaccion[]
  } catch {
    // Si los datos guardados están corruptos, se inicia con lista vacía
    return []
  }
}

function guardarEnStorage(transacciones: Transaccion[]): void {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(transacciones))
}

/**
 * Hook que encapsula toda la lógica de persistencia en localStorage
 * para las transacciones: cargar, agregar, editar y eliminar.
 */
export function useTransacciones() {
  const [transacciones, setTransacciones] = useState<Transaccion[]>(() =>
    leerDeStorage()
  )

  // Cada vez que cambia la lista, se sincroniza con localStorage
  useEffect(() => {
    guardarEnStorage(transacciones)
  }, [transacciones])

  function agregarTransaccion(datos: Omit<Transaccion, 'id'>): void {
    const nuevaTransaccion: Transaccion = { ...datos, id: generarId() }
    setTransacciones((prev) => [...prev, nuevaTransaccion])
  }

  function editarTransaccion(id: number, datos: Omit<Transaccion, 'id'>): void {
    setTransacciones((prev) =>
      prev.map((t) => (t.id === id ? { ...datos, id } : t))
    )
  }

  function eliminarTransaccion(id: number): void {
    setTransacciones((prev) => prev.filter((t) => t.id !== id))
  }

  return {
    transacciones,
    agregarTransaccion,
    editarTransaccion,
    eliminarTransaccion,
  }
}

import { createContext, useContext, useState } from 'react'
import { getItems, saveItems } from '../services/storageService'
import { createItem } from '../utils/itemUtils'

const API_URL = 'http://localhost:3000/api'

const StorageContext = createContext(null)

export function StorageProvider({ children }) {
  const [modo, setModoState] = useState(
    () => localStorage.getItem('modo') || 'local'
  )

  function setModo(nuevoModo) {
    localStorage.setItem('modo', nuevoModo)
    setModoState(nuevoModo)
  }

  async function obtenerItems() {
    if (modo === 'api') {
      const res = await fetch(`${API_URL}/items`)
      return res.json()
    } else {
      return getItems().filter(item => item.activo)
    }
  }

  async function guardarItem(data) {
    if (modo === 'api') {
      const existe = data.id
      if (existe) {
        await fetch(`${API_URL}/items/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } else {
        const nuevoItem = createItem(data)
        await fetch(`${API_URL}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoItem),
        })
      }
    } else {
      const items = getItems()
      const existe = items.findIndex(i => i.id === data.id)
      if (existe >= 0) {
        items[existe] = { ...items[existe], ...data, fechaActividad: new Date().toISOString() }
        saveItems(items)
      } else {
        const nuevoItem = createItem(data)
        saveItems([nuevoItem, ...items])
      }
    }
  }

  async function eliminarItem(id) {
    if (modo === 'api') {
      await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' })
    } else {
      const items = getItems()
      saveItems(items.map(i => i.id === id ? { ...i, activo: false } : i))
    }
  }

  return (
    <StorageContext.Provider value={{ modo, setModo, obtenerItems, guardarItem, eliminarItem }}>
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage() {
  return useContext(StorageContext)
}

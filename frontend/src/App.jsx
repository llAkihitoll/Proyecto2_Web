import { useState, useEffect } from 'react'
import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import { createItem } from './utils/itemUtils'
import './App.css'

function App() {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('anime_items') || '[]')
  )
  const [itemEditar, setItemEditar] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState('todos')

  // sincroniza items con localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('anime_items', JSON.stringify(items))
  }, [items])

  function handleAgregar(formData) {
    const nuevoItem = createItem(formData)
    setItems(prev => [nuevoItem, ...prev])
  }

  function handleActualizar(id, formData) {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      return {
        ...item,
        nombre: formData.nombre,
        categoriaId: formData.categoriaId,
        estado: formData.estado,
        puntuacion: formData.puntuacion !== '' ? Number(formData.puntuacion) : null,
        notas: formData.notas,
        fechaActividad: new Date().toISOString(),
        atributos: {
          estudio: formData.estudio,
          episodios_totales: formData.episodios_totales ? Number(formData.episodios_totales) : null,
          episodios_vistos: formData.episodios_vistos ? Number(formData.episodios_vistos) : 0,
          plataforma: formData.plataforma,
        },
      }
    }))
    setItemEditar(null)
  }

  function handleArchivar(id) {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, activo: false } : item
    ))
  }

  const itemsVisibles = items.filter(item => {
    if (!item.activo) return false
    if (filtroEstado === 'todos') return true
    return item.estado === filtroEstado
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Anime Tracker</h1>
        <p className="app-subtitle">{items.filter(i => i.activo).length} anime registrados</p>
      </header>

      <FormularioItem
        onAgregar={handleAgregar}
        itemEditar={itemEditar}
        onActualizar={handleActualizar}
        onCancelar={() => setItemEditar(null)}
      />

      <div className="filtros">
        {['todos', 'pendiente', 'en-progreso', 'completado', 'abandonado'].map(e => (
          <button
            key={e}
            className={`filtro-btn ${filtroEstado === e ? 'activo' : ''}`}
            onClick={() => setFiltroEstado(e)}
          >
            {e === 'todos' ? 'Todos' : e}
          </button>
        ))}
      </div>

      <ListaItems
        items={itemsVisibles}
        onEditar={setItemEditar}
        onArchivar={handleArchivar}
      />
    </div>
  )
}

export default App

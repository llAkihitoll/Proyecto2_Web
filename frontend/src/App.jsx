import { useState, useEffect, useRef } from 'react'
import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import { useStorage } from './context/StorageContext'
import { useTheme } from './context/ThemeContext'
import './App.css'

function App() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem } = useStorage()
  const { tema, toggleTema } = useTheme()

  const [items, setItems] = useState([])
  const [itemEditar, setItemEditar] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState('todos')

  // useRef — referencia al input de nombre para focus automático
  const inputRef = useRef(null)

  useEffect(() => {
    cargarItems()
  }, [modo])

  // atajos de teclado con cleanup obligatorio
  useEffect(() => {
    const handler = (e) => {
      // Ctrl+N — enfocar el input de nombre
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      // T — cambiar tema (solo si no está escribiendo en un input)
      if (e.key === 't' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        toggleTema()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleTema])

  async function cargarItems() {
    const data = await obtenerItems()
    setItems(data)
  }

  async function handleAgregar(formData) {
    await guardarItem(formData)
    await cargarItems()
    inputRef.current?.focus()
  }

  async function handleActualizar(id, formData) {
    await guardarItem({ id, ...formData })
    await cargarItems()
    setItemEditar(null)
  }

  async function handleArchivar(id) {
    await eliminarItem(id)
    await cargarItems()
  }

  const itemsVisibles = items.filter(item => {
    if (filtroEstado === 'todos') return true
    return item.estado === filtroEstado
  })

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-top">
          <div>
            <h1>Anime Tracker</h1>
            <p className="app-subtitle">{items.length} anime registrados</p>
          </div>
          <div className="app-controles">
            <button className="btn-tema" onClick={toggleTema}>
              {tema === 'claro' ? 'Modo oscuro' : 'Modo claro'}
            </button>
            <select
              className="select-modo"
              value={modo}
              onChange={e => setModo(e.target.value)}
            >
              <option value="local">Local</option>
              <option value="api">API</option>
            </select>
          </div>
        </div>
      </header>

      <FormularioItem
        inputRef={inputRef}
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

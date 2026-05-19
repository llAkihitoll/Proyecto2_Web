import { useRef, useEffect } from 'react'
import ItemCard from './ItemCard'

function ListaItems({ items, onEditar, onArchivar }) {
  // useRef — referencia al último item para hacer scroll automático
  const lastRef = useRef(null)

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [items.length])

  if (items.length === 0) {
    return <p className="lista-vacia">No hay anime registrado todavía.</p>
  }

  return (
    <div className="lista-items">
      {items.map((item, index) => (
        <div key={item.id} ref={index === 0 ? lastRef : null}>
          <ItemCard
            item={item}
            onEditar={onEditar}
            onArchivar={onArchivar}
          />
        </div>
      ))}
    </div>
  )
}

export default ListaItems

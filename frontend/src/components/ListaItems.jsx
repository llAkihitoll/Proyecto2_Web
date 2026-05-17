import ItemCard from './ItemCard'

function ListaItems({ items, onEditar, onArchivar }) {
  if (items.length === 0) {
    return <p className="lista-vacia">No hay anime registrado todavía.</p>
  }

  return (
    <div className="lista-items">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onEditar={onEditar}
          onArchivar={onArchivar}
        />
      ))}
    </div>
  )
}

export default ListaItems

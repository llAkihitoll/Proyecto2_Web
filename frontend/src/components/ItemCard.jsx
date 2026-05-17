const ESTADO_LABELS = {
  'pendiente': 'Pendiente',
  'en-progreso': 'En progreso',
  'completado': 'Completado',
  'abandonado': 'Abandonado',
}

function ItemCard({ item, onEditar, onArchivar }) {
  const { nombre, categoriaId, estado, puntuacion, notas, atributos } = item
  const { estudio, episodios_totales, episodios_vistos, plataforma } = atributos

  return (
    <div className={`item-card estado-${estado}`}>
      <div className="item-card-header">
        <h3>{nombre}</h3>
        <span className={`badge badge-${estado}`}>{ESTADO_LABELS[estado]}</span>
      </div>

      <div className="item-card-meta">
        <span className="tag">{categoriaId}</span>
        {plataforma && <span className="tag">{plataforma}</span>}
        {estudio && <span className="tag">{estudio}</span>}
      </div>

      {(episodios_totales || episodios_vistos > 0) && (
        <p className="episodios">
          Episodios: {episodios_vistos}/{episodios_totales ?? '?'}
        </p>
      )}

      {puntuacion !== null && (
        <p className="puntuacion">Puntuación: {puntuacion}/10</p>
      )}

      {notas && <p className="notas">{notas}</p>}

      <div className="item-card-acciones">
        <button className="btn-secondary" onClick={() => onEditar(item)}>
          Editar
        </button>
        <button className="btn-danger" onClick={() => onArchivar(item.id)}>
          Archivar
        </button>
      </div>
    </div>
  )
}

export default ItemCard

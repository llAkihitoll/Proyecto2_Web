import { useState } from 'react'

const CATEGORIAS = [
  { id: 'accion', label: 'Acción' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'romance', label: 'Romance' },
  { id: 'isekai', label: 'Isekai' },
  { id: 'terror', label: 'Terror' },
  { id: 'comedia', label: 'Comedia' },
  { id: 'drama', label: 'Drama' },
]

const ESTADOS = [
  { id: 'pendiente', label: 'Pendiente' },
  { id: 'en-progreso', label: 'En progreso' },
  { id: 'completado', label: 'Completado' },
  { id: 'abandonado', label: 'Abandonado' },
]

const FORM_INICIAL = {
  nombre: '',
  categoriaId: 'accion',
  estado: 'pendiente',
  puntuacion: '',
  notas: '',
  estudio: '',
  episodios_totales: '',
  episodios_vistos: '',
  plataforma: '',
}

function FormularioItem({ onAgregar, itemEditar, onActualizar, onCancelar }) {
  const [form, setForm] = useState(itemEditar ? {
    nombre: itemEditar.nombre,
    categoriaId: itemEditar.categoriaId,
    estado: itemEditar.estado,
    puntuacion: itemEditar.puntuacion ?? '',
    notas: itemEditar.notas,
    estudio: itemEditar.atributos.estudio,
    episodios_totales: itemEditar.atributos.episodios_totales ?? '',
    episodios_vistos: itemEditar.atributos.episodios_vistos ?? '',
    plataforma: itemEditar.atributos.plataforma,
  } : FORM_INICIAL)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre.trim()) return

    if (itemEditar) {
      onActualizar(itemEditar.id, form)
    } else {
      onAgregar(form)
    }
    setForm(FORM_INICIAL)
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>{itemEditar ? 'Editar anime' : 'Agregar anime'}</h2>

      <div className="formulario-grid">
        <div className="campo">
          <label>Nombre *</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Attack on Titan"
            required
          />
        </div>

        <div className="campo">
          <label>Categoría</label>
          <select name="categoriaId" value={form.categoriaId} onChange={handleChange}>
            {CATEGORIAS.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange}>
            {ESTADOS.map(e => (
              <option key={e.id} value={e.id}>{e.label}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Puntuación (0-10)</label>
          <input
            type="number"
            name="puntuacion"
            value={form.puntuacion}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.5"
            placeholder="—"
          />
        </div>

        <div className="campo">
          <label>Estudio</label>
          <input
            name="estudio"
            value={form.estudio}
            onChange={handleChange}
            placeholder="Ej: MAPPA"
          />
        </div>

        <div className="campo">
          <label>Plataforma</label>
          <input
            name="plataforma"
            value={form.plataforma}
            onChange={handleChange}
            placeholder="Ej: Crunchyroll"
          />
        </div>

        <div className="campo">
          <label>Episodios totales</label>
          <input
            type="number"
            name="episodios_totales"
            value={form.episodios_totales}
            onChange={handleChange}
            min="1"
            placeholder="—"
          />
        </div>

        <div className="campo">
          <label>Episodios vistos</label>
          <input
            type="number"
            name="episodios_vistos"
            value={form.episodios_vistos}
            onChange={handleChange}
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div className="campo campo-full">
        <label>Notas</label>
        <textarea
          name="notas"
          value={form.notas}
          onChange={handleChange}
          rows={3}
          placeholder="Opiniones, curiosidades..."
        />
      </div>

      <div className="formulario-acciones">
        <button type="submit" className="btn-primary">
          {itemEditar ? 'Guardar cambios' : 'Agregar'}
        </button>
        {itemEditar && (
          <button type="button" className="btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioItem

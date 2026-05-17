const express = require('express')
const router = express.Router()
const db = require('../db/init')

// GET — devuelve todos los items activos
router.get('/', (req, res) => {
  const items = db.prepare('SELECT * FROM items WHERE activo = 1').all()

  const parsed = items.map(item => ({
    ...item,
    atributos: JSON.parse(item.atributos || '{}'),
    activo: item.activo === 1,
  }))

  res.json(parsed)
})

// POST — crea un nuevo item
router.post('/', (req, res) => {
  const { id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos, activo } = req.body

  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' })
  }

  db.prepare(`
    INSERT INTO items (id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    nombre,
    categoriaId || null,
    estado || 'pendiente',
    puntuacion ?? null,
    fechaRegistro || new Date().toISOString(),
    fechaActividad || new Date().toISOString(),
    notas || '',
    JSON.stringify(atributos || {}),
    activo ? 1 : 1
  )

  res.status(201).json({ message: 'Item creado', id })
})

// PUT — actualiza un item existente
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { nombre, categoriaId, estado, puntuacion, fechaActividad, notas, atributos } = req.body

  const existe = db.prepare('SELECT id FROM items WHERE id = ?').get(id)
  if (!existe) return res.status(404).json({ error: 'Item no encontrado' })

  db.prepare(`
    UPDATE items
    SET nombre = ?, categoriaId = ?, estado = ?, puntuacion = ?,
        fechaActividad = ?, notas = ?, atributos = ?
    WHERE id = ?
  `).run(
    nombre,
    categoriaId,
    estado,
    puntuacion ?? null,
    fechaActividad || new Date().toISOString(),
    notas || '',
    JSON.stringify(atributos || {}),
    id
  )

  res.json({ message: 'Item actualizado', id })
})

// DELETE — archiva el item (activo = 0)
router.delete('/:id', (req, res) => {
  const { id } = req.params

  const existe = db.prepare('SELECT id FROM items WHERE id = ?').get(id)
  if (!existe) return res.status(404).json({ error: 'Item no encontrado' })

  db.prepare('UPDATE items SET activo = 0 WHERE id = ?').run(id)

  res.json({ message: 'Item archivado', id })
})

// POST — crea un registro de actividad
router.post('/:id/registro', (req, res) => {
  const { id } = req.params
  const { valor, notas } = req.body

  const existe = db.prepare('SELECT id FROM items WHERE id = ?').get(id)
  if (!existe) return res.status(404).json({ error: 'Item no encontrado' })

  const registroId = crypto.randomUUID()
  db.prepare(`
    INSERT INTO registros (id, itemId, fecha, valor, notas)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    registroId,
    id,
    new Date().toISOString(),
    valor ?? null,
    notas || ''
  )

  res.status(201).json({ message: 'Registro creado', id: registroId })
})

module.exports = router

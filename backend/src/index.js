const express = require('express')
const cors = require('cors')
const itemsRouter = require('./routes/items')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api/items', itemsRouter)

// ruta de prueba para verificar que el servidor está vivo
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

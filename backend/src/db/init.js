const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, '../../anime_tracker.sqlite'))

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id            TEXT PRIMARY KEY,
    nombre        TEXT NOT NULL,
    categoriaId   TEXT,
    estado        TEXT,
    puntuacion    REAL,
    fechaRegistro TEXT,
    fechaActividad TEXT,
    notas         TEXT,
    atributos     TEXT,
    activo        INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS registros (
    id      TEXT PRIMARY KEY,
    itemId  TEXT NOT NULL,
    fecha   TEXT NOT NULL,
    valor   REAL,
    notas   TEXT,
    FOREIGN KEY (itemId) REFERENCES items(id)
  );
`)

module.exports = db

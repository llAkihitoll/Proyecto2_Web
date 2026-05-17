// crea un item nuevo con todos los campos requeridos
export function createItem(data) {
  return {
    id: crypto.randomUUID(),
    nombre: data.nombre || '',
    categoriaId: data.categoriaId || 'accion',
    estado: data.estado || 'pendiente',
    puntuacion: data.puntuacion !== '' ? Number(data.puntuacion) : null,
    fechaRegistro: new Date().toISOString(),
    fechaActividad: new Date().toISOString(),
    notas: data.notas || '',
    atributos: {
      estudio: data.estudio || '',
      episodios_totales: data.episodios_totales ? Number(data.episodios_totales) : null,
      episodios_vistos: data.episodios_vistos ? Number(data.episodios_vistos) : 0,
      plataforma: data.plataforma || '',
    },
    activo: true,
  }
}

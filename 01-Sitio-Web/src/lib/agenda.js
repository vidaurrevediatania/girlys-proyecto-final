import { DIAS, DIAS_CORTO } from '../data.js'

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const aHora = (min) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** hash estable: los cupos ocupados son siempre los mismos, no parpadean */
function hash(texto) {
  let h = 2166136261
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export function proximosDias(cantidad = 7, desde = new Date()) {
  const dias = []
  for (let i = 0; i < cantidad; i++) {
    const d = new Date(desde)
    d.setDate(d.getDate() + i)
    dias.push(d)
  }
  return dias
}

export const etiquetaDia = (fecha) => ({
  largo: DIAS[fecha.getDay()],
  corto: DIAS_CORTO[fecha.getDay()],
  numero: fecha.getDate(),
  mes: fecha.toLocaleDateString('es-BO', { month: 'short' }).replace('.', ''),
})

/**
 * Cupos de una sucursal para un día y una duración.
 * Un cupo está disponible si cabe entero antes del cierre y no está tomado.
 */
export function cuposDe({ sucursal, fecha, duracion, intervalo = 30 }) {
  const diaSemana = fecha.getDay()
  const rango = sucursal.horario[diaSemana]
  if (!rango) return { abierto: false, cupos: [] }

  const inicio = aMinutos(rango.abre)
  const cierre = aMinutos(rango.cierra)
  const cupos = []

  for (let m = inicio; m < cierre; m += intervalo) {
    const clave = `${sucursal.id}-${fecha.toISOString().slice(0, 10)}-${m}`
    const tomado = hash(clave) % 100 < 26
    const cabe = m + duracion <= cierre
    cupos.push({
      hora: aHora(m),
      disponible: cabe && !tomado,
      motivo: !cabe ? 'No alcanza el tiempo' : tomado ? 'Ocupado' : null,
    })
  }
  return { abierto: true, cupos }
}

export function resumenHorario(sucursal) {
  const cierra = sucursal.horario.find(Boolean)
  const cerrado = sucursal.horario.filter((h) => !h).length
  return {
    rango: `${cierra.abre} – ${cierra.cierra}`,
    cerrado: cerrado === 0 ? 'Todos los días' : `${cerrado} día${cerrado > 1 ? 's' : ''} cerrado${cerrado > 1 ? 's' : ''}`,
  }
}
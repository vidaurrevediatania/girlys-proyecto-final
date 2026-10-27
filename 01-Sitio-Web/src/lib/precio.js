import { ANTICIPO, LARGOS, RETIRO } from '../data.js'

const redondear5 = (n) => Math.round(n / 5) * 5

/**
 * Calcula el precio a partir de forma, diseño y largo.
 * Devuelve el desglose completo, no solo el total: el anticipo
 * es la mitad exacta y el resto se paga en el salón.
 */
export function calcularPrecio({ servicio, forma, largo, diseno, retiro }) {
  const base = servicio.precio
  const porForma = base * forma.mult
  const porLargo = porForma * largo.mult
  const recargoDiseno = diseno.precio
  const recargoRetiro = retiro ? RETIRO.precio : 0

  const total = redondear5(porLargo + recargoDiseno + recargoRetiro)
  const anticipo = Math.round(total * ANTICIPO)
  const saldo = total - anticipo

  return {
    base: redondear5(base),
    recargoForma: redondear5(porForma - base),
    recargoLargo: redondear5(porLargo - porForma),
    recargoDiseno: recargoDiseno,
    recargoRetiro: recargoRetiro,
    total,
    anticipo,
    saldo,
  }
}

export const precioDesde = (servicios) =>
  Math.min(...servicios.map((s) => s.precio))

export const formatoBs = (n) => `${n} Bs`

/**
 * LA MEDIDA DEL LARGO.
 *
 * El largo de la uña se cotiza en centímetros, no en milímetros: 10 unidades
 * del deslizador son 0.8 cm. Antes se mostraba el número de unidades con la
 * etiqueta "mm" y eso no correspondía con la medida real de la uña.
 *
 * Todo pasa por aquí: el rótulo de la regla, el texto del tramo de precio y
 * la ficha. Cambiar UNIDAD_A_CM recorta la escala de golpe.
 */
export const UNIDAD_A_CM = 0.08

/** el largo, en unidades del deslizador (3 a 18) */
export const largoEnUnidades = (posicion) => Math.round(3 + posicion * 15)

/** las unidades del deslizador, en centímetros */
export const largoEnCm = (unidades) => unidades * UNIDAD_A_CM

/** el largo como se muestra: "0.8 cm" */
export const textoLargo = (unidades) => `${largoEnCm(unidades).toFixed(1)} cm`

/** las unidades caen dentro de un tramo de precio */
export function tramoLargo(unidades) {
  return LARGOS.find((l) => unidades <= l.unidadesMax) ?? LARGOS[LARGOS.length - 1]
}

export const posDesdeUnidades = (unidades) =>
  Math.min(1, Math.max(0, (unidades - 3) / 15))

/** "45 min" · "1 hora" · "1 h 30" — nunca "1 h 00" */
export const duracionTexto = (min) => {
  if (min < 60) return `${min} min`
  const horas = Math.floor(min / 60)
  const resto = min % 60
  if (resto === 0) return `${horas} ${horas === 1 ? 'hora' : 'horas'}`
  return `${horas} h ${String(resto).padStart(2, '0')}`
}
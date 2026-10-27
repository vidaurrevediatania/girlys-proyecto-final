/**
 * Google Analytics 4, sin dependencias.
 *
 * Reglas:
 *  - Si no hay VITE_GA_MEASUREMENT_ID, no se carga NADA externo.
 *  - Si hay ID, primero se pregunta. Solo se carga después de "Aceptar".
 *  - Nunca se envían nombres, teléfonos ni el texto de una reserva.
 *
 * Los eventos se miden desde los componentes con medir('nombre', { ... }).
 */

import { SITIO } from './sitio.js'

const CLAVE = 'girlys:analitica'
const ID = SITIO.ga

let cargado = false
let permitido = false

export const analiticaDisponible = () => Boolean(ID)

/** 'si', 'no' o null (todavía no eligió) */
export function preferenciaAnalitica() {
  try {
    return localStorage.getItem(CLAVE)
  } catch {
    return null
  }
}

export function guardarPreferenciaAnalitica(valor) {
  try {
    localStorage.setItem(CLAVE, valor)
  } catch {
    /* modo privado: se queda solo en memoria */
  }
  if (valor === 'si') iniciarAnalitica()
}

export function iniciarAnalitica() {
  if (!ID || cargado) return
  cargado = true
  permitido = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', ID, {
    anonymize_ip: true,
    send_page_view: true,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.head.appendChild(script)
}

export function iniciarSiAcepto() {
  if (preferenciaAnalitica() === 'si') iniciarAnalitica()
}

/**
 * Envía un evento. Es un no-op silencioso si no hay GA, si la persona dijo
 * que no, o si el script aún no cargó. Nunca rompe la página.
 */
export function medir(evento, parametros = {}) {
  if (!ID || !permitido) return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', evento, parametros)
}

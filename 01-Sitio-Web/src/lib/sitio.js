/**
 * Un solo lugar para los datos de contacto y los enlaces del sitio.
 *
 * Lo que va entre VITE_... se configura en el archivo .env (ver
 * .env.example). Así el mismo código sirve para pruebas y para producción
 * sin tocar componentes. Si un enlace social queda vacío, no se muestra:
 * preferimos no tener un icono antes que un enlace roto.
 */

import { textoLargo } from './precio.js'

const env = import.meta.env

const sinBarraFinal = (valor) => String(valor || '').replace(/\/+$/, '')

// Si no hay dominio configurado (o sigue el marcador), se usa el origen real
// desde el que se abrió la página. Así funciona en localhost, en la URL de
// Vercel y en el dominio final sin tocar código.
const origenDeclarado = sinBarraFinal(env.VITE_SITE_ORIGIN || '')
const origenEsMarcador = !origenDeclarado || /TU-DOMINIO/i.test(origenDeclarado)
const origenActual =
  typeof window !== 'undefined' ? sinBarraFinal(window.location.origin) : 'https://TU-DOMINIO.com'

// El número se guarda solo con dígitos; la versión visible se arma de él
// para que cambiar VITE_WHATSAPP_PHONE no deje un teléfono viejo en el pie.
const numeroWhatsApp = String(env.VITE_WHATSAPP_PHONE || '59163396452').replace(/\D/g, '')
const telefonoValido = numeroWhatsApp.length >= 8 ? numeroWhatsApp : '59163396452'

const formatoVisible = (numero) =>
  numero.startsWith('591') && numero.length === 11
    ? `+591 ${numero.slice(3, 6)} ${numero.slice(6, 9)} ${numero.slice(9)}`
    : `+${numero}`

export const SITIO = {
  nombre: 'Girlys',
  lema: 'Manicura con precio cerrado',
  url: origenEsMarcador ? origenActual : origenDeclarado,

  // número en formato internacional, solo dígitos (Bolivia = 591)
  whatsapp: telefonoValido,
  whatsappVisible: formatoVisible(telefonoValido),
  correo: env.VITE_CONTACT_EMAIL || '',

  // El blog vive dentro del mismo sitio React: /blog
  blog: '/blog',

  // analítica y chat: si están vacíos, no se carga ningún script externo
  ga: env.VITE_GA_MEASUREMENT_ID || '',
  tawk: env.VITE_TAWK_PROPERTY_ID || '',

  redes: {
    instagram: env.VITE_INSTAGRAM_URL || '',
    tiktok: env.VITE_TIKTOK_URL || '',
    facebook: env.VITE_FACEBOOK_URL || '',
    youtube: env.VITE_YOUTUBE_URL || '',
    telegram: env.VITE_TELEGRAM_URL || '',
    messenger: env.VITE_MESSENGER_URL || '',
  },
}

/** Orden en el que aparecen las redes. Solo se pinta lo que tenga URL. */
export const REDES = [
  { id: 'instagram', nombre: 'Instagram' },
  { id: 'tiktok', nombre: 'TikTok' },
  { id: 'facebook', nombre: 'Facebook' },
  { id: 'youtube', nombre: 'YouTube' },
  { id: 'telegram', nombre: 'Telegram' },
  { id: 'messenger', nombre: 'Messenger' },
].filter((r) => SITIO.redes[r.id])

export const hayRedes = REDES.length > 0

/** Enlace de WhatsApp con el texto ya escrito. */
export function whatsappUrl(texto, telefono = SITIO.whatsapp) {
  const numero = String(telefono).replace(/\D/g, '')
  const consulta = texto ? `?text=${encodeURIComponent(texto)}` : ''
  return `https://wa.me/${numero}${consulta}`
}

/**
 * El mensaje que se abre en WhatsApp. Incluye lo que la clienta acaba de
 * elegir en la calculadora para que no tenga que repetirlo.
 * `seleccion` es el objeto derivado de App (servicio/forma/largo/diseño).
 */
export function mensajeReserva({ seleccion, precio, sucursal, saludo = 'Hola Girlys 👋' } = {}) {
  const lineas = [`${saludo}, quiero reservar una cita.`]

  if (seleccion?.servicio) {
    lineas.push(
      '',
      `• Servicio: ${seleccion.servicio.nombre}`,
      `• Forma: ${seleccion.forma.nombre}`,
      `• Extensión: ${seleccion.largo.nombre} (${textoLargo(seleccion.unidades)} desde el borde natural)`,
      `• Diseño: ${seleccion.diseno.nombre}${seleccion.diseno.precio ? ` (+${seleccion.diseno.precio} Bs)` : ''}`,
    )
    if (seleccion.retiro) lineas.push('• Retiro de esmalte previo')
  }

  if (sucursal) lineas.push(`• Salón: ${sucursal.nombre}`)

  if (precio?.total != null) {
    lineas.push('', `Total estimado: ${precio.total} Bs`, `Anticipo 50 %: ${precio.anticipo} Bs`)
  }

  return lineas.join('\n')
}

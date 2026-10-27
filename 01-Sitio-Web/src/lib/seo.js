import { useEffect } from 'react'
import { SITIO } from './sitio.js'

/**
 * SEO por ruta para un sitio de una sola página (SPA).
 *
 * Google ejecuta JavaScript, así que actualizar el título, la descripción,
 * el canonical y los datos estructurados al cambiar de ruta es suficiente.
 * Los datos de la portada se generan en el HTML con vite.config.js.
 */

const sinBarraFinal = (ruta) => (ruta === '/' ? '/' : ruta.replace(/\/+$/, ''))
const absoluta = (ruta) => `${SITIO.url}${sinBarraFinal(ruta)}`
const absolutaImagen = (imagen) =>
  /^https?:\/\//i.test(imagen) ? imagen : `${SITIO.url}${imagen}`

const ponerMeta = (atributo, clave, valor) => {
  if (!valor) return
  let etiqueta = document.head.querySelector(`meta[${atributo}="${clave}"]`)
  if (!etiqueta) {
    etiqueta = document.createElement('meta')
    etiqueta.setAttribute(atributo, clave)
    document.head.appendChild(etiqueta)
  }
  etiqueta.setAttribute('content', valor)
}

const ponerEnlace = (rel, href) => {
  let enlace = document.head.querySelector(`link[rel="${rel}"]`)
  if (!enlace) {
    enlace = document.createElement('link')
    enlace.setAttribute('rel', rel)
    document.head.appendChild(enlace)
  }
  enlace.setAttribute('href', href)
}

const JSON_INICIO =
  typeof document !== 'undefined'
    ? document.getElementById('jsonld-inicio')?.textContent || ''
    : ''

export function useSEO({
  titulo,
  descripcion,
  ruta,
  imagen = '/og-girlys.jpg',
  tipo = 'website',
  jsonLd = null,
  noindex = false,
}) {
  const jsonTexto = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = titulo

    ponerMeta('name', 'description', descripcion)
    ponerMeta(
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    )
    ponerMeta('property', 'og:type', tipo)
    ponerMeta('property', 'og:site_name', SITIO.nombre)
    ponerMeta('property', 'og:locale', 'es_BO')
    ponerMeta('property', 'og:title', titulo)
    ponerMeta('property', 'og:description', descripcion)
    ponerMeta('property', 'og:url', absoluta(ruta))
    ponerMeta('property', 'og:image', absolutaImagen(imagen))
    ponerMeta('property', 'og:image:alt', titulo)
    ponerMeta('name', 'twitter:card', 'summary_large_image')
    ponerMeta('name', 'twitter:title', titulo)
    ponerMeta('name', 'twitter:description', descripcion)
    ponerMeta('name', 'twitter:image', absolutaImagen(imagen))
    ponerEnlace('canonical', absoluta(ruta))

    // Los datos estructurados de la portada vienen del HTML generado por Vite.
    // En el blog se retiran y se pone el esquema que corresponde a la ruta.
    const inicio = document.getElementById('jsonld-inicio')
    if (ruta === '/') {
      if (!document.getElementById('jsonld-inicio') && JSON_INICIO) {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'jsonld-inicio'
        script.textContent = JSON_INICIO
        document.head.appendChild(script)
      }
    } else if (inicio) {
      inicio.remove()
    }

    document.getElementById('jsonld-ruta')?.remove()
    if (jsonTexto) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'jsonld-ruta'
      script.textContent = jsonTexto
      document.head.appendChild(script)
    }
  }, [titulo, descripcion, ruta, imagen, tipo, jsonTexto, noindex])
}

export const urlAbsoluta = absoluta
export const urlImagen = absolutaImagen

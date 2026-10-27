import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { PREGUNTAS, SERVICIOS, SUCURSALES } from './src/data.js'

const precioMin = Math.min(...SERVICIOS.map((s) => s.precio))
const precioMax = Math.max(...SERVICIOS.map((s) => s.precio))

// En src/data.js el horario empieza en lunes (índice 0), no en domingo.
const DIAS_SCHEMA = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/**
 * JSON-LD generado desde los mismos datos que pinta la página.
 * Si cambias un teléfono, una dirección o una pregunta en src/data.js,
 * el dato estructurado cambia solo. No hay dos copias que mantener.
 */
function datosEstructurados(ORIGEN) {
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${ORIGEN}/#website`,
      url: `${ORIGEN}/`,
      name: 'Girlys',
      inLanguage: 'es-BO',
      publisher: { '@id': `${ORIGEN}/#organizacion` },
    },
    {
      '@type': 'Organization',
      '@id': `${ORIGEN}/#organizacion`,
      name: 'Girlys',
      url: `${ORIGEN}/`,
      logo: `${ORIGEN}/favicon.svg`,
      description:
        'Salón de manicura y pedicura con precio cerrado en Santa Cruz de la Sierra, Bolivia.',
      areaServed: 'Santa Cruz de la Sierra',
    },
    ...SUCURSALES.map((sucursal) => ({
      '@type': 'NailSalon',
      '@id': `${ORIGEN}/#${sucursal.id}`,
      name: `Girlys · ${sucursal.nombre}`,
      parentOrganization: { '@id': `${ORIGEN}/#organizacion` },
      url: `${ORIGEN}/#sucursales`,
      image: `${ORIGEN}/og-girlys.jpg`,
      telephone: sucursal.telefono.replace(/\s+/g, ''),
      priceRange: `Bs ${precioMin}–${precioMax}`,
      currenciesAccepted: 'BOB',
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${sucursal.calle}, ${sucursal.zona}`,
        addressLocality: 'Santa Cruz de la Sierra',
        addressRegion: 'Santa Cruz',
        addressCountry: 'BO',
      },
      openingHours: sucursal.horario
        .map((h, i) => (h ? `${DIAS_SCHEMA[i]} ${h.abre}-${h.cierra}` : null))
        .filter(Boolean),
    })),
    {
      '@type': 'FAQPage',
      '@id': `${ORIGEN}/#faq`,
      mainEntity: PREGUNTAS.map((p) => ({
        '@type': 'Question',
        name: p.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
      })),
    },
  ]

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

function seoGirlys(ORIGEN) {
  return {
    name: 'girlys-seo',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: datosEstructurados(ORIGEN),
          injectTo: 'head',
        },
      ]
    },
  }
}

export default defineConfig(({ mode }) => {
  // El dominio todavía no está definido: se toma de VITE_SITE_ORIGIN (.env).
  const env = loadEnv(mode, process.cwd(), '')
  const ORIGEN = (env.VITE_SITE_ORIGIN || 'https://TU-DOMINIO.com').replace(/\/+$/, '')

  return {
    plugins: [react(), seoGirlys(ORIGEN)],
    base: './',
    server: {
      watch: {
        // El ZIP de publicación y las capturas se generan mientras el servidor
        // de desarrollo está abierto. En Windows, si Vite intenta vigilar el ZIP
        // recién creado, el archivo está bloqueado y el servidor se cae.
        ignored: ['**/deploy/**', '**/capturas/**'],
      },
    },
  }
})

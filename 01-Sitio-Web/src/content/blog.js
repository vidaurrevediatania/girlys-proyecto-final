import { marked } from 'marked'
import { parsearFrontmatter } from './frontmatter.js'

/**
 * Blog estático: cada entrada es un archivo .md dentro de src/content/blog.
 * Vite los empaqueta al construir; no hay base de datos ni servidor PHP.
 *
 * Para publicar una entrada nueva:
 *   1. Crear el archivo .md con el bloque de datos de arriba.
 *   2. Guardar una imagen en public/blog.
 *   3. Hacer commit y push. Vercel reconstruye solo.
 */

const archivos = import.meta.glob('./blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

marked.setOptions({ gfm: true, breaks: false })

const palabrasDe = (texto) =>
  texto
    .replace(/[#>*_`[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

const fechaLarga = (fecha) => {
  const valor = new Date(`${fecha}T12:00:00`)
  if (Number.isNaN(valor.getTime())) return fecha
  return new Intl.DateTimeFormat('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(valor)
}

export const ENTRADAS = Object.entries(archivos)
  .map(([ruta, texto]) => {
    const slug = ruta.split('/').pop().replace(/\.md$/, '')
    const { datos, cuerpo } = parsearFrontmatter(texto)
    const palabras = palabrasDe(cuerpo)

    return {
      slug,
      titulo: datos.titulo || slug,
      descripcion: datos.descripcion || '',
      fecha: datos.fecha || '',
      fechaLarga: fechaLarga(datos.fecha || ''),
      categoria: datos.categoria || 'Blog',
      imagen: datos.imagen || '/og-girlys.jpg',
      imagenAlt: datos.imagenAlt || datos.titulo || '',
      minutos: Math.max(2, Math.ceil(palabras / 200)),
      html: marked.parse(cuerpo),
    }
  })
  .sort((a, b) => b.fecha.localeCompare(a.fecha))

export const CATEGORIAS = [...new Set(ENTRADAS.map((e) => e.categoria))]

export const buscarEntrada = (slug) => ENTRADAS.find((e) => e.slug === slug)

export const relacionadas = (entrada, cantidad = 2) =>
  ENTRADAS.filter((e) => e.slug !== entrada.slug).slice(0, cantidad)

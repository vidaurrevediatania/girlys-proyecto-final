/**
 * Genera sitemap.xml y robots.txt después de `vite build`.
 *
 * No hay WordPress: la lista de entradas sale de los archivos Markdown de
 * src/content/blog. Si agregas una entrada, el sitemap se actualiza solo en
 * la próxima construcción (Vercel la hace en cada push).
 */

import fs from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'
import { parsearFrontmatter } from '../src/content/frontmatter.js'

const raiz = process.cwd()
const dist = path.join(raiz, 'dist')
const carpetaBlog = path.join(raiz, 'src', 'content', 'blog')

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('[SEO] No existe dist/index.html. Ejecuta primero: npm run build')
  process.exit(1)
}

const env = loadEnv('production', raiz, '')
const declarado = String(env.VITE_SITE_ORIGIN || '').trim().replace(/\/+$/, '')
const vercel =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || ''
const origen =
  declarado && !/TU-DOMINIO/i.test(declarado)
    ? declarado
    : vercel
      ? `https://${vercel.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`
      : 'https://TU-DOMINIO.com'

const escapar = (texto) =>
  String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const entradas = fs
  .readdirSync(carpetaBlog)
  .filter((archivo) => archivo.endsWith('.md'))
  .map((archivo) => {
    const texto = fs.readFileSync(path.join(carpetaBlog, archivo), 'utf8')
    const { datos } = parsearFrontmatter(texto)
    return {
      slug: archivo.replace(/\.md$/, ''),
      fecha: datos.fecha || '',
    }
  })
  .sort((a, b) => b.fecha.localeCompare(a.fecha))

const hoy = new Date().toISOString().slice(0, 10)
const ultimaEntrada = entradas[0]?.fecha || hoy

const urls = [
  {
    loc: `${origen}/`,
    lastmod: hoy,
    changefreq: 'monthly',
    priority: '1.0',
  },
  {
    loc: `${origen}/blog`,
    lastmod: ultimaEntrada,
    changefreq: 'weekly',
    priority: '0.9',
  },
  ...entradas.map((entrada) => ({
    loc: `${origen}/blog/${entrada.slug}`,
    lastmod: entrada.fecha || hoy,
    changefreq: 'yearly',
    priority: '0.8',
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapar(url.loc)}</loc>
    <lastmod>${escapar(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${origen}/sitemap.xml
`

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8')
fs.writeFileSync(path.join(dist, 'robots.txt'), robots, 'utf8')

console.log(`[SEO] sitemap.xml y robots.txt generados para ${origen} (${urls.length} URLs)`)

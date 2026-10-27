/**
 * Servidor local del Proyecto Final 2.0
 * ------------------------------------------------------------------
 * Sirve el sitio React construido en 01-Sitio-Web/dist con HTTPS.
 * El blog es estático y vive en la misma carpeta: /blog.
 *
 * No usa PHP, ni WordPress, ni base de datos.
 *
 * Arranque:  iniciar.ps1   (o  node servidor.js)
 */

import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = path.dirname(fileURLToPath(import.meta.url))
const RAIZ = path.resolve(AQUI, '..')
const DIST = path.join(RAIZ, '01-Sitio-Web', 'dist')
const CERT = path.join(AQUI, 'certs', 'localhost.crt')
const LLAVE = path.join(AQUI, 'certs', 'localhost.key')

const HTTPS_PORT = Number(process.env.HTTPS_PORT || 8443)
const HTTP_PORT = Number(process.env.HTTP_PORT || 8080)
const BASE = `https://localhost:${HTTPS_PORT}`

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.map': 'application/json; charset=utf-8',
}

if (!fs.existsSync(CERT) || !fs.existsSync(LLAVE)) {
  console.error('\n[ERROR] Falta el certificado SSL local.')
  console.error('        Ejecuta primero:  03-Servidor-Local\\generar-certificado.ps1\n')
  process.exit(1)
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('\n[ERROR] No existe 01-Sitio-Web\\dist\\index.html')
  console.error('        Ejecuta primero, dentro de 01-Sitio-Web:  npm install  y  npm run build\n')
  process.exit(1)
}

function servirArchivo(res, destino, metodo) {
  const ext = path.extname(destino).toLowerCase()
  res.writeHead(200, {
    'Content-Type': TIPOS[ext] || 'application/octet-stream',
    'Cache-Control':
      ext === '.html'
        ? 'no-cache'
        : ext === '.js' || ext === '.css' || ext === '.woff2'
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=3600',
  })
  if (metodo === 'HEAD') {
    res.end()
    return
  }
  fs.createReadStream(destino).pipe(res)
}

/** Sirve archivos del sitio y manda las rutas del SPA a index.html. */
function servirEstatico(req, res, urlPath) {
  const metodo = req.method || 'GET'
  let relativo = decodeURIComponent(urlPath.split('?')[0])
  if (relativo === '/') relativo = '/index.html'

  const destino = path.normalize(path.join(DIST, relativo))
  if (!destino.startsWith(DIST)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Prohibido')
    return
  }

  if (fs.existsSync(destino) && fs.statSync(destino).isFile()) {
    servirArchivo(res, destino, metodo)
    return
  }

  // /blog, /blog/mi-entrada, /servicios... no tienen extensión: es una ruta
  // del React Router y devuelve index.html para que la resuelva el navegador.
  if (!path.extname(relativo.replace(/\/+$/, ''))) {
    servirArchivo(res, path.join(DIST, 'index.html'), metodo)
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 - No encontrado')
}

const servidor = https.createServer(
  { cert: fs.readFileSync(CERT), key: fs.readFileSync(LLAVE) },
  (req, res) => {
    const url = req.url || '/'

    if (url === '/estado') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(
        JSON.stringify(
          {
            sitio: 'ok',
            blog: 'estatico',
            rutas: ['/', '/blog', '/blog/:entrada'],
            https: HTTPS_PORT,
          },
          null,
          2,
        ),
      )
      return
    }

    servirEstatico(req, res, url)
  },
)

// HTTP -> HTTPS, para que nadie se quede en una versión sin candado.
http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://localhost:${HTTPS_PORT}${req.url}` })
    res.end()
  })
  .listen(HTTP_PORT, '127.0.0.1')

servidor.listen(HTTPS_PORT, () => {
  console.log('')
  console.log('  ======================================================')
  console.log('   GIRLYS - servidor local encendido')
  console.log('  ======================================================')
  console.log(`   Sitio web ....... ${BASE}/`)
  console.log(`   Blog ............ ${BASE}/blog`)
  console.log(`   Estado .......... ${BASE}/estado`)
  console.log('')
  console.log('   El candado aparece como "no seguro" solo porque el')
  console.log('   certificado es autofirmado: haz clic en "Avanzado"')
  console.log('   y luego en "Continuar a localhost".')
  console.log('')
  console.log('   Para apagar: cierra esta ventana o pulsa Ctrl+C.')
  console.log('')
})

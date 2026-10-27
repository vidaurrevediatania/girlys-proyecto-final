/**
 * Servidor local del Proyecto Final 2.0
 * ------------------------------------------------------------------
 * Une las dos piezas en un solo dominio, igual que en el hosting real:
 *
 *   https://localhost:8443/        -> sitio React (01-Sitio-Web/dist)
 *   https://localhost:8443/blog/   -> WordPress (02-WordPress)
 *
 * El certificado es autofirmado (punto 3 de la lista). El navegador
 * mostrará una advertencia la primera vez: es normal en local.
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

const PHP_HOST = process.env.PHP_HOST || '127.0.0.1'
const PHP_PORT = Number(process.env.PHP_PORT || 8090)
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

const registro = (msg) => console.log(`  ${new Date().toLocaleTimeString('es-BO')}  ${msg}`)

/** Sirve archivos del sitio React, con respaldo a index.html (rutas SPA). */
function servirEstatico(req, res, urlPath) {
  let relativo = decodeURIComponent(urlPath.split('?')[0])
  if (relativo.endsWith('/')) relativo += 'index.html'

  const destino = path.normalize(path.join(DIST, relativo))
  if (!destino.startsWith(DIST)) {
    res.writeHead(403).end('Prohibido')
    return
  }

  if (fs.existsSync(destino) && fs.statSync(destino).isFile()) {
    const ext = path.extname(destino).toLowerCase()
    res.writeHead(200, {
      'Content-Type': TIPOS[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    })
    fs.createReadStream(destino).pipe(res)
    return
  }

  // Ruta del SPA (por ejemplo /servicios): devolver index.html
  if (!path.extname(relativo)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' })
    fs.createReadStream(path.join(DIST, 'index.html')).pipe(res)
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 - No encontrado')
}

/** Reenvía /blog/* al PHP que ejecuta WordPress. */
function enviarAWordPress(req, res) {
  const opciones = {
    host: PHP_HOST,
    port: PHP_PORT,
    method: req.method,
    path: req.url,
    headers: {
      ...req.headers,
      host: `localhost:${HTTPS_PORT}`,
      'x-forwarded-proto': 'https',
      'x-forwarded-host': `localhost:${HTTPS_PORT}`,
    },
  }

  const peticion = http.request(opciones, (respuesta) => {
    res.writeHead(respuesta.statusCode || 502, respuesta.headers)
    respuesta.pipe(res)
  })

  peticion.on('error', (err) => {
    registro(`WordPress no responde (${err.code || err.message})`)
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`<!doctype html><meta charset="utf-8"><title>WordPress apagado</title>
      <div style="font-family:system-ui;max-width:640px;margin:12vh auto;padding:24px;line-height:1.6">
      <h1 style="font-family:Georgia,serif">WordPress no está corriendo</h1>
      <p>El sitio principal funciona, pero el blog necesita PHP.</p>
      <p>Cierra esta ventana y ejecuta <code>iniciar.ps1</code> de nuevo,
      o revisa la otra ventana negra (la de PHP) para ver el error.</p>
      </div>`)
  })

  req.pipe(peticion)
}

const servidor = https.createServer(
  { cert: fs.readFileSync(CERT), key: fs.readFileSync(LLAVE) },
  (req, res) => {
    const url = req.url || '/'

    if (url === '/estado') {
      const probarPhp = new Promise((ok) => {
        const p = http.get({ host: PHP_HOST, port: PHP_PORT, path: '/blog/', timeout: 8000 }, (r) => {
          r.resume()
          ok(r.statusCode || 0)
        })
        p.on('error', () => ok(0))
        p.on('timeout', () => { p.destroy(); ok(0) })
      })
      probarPhp.then((codigo) => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ sitio: 'ok', wordpress: codigo ? 'ok' : 'apagado', php: codigo }, null, 2))
      })
      return
    }

    if (url === '/blog' || url.startsWith('/blog/') || url.startsWith('/blog?')) {
      enviarAWordPress(req, res)
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
  console.log(`   Blog WordPress .. ${BASE}/blog/`)
  console.log(`   Panel de WP ..... ${BASE}/blog/wp-admin/`)
  console.log(`   Estado .......... ${BASE}/estado`)
  console.log('')
  console.log('   El candado aparece como "no seguro" solo porque el')
  console.log('   certificado es autofirmado: haz clic en "Avanzado"')
  console.log('   y luego en "Continuar a localhost".')
  console.log('')
  console.log('   Para apagar todo: cierra esta ventana o pulsa Ctrl+C.')
  console.log('')
})

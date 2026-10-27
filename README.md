# Girlys · Proyecto Final 2.0

Sitio web de manicura y pedicura con **precio cerrado**, más un blog en WordPress,
listo para correr en una PC con Windows y para publicarse después en un hosting o en Vercel.

> **Estado:** todo funciona en local. El dominio y el hosting todavía no están definidos;
> el proyecto usa el marcador `https://TU-DOMINIO.com` hasta que se configure el real.

---

## Qué incluye

| Carpeta | Contenido |
|---|---|
| `01-Sitio-Web` | Sitio React + Vite (calculadora, reserva por WhatsApp, SEO) |
| `02-WordPress` | WordPress con SQLite, tema Astra y plugins (blog) |
| `03-Servidor-Local` | PHP portátil, HTTPS autofirmado, scripts de arranque |
| `04-Documentacion` | Los 7 puntos explicados, paso a paso |
| `05-Recursos` | Capturas y material para redes sociales |
| `99-Descargas` | Instaladores descargados (se puede borrar) |

---

## Arranque rápido (Windows)

Requisitos: **Node.js 18 o superior**. Nada más.

```powershell
# 1. Instalar todo (solo la primera vez)
03-Servidor-Local\instalar.ps1

# 2. Encender
03-Servidor-Local\iniciar.ps1
```

Luego abrir:

- Sitio: <https://localhost:8443/>
- Blog: <https://localhost:8443/blog/>
- Panel WordPress: <https://localhost:8443/blog/wp-admin/>

El navegador advertirá por el certificado autofirmado: **Avanzado → Continuar**.

La contraseña del panel está en `02-WordPress/CLAVE-ADMIN-LOCAL.txt`
(archivo excluido de Git).

---

## Puesta a punto del dominio

Cuando tengas el dominio:

```powershell
03-Servidor-Local\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

Actualiza `.env`, `sitemap.xml`, `robots.txt`, `index.html` y reconstruye el sitio.

---

## Documentación

1. [Tema, modelo de ingreso, dominio y CMS](04-Documentacion/1-tema-dominio-cms.md)
2. [Instalación del CMS y del dominio](04-Documentacion/2-instalacion-cms-dominio.md)
3. [SSL: autofirmado, Let's Encrypt y ZeroSSL](04-Documentacion/3-ssl.md)
4. [Google Analytics 4](04-Documentacion/4-google-analytics.md)
5. [Facebook e Instagram sin pagar](04-Documentacion/5-redes-sociales.md)
6. [Técnicas de SEO](04-Documentacion/6-seo.md)
7. [Vista inicial, tema y plugins](04-Documentacion/7-vista-inicial-plugins.md)
8. [Subir al hosting](04-Documentacion/8-subir-al-hosting.md)
9. [GitHub y Vercel](04-Documentacion/9-publicar-github-vercel.md)

---

## Comandos

```powershell
# Sitio
cd 01-Sitio-Web
npm install
npm run build        # genera dist/
npm run dev          # desarrollo con recarga

# WordPress (con el PHP del proyecto)
03-Servidor-Local\php\php.exe 03-Servidor-Local\verificar.php
03-Servidor-Local\php\php.exe 03-Servidor-Local\instalar-wordpress.php
```

---

## Publicar en Vercel

El repo incluye `vercel.json` con el comando de build y la carpeta de salida.

1. Subir el proyecto a GitHub.
2. Importarlo en Vercel.
3. Cargar las variables `VITE_SITE_ORIGIN`, `VITE_WHATSAPP_PHONE`, etc.
4. Deploy.

> **Vercel no ejecuta PHP**: aloja el sitio React. WordPress necesita un hosting PHP aparte
> (ver documento 8 y 9).

---

## Datos que faltan reemplazar

Antes de presentar el sitio como negocio real:

- [ ] WhatsApp definitivo
- [ ] Direcciones y teléfonos de las 3 sucursales
- [ ] Horarios
- [ ] Precios confirmados
- [ ] Fotos propias (las actuales son de muestra)
- [ ] Dominio real
- [ ] ID de Google Analytics
- [ ] URLs de Instagram y Facebook
- [ ] Textos legales revisados

Todo lo comercial vive en `01-Sitio-Web/src/data.js` y `01-Sitio-Web/.env`.

# Punto 2 · Instalación del sitio y del blog (en tu PC)

Todo está instalado y funcionando **sin pagar hosting, sin WordPress, sin PHP y sin base de datos**.
Este documento explica qué hay, cómo se enciende y qué hacer si algo falla.

---

## 2.1 Qué se instaló

| Pieza | Versión | Dónde |
|---|---|---|
| Node.js | 18 o superior (LTS) | Instalado en Windows |
| Git + OpenSSL | Cualquier versión reciente | Se instala con GitHub Desktop o Git for Windows |
| React | 18 | `01-Sitio-Web` |
| Vite | 5 | `01-Sitio-Web` |
| Blog estático | Markdown + `marked` | `01-Sitio-Web\src\content\blog` |
| Enrutador | React Router 6 | `01-Sitio-Web` |
| Servidor local | Node.js + HTTPS autofirmado | `03-Servidor-Local\servidor.js` |

> **No hace falta XAMPP, MySQL, Docker ni permisos de administrador.**
> Tampoco hay que instalar WordPress: el blog es parte del mismo sitio.

### Por qué no hay base de datos

Las entradas del blog son archivos de texto (`.md`) dentro del proyecto.
El navegador las recibe ya convertidas en HTML. Ventajas para la entrega:

- Cero configuración de servidor o base de datos.
- El respaldo es el repositorio de Git.
- No hay contraseñas de base de datos ni paneles que actualizar.
- El sitio completo se publica en Vercel sin hosting aparte.

---

## 2.2 Cómo encenderlo

La **primera vez** (o si se borró `node_modules`):

1. Abre la carpeta `03-Servidor-Local`.
2. Doble clic en **`instalar.ps1`**
   (si Windows pregunta, elegir *Ejecutar con PowerShell*).

El script comprueba Node.js, instala las dependencias, construye el sitio y genera
el certificado local. Al terminar, pulsa Enter.

**Cada vez que quieras usarlo:**

1. Abre la carpeta `03-Servidor-Local`.
2. Doble clic en **`iniciar.ps1`**.
3. Espera a ver:

```
Sitio web ....... https://localhost:8443/
Blog ............ https://localhost:8443/blog
Estado .......... https://localhost:8443/estado
```

4. Abre el navegador en `https://localhost:8443/`.

> La primera vez Chrome/Edge dirá **"La conexión no es privada"**.
> Es normal: el certificado es autofirmado (hecho por nosotros, no por una autoridad).
> Haz clic en **Avanzado → Continuar a localhost (no seguro)**.

### Apagarlo

- Cierra la ventana negra, o
- Pulsa `Ctrl + C` dentro de ella, o
- Ejecuta `detener.ps1`.

---

## 2.3 Qué hay dentro del blog

| Dato | Valor |
|---|---|
| Listado | `https://localhost:8443/blog` |
| Entrada de ejemplo | `https://localhost:8443/blog/cuidado-semipermanente` |
| Archivos de contenido | `01-Sitio-Web\src\content\blog\*.md` |
| Imágenes | `01-Sitio-Web\public\blog` |
| Categorías | Cuidado de uñas · Tendencias · Paso a paso |

No hay panel de administración. Las entradas se editan con un editor de texto
(o directamente en GitHub) y se publican al hacer `commit` y `push`.
El flujo completo está en el documento 9.

### Formato de una entrada

```markdown
---
titulo: Cómo cuidar la manicura semipermanente
descripcion: Siete hábitos que alargan el esmaltado.
fecha: 2026-10-26
categoria: Cuidado de uñas
imagen: /blog/cuidado-semipermanente.webp
imagenAlt: Uñas con diseño de mármol azul
---

Texto de la entrada con **Markdown** normal.
```

- El **nombre del archivo** define la dirección: `francesa-clasica.md` → `/blog/francesa-clasica`.
- La **fecha** ordena las entradas (de más nueva a más vieja).
- La **categoría** crea sola el filtro en la portada del blog.
- Si falta la imagen, se usa la portada genérica del sitio.

---

## 2.4 Estructura de la carpeta

```
Proyecto Final 2.0
├─ 00-EMPIEZA-AQUI.md          ← guía rápida
├─ 01-Sitio-Web                ← React + Vite (sitio y blog)
│   ├─ src
│   │   ├─ components          ← bloques de la página
│   │   ├─ pages               ← Inicio, Blog, Entrada, 404
│   │   ├─ content/blog        ← entradas en Markdown
│   │   └─ data.js             ← precios, sucursales, preguntas
│   ├─ public                  ← imágenes, fuentes, favicon
│   ├─ scripts/generar-seo.mjs ← crea sitemap.xml y robots.txt
│   ├─ dist                    ← sitio construido (se publica en Vercel)
│   └─ .env                    ← dominio, WhatsApp, Analytics, redes
├─ 03-Servidor-Local           ← certificado, servidor y scripts
├─ 04-Documentacion            ← estos documentos (7 puntos)
├─ 05-Recursos                 ← capturas y material para redes
├─ vercel.json                 ← configuración de publicación
└─ README.md                   ← resumen para GitHub
```

---

## 2.5 Comandos útiles

Desde `03-Servidor-Local`:

```powershell
.\iniciar.ps1                     # enciende el sitio con HTTPS
.\detener.ps1                     # apaga el servidor
.\generar-certificado.ps1         # rehace el certificado SSL local
.\instalar.ps1                    # reinstala y vuelve a construir
.\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

Desde `01-Sitio-Web`:

```powershell
npm install          # solo la primera vez
npm run dev          # desarrollo con recarga automática
npm run build        # construye dist + sitemap + robots
npm run preview      # previsualiza la construcción
```

> `npm run build` ejecuta `vite build` y después `scripts/generar-seo.mjs`.
> Si una entrada nueva no aparece en el sitemap, es porque no se reconstruyó.

---

## 2.6 Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| "No se puede acceder a este sitio" | El servidor no está encendido | Ejecutar `iniciar.ps1` |
| Página en blanco | Falta construir el sitio | `cd 01-Sitio-Web; npm run build` |
| "La conexión no es privada" | Certificado autofirmado | Avanzado → Continuar |
| El puerto 8443 está ocupado | Quedó una ventana anterior abierta | Ejecutar `detener.ps1` y reintentar |
| Cambié algo y no se ve | El servidor sirve `dist`, no `src` | Reconstruir con `npm run build` |
| El blog muestra 404 | El archivo `.md` no existe o cambió de nombre | Revisar `src/content/blog` |
| `npm` no se reconoce | Node.js no está instalado | Descargar la versión LTS en <https://nodejs.org> |
| "No se encontró OpenSSL" | Falta Git | Instalar GitHub Desktop o Git for Windows |
| Vercel falla al construir | Falta `package-lock.json` | Hacer commit de ese archivo |

### Sobre las rutas que no existen

El sitio es una aplicación de una sola página. Una dirección sin extensión
(`/blog/no-existe`) devuelve la página 404 propia con estado HTTP 200, porque el
servidor entrega `index.html` y React decide qué mostrar.

En el servidor local, un archivo inexistente con extensión (`/archivo.pdf`) sí
devuelve un 404 real. En Vercel, el rewrite entrega `index.html` para cualquier
ruta, así que también muestra la página 404 propia con estado HTTP 200. No afecta
al SEO porque esa página está marcada `noindex`.

---

## 2.7 Lo que falta para publicar

Este montaje es local. Para tenerlo en internet:

1. Subir el proyecto a GitHub (documento 8).
2. Importarlo en Vercel y pulsar **Deploy**.
3. Cuando haya dominio, conectarlo en Vercel y ejecutar `configurar-dominio.ps1`.

No hay que contratar hosting PHP ni instalar nada en un panel.

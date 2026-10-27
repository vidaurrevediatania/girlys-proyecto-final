# Punto 6 · Técnicas de SEO aplicadas

SEO = que Google entienda la página y la muestre cuando alguien busca "manicura Santa Cruz".

---

## 6.1 Lo que ya está implementado en el sitio

| Técnica | Dónde | Estado |
|---|---|---|
| Título único y descriptivo | `index.html` y `src/lib/seo.js` | ✅ |
| Meta descripción con beneficio ("precio cerrado") | `index.html` y `src/lib/seo.js` | ✅ |
| `lang="es"`, `charset`, `viewport` | `index.html` | ✅ |
| URL canónica por ruta | `index.html` + `src/lib/seo.js` | ✅ |
| Open Graph (WhatsApp/Facebook) | `index.html` + `src/lib/seo.js` | ✅ |
| Twitter Card | `index.html` + `src/lib/seo.js` | ✅ |
| Datos estructurados `WebSite` + `Organization` | `vite.config.js` | ✅ |
| `NailSalon` por cada sucursal (3) | `vite.config.js` | ✅ |
| `FAQPage` con las preguntas reales | `vite.config.js` | ✅ |
| `Blog` y `BlogPosting` | `src/pages/Blog.jsx` y `Entrada.jsx` | ✅ |
| `BreadcrumbList` en cada entrada | `src/pages/Entrada.jsx` | ✅ |
| `robots.txt` generado al construir | `scripts/generar-seo.mjs` | ✅ |
| `sitemap.xml` con home, blog y entradas | `scripts/generar-seo.mjs` | ✅ |
| Un solo `h1` por página | Componentes | ✅ |
| Enlaces internos con texto descriptivo | Navegación y pie | ✅ |
| Página 404 propia | `src/pages/NoEncontrado.jsx` | ✅ |
| Rendimiento: sitio estático, sin fuentes externas | Build | ✅ |
| Imágenes en WebP con `width`/`height` | `src/fotos` y `public/blog` | ✅ |
| Accesibilidad: foco visible, contraste, `aria-label` | Componentes | ✅ |
| Móvil primero | Todo el sitio | ✅ |

### Cómo se genera el SEO de cada ruta

El sitio es una aplicación de una sola página. Al cambiar de ruta, `src/lib/seo.js`
actualiza el título, la descripción, el canonical, las etiquetas de redes y los
datos estructurados. Google ejecuta JavaScript, así que lee esos cambios.

- **Inicio:** `WebSite`, `Organization`, tres `NailSalon` y `FAQPage` generados desde `src/data.js`.
- **Blog:** `Blog` con la lista de entradas.
- **Entrada:** `BlogPosting` + `BreadcrumbList`.
- **404:** `noindex, follow`.

### Por qué los datos estructurados importan

Son los que permiten que Google muestre **precio, dirección y preguntas** directamente
en los resultados. Se generan desde `src/data.js`: si cambia un teléfono, el JSON-LD
cambia solo. No hay dos copias que se puedan desincronizar.

### Sitemap y robots

`npm run build` ejecuta `scripts/generar-seo.mjs`, que lee las entradas de
`src/content/blog` y escribe en `dist`:

```
https://TU-DOMINIO.com/                        prioridad 1.0
https://TU-DOMINIO.com/blog                    prioridad 0.9
https://TU-DOMINIO.com/blog/<cada-entrada>     prioridad 0.8
```

La dirección se toma, en este orden:

1. `VITE_SITE_ORIGIN` si tiene un dominio real.
2. `VERCEL_PROJECT_PRODUCTION_URL` o `VERCEL_URL` (lo pone Vercel solo).
3. El marcador `https://TU-DOMINIO.com`.

Por eso la primera publicación en Vercel ya genera un sitemap correcto, sin configurar nada.

---

## 6.2 Lo que falta y depende de vos

### A. Dominio real

Mientras el canonical diga `https://TU-DOMINIO.com`, **no se debe indexar**.
Cuando tengas el dominio:

```powershell
cd "03-Servidor-Local"
.\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

El script actualiza `.env`, reconstruye y deja el canonical, el sitemap y `robots.txt`
apuntando al dominio nuevo. Después hay que hacer `commit` y `push`.

### B. Google Search Console (gratis)

1. Entrar a <https://search.google.com/search-console>.
2. **Añadir propiedad**.
3. Dos caminos:
   - **Dominio** (recomendado): pide un registro TXT en el DNS. Solo funciona si tenés acceso
     al DNS (el proveedor del dominio).
   - **Prefijo de URL**: `https://tudominio.com/` → verificación por **etiqueta HTML**.
4. Si elegís etiqueta HTML, Google da algo así:

```html
<meta name="google-site-verification" content="ABC123..." />
```

5. Pegarla en `01-Sitio-Web\index.html`, en el bloque que ya está preparado (línea 20 aprox.):

```html
<!-- <meta name="google-site-verification" content="PEGA-AQUI-TU-CODIGO" /> -->
```

6. Reconstruir (`npm run build`), hacer push y pulsar **Verificar** en Search Console.

### C. Enviar el sitemap

Dentro de Search Console → **Sitemaps**, escribir:

```
https://tudominio.com/sitemap.xml
```

Es **un solo sitemap**: incluye el sitio y todas las entradas del blog.
No hay un segundo sitemap de WordPress.

### D. Probar los datos estructurados

1. <https://search.google.com/test/rich-results>
2. Pegar la URL del sitio.
3. Debe detectar: `NailSalon`, `FAQPage`, `Organization`, `WebSite`.
4. Abrir una entrada del blog y comprobar `BlogPosting`.
5. Si hay errores, revisar que `src/data.js` tenga dirección y teléfono completos.

También sirve <https://validator.schema.org>.

### E. Palabras clave objetivo

| Intención | Búsqueda | Dónde se cubre |
|---|---|---|
| Comercial | `manicura santa cruz precio` | Inicio + calculadora |
| Comercial | `pedicura santa cruz` | Lista de precios |
| Comercial | `uñas esculpidas santa cruz` | Servicio esculpido |
| Informativa | `cuánto dura la semipermanente` | Entrada del blog |
| Informativa | `french clásica` | Entrada del blog |
| Marca | `girlys uñas` | Inicio |

Regla: **una página por intención**. No competir consigo mismo.

---

## 6.3 SEO local (el que más importa para un salón)

1. **Google Business Profile** (gratis): <https://business.google.com>
   - Crear ficha por sucursal, categoría "Salón de uñas".
   - Mismos datos que el sitio: nombre, dirección, teléfono, horario.
   - Subir fotos reales y responder reseñas.
2. **Consistencia NAP**: el Nombre, Dirección y Teléfono deben ser **idénticos** en el sitio,
   Facebook, Instagram y Google. Un número distinto resta confianza.
3. **Reseñas**: pedirlas por WhatsApp después de cada cita. 10 reseñas valen más que 100 seguidores.

---

## 6.4 Cómo comprobar el SEO en local (sin dominio)

| Prueba | Cómo |
|---|---|
| Título y descripción | Ver código fuente (`Ctrl+U`) o la pestaña del navegador |
| Canonical | Abrir `/blog` y revisar el `<link rel="canonical">` |
| JSON-LD | Pegar el HTML en el validador de schema.org |
| Sitemap | Abrir `https://localhost:8443/sitemap.xml` |
| Robots | Abrir `https://localhost:8443/robots.txt` |
| Enlaces rotos | Recorrer el sitio y revisar que ningún enlace dé error |
| Velocidad | Lighthouse en Chrome (`F12 → Lighthouse`) |

> En local, Lighthouse va a marcar el certificado como problema. Es esperado.
> La medición válida se hace sobre el dominio publicado con HTTPS real.

---

## 6.5 Resumen para la defensa

1. SEO **técnico** resuelto: metadatos por ruta, canonical, sitemap, robots, datos
   estructurados, rendimiento y accesibilidad.
2. SEO **de contenido**: blog con categorías y entradas que responden dudas reales.
3. SEO **local**: Google Business Profile + consistencia de datos + reseñas.
4. **Search Console** y sitemap enviados cuando exista el dominio.
5. Datos estructurados validados en Rich Results Test.

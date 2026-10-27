# Punto 6 · Técnicas de SEO aplicadas

SEO = que Google entienda la página y la muestre cuando alguien busca "manicura Santa Cruz".

---

## 6.1 Lo que ya está implementado en el sitio

| Técnica | Dónde | Estado |
|---|---|---|
| Título único y descriptivo | `index.html` | ✅ |
| Meta descripción con beneficio ("precio cerrado") | `index.html` | ✅ |
| `lang="es"`, `charset`, `viewport` | `index.html` | ✅ |
| URL canónica | `index.html` (desde `.env`) | ✅ |
| Open Graph (WhatsApp/Facebook) | `index.html` | ✅ |
| Twitter Card | `index.html` | ✅ |
| Datos estructurados `WebSite` + `Organization` | `vite.config.js` | ✅ |
| `NailSalon` por cada sucursal (3) | `vite.config.js` | ✅ |
| `FAQPage` con las preguntas reales | `vite.config.js` | ✅ |
| `robots.txt` con sitemaps | `public/` | ✅ |
| `sitemap.xml` (home + blog) | `public/` | ✅ |
| Un solo `h1`, jerarquía de `h2`/`h3` | Componentes | ✅ |
| Enlaces internos con texto descriptivo | Navegación y pie | ✅ |
| 404 real que devuelve 404 | `.htaccess` | ✅ |
| Rendimiento: sitio estático, sin fuentes externas | Build | ✅ |
| Imágenes en WebP con `width`/`height` | `src/assets` | ✅ |
| Accesibilidad: foco visible, contraste, `aria-label` | Componentes | ✅ |
| Móvil primero | Todo el sitio | ✅ |

### Por qué los datos estructurados importan

Son los que permiten que Google muestre **estrellas, precio, dirección y preguntas**
directamente en los resultados. Se generan desde `src/data.js`: si cambia un teléfono,
el JSON-LD cambia solo. No hay dos copias que se puedan desincronizar.

---

## 6.2 Lo que falta y depende de vos

### A. Dominio real

Mientras el canonical diga `https://TU-DOMINIO.com`, **no se debe indexar**.
Cuando tengas el dominio:

```powershell
cd "03-Servidor-Local"
.\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

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

5. Pegarla en `01-Sitio-Web\index.html`, en el bloque que ya está preparado (línea 17 aprox.):

```html
<!-- <meta name="google-site-verification" content="PEGA-AQUI-TU-CODIGO" /> -->
```

6. Reconstruir (`npm run build`), subir y pulsar **Verificar**.

### C. Enviar los sitemaps

Dentro de Search Console → **Sitemaps**:

```
https://tudominio.com/sitemap.xml
https://tudominio.com/blog/wp-sitemap.xml
```

El segundo lo genera WordPress solo.

### D. Probar los datos estructurados

1. <https://search.google.com/test/rich-results>
2. Pegar la URL del sitio.
3. Debe detectar: `NailSalon`, `FAQPage`, `Organization`, `WebSite`.
4. Si hay errores, revisar que `src/data.js` tenga dirección y teléfono completos.

También sirve <https://validator.schema.org>.

### E. Rank Math en WordPress (ya instalado)

El asistente de Rank Math se queda en blanco en algunos entornos, así que se configura a mano:

1. `https://localhost:8443/blog/wp-admin/`
2. Menú **Rank Math → Dashboard → Setup Wizard** (si falla, seguir con el paso 3).
3. **Rank Math → Titles & Meta**:
   - Título de entrada: `%title% %sep% %sitename%`
   - Descripción: `%excerpt%`
   - Activar **No Index** en: autores, formatos, etiquetas vacías.
4. **Rank Math → Sitemap Settings**: activar entradas, páginas y categorías.
5. **Rank Math → General Settings → Links**: activar `nofollow` en enlaces externos.
6. Guardar y abrir `https://localhost:8443/blog/sitemap_index.xml`.

### F. Palabras clave objetivo

| Intención | Búsqueda | Dónde se cubre |
|---|---|---|
| Comercial | `manicura santa cruz precio` | Home + calculadora |
| Comercial | `pedicura santa cruz` | Lista de precios |
| Comercial | `uñas esculpidas santa cruz` | Servicio esculpido |
| Informativa | `cuánto dura la semipermanente` | Entrada del blog |
| Informativa | `french clásica` | Entrada del blog |
| Marca | `girlys uñas` | Home |

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
| Título y descripción | Ver código fuente (`Ctrl+U`) |
| Canonical | Debe mostrar el dominio configurado |
| JSON-LD | Pegar el HTML en el validador de schema.org |
| Sitemap | Abrir `https://localhost:8443/sitemap.xml` |
| Robots | Abrir `https://localhost:8443/robots.txt` |
| Enlaces rotos | Recorrer el sitio y revisar que ningún enlace dé 404 |
| Velocidad | Lighthouse en Chrome (`F12 → Lighthouse`) |

> En local, Lighthouse va a marcar el certificado como problema. Es esperado.
> La medición válida se hace sobre el dominio publicado con HTTPS real.

---

## 6.5 Resumen para la defensa

1. SEO **técnico** resuelto: metadatos, canonical, sitemaps, robots, datos estructurados,
   rendimiento y accesibilidad.
2. SEO **de contenido**: blog con categorías y entradas que responden dudas reales.
3. SEO **local**: Google Business Profile + consistencia de datos + reseñas.
4. **Search Console** conectado y sitemaps enviados (pendiente del dominio).
5. Datos estructurados validados en Rich Results Test.

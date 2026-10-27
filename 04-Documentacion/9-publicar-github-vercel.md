# Punto 9 · GitHub, Vercel y mantenimiento

El proyecto se publica una sola vez y después se actualiza con **commit y push**.
No hay que entrar a ningún panel de hosting ni subir archivos por FTP.

---

## 9.1 Qué se sube y qué no

| Carpeta o archivo | Va a GitHub | Por qué |
|---|---|---|
| `01-Sitio-Web` | ✅ | Código del sitio y del blog |
| `04-Documentacion` | ✅ | Documentación |
| `05-Recursos` | ✅ | Capturas y material de redes |
| `03-Servidor-Local` (scripts) | ✅ | Servidor local y certificado público |
| `vercel.json` | ✅ | Configuración de publicación |
| `01-Sitio-Web/node_modules` | ❌ | Se instala sola en cada construcción |
| `01-Sitio-Web/dist` | ❌ | Vercel la genera |
| `01-Sitio-Web/.env` | ❌ | Contiene datos locales |
| `03-Servidor-Local/certs` | ❌ | Certificados locales: se generan en cada PC |
| `03-Servidor-Local/logs` | ❌ | Registros temporales |

Todo eso ya está en `.gitignore`.

### Comprobar antes de publicar

```powershell
git ls-files | Select-String "\.env$|CLAVE|\.key$|node_modules|/dist/"
```

No debe devolver nada.

---

## 9.2 Primera publicación

Los pasos completos están en el **documento 8**. Resumen:

1. Crear el repositorio `girlys-proyecto-final` en GitHub.
2. Subir la carpeta `Proyecto Final 2.0` (GitHub Desktop o PowerShell).
3. En Vercel: **Add New → Project → Import** el repositorio.
4. Dejar **Root Directory** vacío y **Framework Preset: Other**.
5. **Deploy**.

La primera URL será algo como `https://girlys-proyecto-final.vercel.app`.

---

## 9.3 Actualizar el sitio después

Cada cambio local:

```powershell
git add .
git commit -m "Describe el cambio"
git push
```

Vercel detecta el cambio en la rama `main` y publica en 1 o 2 minutos.

### Cambiar precios, horarios o textos

1. Editar `01-Sitio-Web/src/data.js`.
2. Probar en local con `iniciar.ps1`.
3. Hacer commit y push.

Los datos estructurados, la calculadora y las preguntas se actualizan juntos porque
salen del mismo archivo.

### Cambiar el WhatsApp o las redes

1. Editar `01-Sitio-Web/.env` en tu PC.
2. Ejecutar `npm run build` para probar.
3. Hacer commit y push.

> El archivo `.env` no se sube. Para que Vercel use esos valores, hay que cargarlos
> como **Environment Variables** (ver 9.5) o dejar los valores por defecto del código.

---

## 9.4 Publicar una entrada nueva del blog

Se puede hacer desde GitHub, sin instalar nada.

### Paso 1 · Crear el archivo

1. Entrar al repositorio en GitHub.
2. Abrir la carpeta `01-Sitio-Web/src/content/blog`.
3. Pulsar **Add file → Create new file**.
4. Nombre del archivo: `mi-entrada-nueva.md`
   (el nombre define la dirección: `/blog/mi-entrada-nueva`).
5. Escribir el encabezado y el texto:

```markdown
---
titulo: Mi entrada nueva
descripcion: Una frase que explique de qué trata.
fecha: 2026-11-01
categoria: Cuidado de uñas
imagen: /blog/mi-entrada-nueva.webp
imagenAlt: Descripción de la imagen
---

Texto de la entrada con **Markdown**.

## Un subtítulo

- Una lista
- Otra idea
```

6. Abajo, escribir un mensaje como `Nueva entrada del blog`.
7. Pulsar **Commit changes**.

### Paso 2 · Subir la imagen

1. Abrir `01-Sitio-Web/public/blog`.
2. Pulsar **Add file → Upload files**.
3. Arrastrar la imagen (mejor en formato `.webp`, menos de 500 KB).
4. Pulsar **Commit changes**.

El nombre debe coincidir con el campo `imagen` del encabezado.

### Paso 3 · Esperar la publicación

Vercel reconstruye sola. En 1 o 2 minutos la entrada aparece en `/blog`, en el sitemap
y en la portada del blog.

### Reglas del contenido

| Campo | Obligatorio | Ejemplo |
|---|---|---|
| `titulo` | Sí | `Cómo cuidar la manicura` |
| `descripcion` | Sí | Una frase de 120-160 caracteres |
| `fecha` | Sí | `2026-11-01` (ordena las entradas) |
| `categoria` | Sí | `Cuidado de uñas` |
| `imagen` | No | `/blog/mi-imagen.webp` |
| `imagenAlt` | Recomendado | Descripción real de la imagen |

Si una categoría es nueva, el filtro aparece solo en la portada del blog.

### Borrar una entrada

1. Abrir el archivo `.md` en GitHub.
2. Pulsar el icono de papelera.
3. **Commit changes**.

Vercel la quita del sitio y del sitemap en la próxima publicación.

---

## 9.5 Variables de entorno en Vercel

No son obligatorias para la primera publicación. Sirven para cambiar datos sin
tocar el código.

1. Vercel → proyecto → **Settings → Environment Variables**.
2. Agregar las que necesites:

| Nombre | Ejemplo | Para qué |
|---|---|---|
| `VITE_WHATSAPP_PHONE` | `59170000000` | Número del botón y la reserva |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `VITE_INSTAGRAM_URL` | `https://instagram.com/girlys.nails` | Enlace en el pie |
| `VITE_FACEBOOK_URL` | `https://facebook.com/girlys.nails` | Enlace en el pie |
| `VITE_TIKTOK_URL` | `https://tiktok.com/@girlys.nails` | Enlace en el pie |
| `VITE_CONTACT_EMAIL` | `hola@girlys.com` | Correo de contacto |
| `VITE_SITE_ORIGIN` | `https://tudominio.com` | Dominio final (opcional) |

3. Guardar y pulsar **Redeploy** para que se apliquen.

> Si `VITE_SITE_ORIGIN` queda vacío o con el marcador, Vercel usa automáticamente
> la URL del proyecto. No hay que configurarlo para la primera entrega.

---

## 9.6 Dominio propio (opcional)

El sitio ya funciona con la URL gratuita de Vercel. Comprar un dominio es opcional.

1. Vercel → proyecto → **Settings → Domains**.
2. Agregar el dominio y copiar los registros DNS.
3. Cargarlos en el proveedor del dominio.
4. Cuando Vercel confirme, ejecutar en tu PC:

```powershell
cd "03-Servidor-Local"
.\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

5. Hacer commit y push.

Vercel emite el certificado HTTPS solo. No hay que comprar ni renovar nada.

---

## 9.7 Mantenimiento mensual

| Tarea | Cada cuánto | Cómo |
|---|---|---|
| Revisar que el sitio abra | 1 mes | Abrir la URL de Vercel |
| Actualizar precios u horarios | Cuando cambien | Editar `src/data.js` y hacer push |
| Publicar una entrada | 2 o 4 semanas | Crear `.md` en GitHub |
| Revisar enlaces rotos | 3 meses | Recorrer el sitio y el blog |
| Revisar Search Console | 1 mes | Ver errores de indexación |
| Actualizar dependencias | 6 meses | `npm update` y probar en local |
| Copia de seguridad | Automática | El historial de GitHub |

### Actualizar dependencias (con cuidado)

```powershell
cd 01-Sitio-Web
npm update
npm run build
```

Si la construcción falla, volver atrás con `git checkout -- package.json package-lock.json`.

---

## 9.8 Checklist de publicación

- [ ] Repositorio creado y `git push` exitoso.
- [ ] `git ls-files` no muestra `.env`, claves ni contraseñas.
- [ ] Proyecto importado en Vercel.
- [ ] **Root Directory** vacío y **Framework Preset: Other**.
- [ ] Deploy en verde.
- [ ] Portada, blog y una entrada funcionan.
- [ ] El sitemap y `robots.txt` abren.
- [ ] La calculadora y WhatsApp funcionan.
- [ ] Dominio conectado (si ya lo tenés).
- [ ] Search Console verificado y sitemap enviado.

---

## 9.9 Resumen para la defensa

1. Código versionado en **GitHub** con `.gitignore` que excluye secretos y binarios.
2. Despliegue automático en **Vercel** desde la rama `main`.
3. HTTPS automático de Vercel.
4. Variables de entorno separadas del código.
5. Blog gestionado con **Markdown + Git**: se publica con un commit, sin panel ni base de datos.

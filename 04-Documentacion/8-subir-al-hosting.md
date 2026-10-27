# Punto 8 · Cómo subirlo al hosting (cuando lo tengas)

El proyecto ya está armado. Esto es lo que hay que hacer el día que tengas dominio y hosting.
Sirve para CWP, cPanel o cualquier panel parecido.

---

## 8.1 Antes de subir: checklist

- [ ] Dominio real definido.
- [ ] Haber ejecutado `configurar-dominio.ps1` con ese dominio.
- [ ] `npm run build` sin errores.
- [ ] Carpeta `01-Sitio-Web\dist` actualizada.
- [ ] Datos reales en `src/data.js` (WhatsApp, direcciones, precios).
- [ ] ID de Analytics pegado en `.env` (si ya existe).

---

## 8.2 Subir el sitio principal

### Paso 1 · Construir

```powershell
cd "01-Sitio-Web"
npm run build
```

### Paso 2 · Comprimir el contenido de `dist`

No comprimir la carpeta: **el contenido**. Debe quedar así:

```
index.html
assets/
fuentes/
favicon.svg
og-girlys.jpg
robots.txt
sitemap.xml
apple-touch-icon.png
.htaccess          ← oculto
```

### Paso 3 · Subir

1. Entrar al panel del hosting (CWP `:2083` o cPanel).
2. **Administrador de archivos** → `public_html`.
3. Borrar el `index.html` de ejemplo si existe.
4. **Subir** el ZIP → clic derecho → **Extract**.
5. Borrar el ZIP.
6. Activar **Mostrar archivos ocultos** y confirmar que `.htaccess` está ahí.

### Paso 4 · Probar

- `https://tudominio.com` → debe abrir el sitio.
- `https://tudominio.com/servicios` → debe abrir el sitio (no 404).
- `https://tudominio.com/loquesea` → debe mostrar la página 404 propia.

---

## 8.3 Instalar WordPress en `/blog`

**No copies la carpeta `02-WordPress` local**: trae SQLite y en el hosting conviene MySQL.

### Opción A · Instalador del panel (más fácil)

1. CWP → **WordPress Manager** (o Softaculous en cPanel).
2. **Install** → dominio → carpeta: `blog`.
3. Completar título, usuario y contraseña.
4. Instalar.

### Opción B · Manual

1. Descargar <https://wordpress.org/latest.zip>.
2. Subir a `public_html/blog` y extraer.
3. Abrir `https://tudominio.com/blog/` y seguir el asistente.
4. Base de datos: crear una en **MySQL → Create Database** (usuario y contraseña nuevos).

> Anotá esos datos en un lugar seguro. No se comparten en capturas.

---

## 8.4 Pasar el contenido del blog local al hosting

El contenido no se copia por archivos: se **exporta e importa**.

### En tu PC

1. `https://localhost:8443/blog/wp-admin/`
2. **Herramientas → Exportar → Todo el contenido**.
3. Descargar el `.xml`.

### En el hosting

1. **Herramientas → Importar → WordPress**.
2. Instalar el importador si lo pide.
3. Subir el `.xml`.
4. Asignar las entradas al usuario administrador del hosting.
5. Marcar **Descargar e importar archivos adjuntos** si las imágenes están en el `.xml`.

### Después de importar

1. **Apariencia → Temas → Añadir nuevo** → buscar **Astra** → Instalar → Activar.
2. **Plugins → Añadir nuevo**:
   - Rank Math SEO
   - UpdraftPlus
   - Wordfence Security
   - WP Super Cache
3. Subir por FTP el archivo
   `02-WordPress\wp-content\mu-plugins\girlys-estilo.php`
   a `public_html/blog/wp-content/mu-plugins/`.
4. **Ajustes → Enlaces permanentes** → *Nombre de la entrada* → Guardar.
5. **Ajustes → Lectura** → desmarcar *Disuadir a los motores de búsqueda*.
6. **Ajustes → Comentarios** → desmarcar *Permitir comentarios*.
7. Crear el menú y asignarlo a **Primary**.
8. Comprobar `https://tudominio.com/blog/`.

### Imágenes

Si alguna imagen no se importó, subirla a **Medios** y volver a insertarla.
El `.xml` no siempre incluye los archivos físicos.

---

## 8.5 SSL en el hosting

Ver documento 3, sección 3.2. Resumen:

1. CWP → **SSL / TLS → AutoSSL** → Run.
2. Esperar y comprobar el candado.
3. Verificar que `http://` redirige a `https://`.

---

## 8.6 Ajustes finales de WordPress

| Ajuste | Valor |
|---|---|
| **Ajustes → General → URL de WordPress** | `https://tudominio.com/blog` |
| **Ajustes → General → URL del sitio** | `https://tudominio.com/blog` |
| **Ajustes → Lectura** | Portada: página "Inicio"; entradas: página "Blog" |
| **Ajustes → Enlaces permanentes** | Nombre de la entrada |
| **Rank Math** | Ver documento 6 |
| **UpdraftPlus** | Semanal, 4 copias, guardar en Google Drive o descargar |
| **Wordfence** | Activar escaneo y alertas por correo |

> Si al entrar a `/blog/wp-admin/` redirige a `localhost`, hay que corregir
> las URLs en `wp-config.php`:
> ```php
> define('WP_HOME','https://tudominio.com/blog');
> define('WP_SITEURL','https://tudominio.com/blog');
> ```
> o en la tabla `wp_options` (`siteurl` y `home`).

---

## 8.7 Verificación final

| Prueba | Resultado esperado |
|---|---|
| `https://tudominio.com` | Sitio con candado |
| `http://tudominio.com` | Redirige a HTTPS |
| `https://www.tudominio.com` | Redirige sin `www` |
| `https://tudominio.com/blog/` | Blog con el mismo estilo |
| `https://tudominio.com/blog/wp-admin/` | Panel de WordPress |
| `https://tudominio.com/sitemap.xml` | Sitemap del sitio |
| `https://tudominio.com/blog/wp-sitemap.xml` | Sitemap del blog |
| `https://tudominio.com/robots.txt` | Robots con los dos sitemaps |
| `https://tudominio.com/archivo-inexistente.pdf` | 404 real (archivo inexistente) |

> WordPress instalado en `/blog` **no publica** `/blog/robots.txt`: el estándar es que
> `robots.txt` viva en la raíz del dominio. El de la raíz ya incluye el sitemap del blog.

Cuando todo eso funcione: enviar los sitemaps a Search Console y crear la ficha de
Google Business Profile.

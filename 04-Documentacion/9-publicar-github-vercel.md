# Punto 9 · Publicar en GitHub y Vercel

El repositorio ya está preparado (`.gitignore`, `vercel.json`, README). Solo faltan tus cuentas.

> **Aviso importante:** Vercel **solo puede alojar el sitio React** (HTML/CSS/JS).
> WordPress necesita PHP y una base de datos, y Vercel no los ofrece.
> El blog puede quedar en un hosting PHP aparte o publicarse después.
> El sitio principal funciona perfecto en Vercel.

---

## 9.1 Qué se sube y qué no

| Carpeta | Va a GitHub | Por qué |
|---|---|---|
| `01-Sitio-Web` | ✅ | Código del sitio |
| `04-Documentacion` | ✅ | Documentación |
| `05-Recursos` | ✅ | Capturas y material de redes |
| `03-Servidor-Local` (scripts) | ✅ | Servidor, certificado, instalador |
| `03-Servidor-Local/php` | ❌ | 30 MB de binarios; `instalar.ps1` los baja |
| `02-WordPress` | ❌ | Se instala en el hosting |
| `99-Descargas` | ❌ | Instaladores descargables |
| `.env` | ❌ | Contiene datos locales |
| `certs/*.key` | ❌ | Clave privada del certificado |

Todo eso ya está en `.gitignore`.

---

## 9.2 Subir a GitHub

### Crear el repositorio

1. Entrar a <https://github.com/new>.
2. Nombre: `girlys-proyecto-final`.
3. **Private** (recomendado) o Public.
4. **No** marcar "Add a README", "Add .gitignore" ni licencia.
5. **Create repository**.

### Conectar la carpeta

Abrir PowerShell **dentro de `Proyecto Final 2.0`** y ejecutar:

```powershell
git init
git add .
git commit -m "Proyecto Final 2.0: sitio React, WordPress local, SSL, SEO y documentacion"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/girlys-proyecto-final.git
git push -u origin main
```

Si GitHub pide contraseña, **no es la de la cuenta**: hay que crear un *token*
(GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens)
y usarlo como contraseña.

Verificar que **no** se subió nada sensible:

```powershell
git ls-files | Select-String "\.env$|CLAVE|\.key$|php/"
```

No debe devolver nada.

---

## 9.3 Publicar en Vercel

1. Entrar a <https://vercel.com> con la cuenta de GitHub.
2. **Add New → Project**.
3. Importar `girlys-proyecto-final`.
4. Configuración:

| Campo | Valor |
|---|---|
| Framework Preset | **Vite** (o "Other") |
| Root Directory | `01-Sitio-Web` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

> Si Vercel detecta el `vercel.json` de la raíz, usará esa configuración automáticamente.
> Las dos formas funcionan; no mezclar.

5. **Environment Variables** → agregar una por una:

| Nombre | Ejemplo | Obligatoria |
|---|---|---|
| `VITE_SITE_ORIGIN` | `https://girlys.vercel.app` o el dominio final | Sí |
| `VITE_WHATSAPP_PHONE` | `59170000000` | Sí |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Si ya existe GA4 |
| `VITE_INSTAGRAM_URL` | `https://instagram.com/...` | Opcional |
| `VITE_FACEBOOK_URL` | `https://facebook.com/...` | Opcional |
| `VITE_BLOG_URL` | `/blog` (solo si el blog estará en el mismo dominio) | Opcional |

6. **Deploy**.

En 1-2 minutos queda en `https://girlys-proyecto-final.vercel.app`.

### Probar

- `/` carga el sitio.
- `/servicios` carga el sitio (no 404).
- El candado es válido (Vercel emite su propio certificado).
- La calculadora y el botón de WhatsApp funcionan.

---

## 9.4 Dominio propio en Vercel

1. Vercel → proyecto → **Settings → Domains**.
2. Agregar `tudominio.com` y `www.tudominio.com`.
3. Vercel muestra los registros DNS:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

4. Cargarlos en el panel del dominio (o pedírselos al proveedor).
5. Esperar la propagación (5 min a 24 h) y pulsar **Refresh**.
6. Actualizar `VITE_SITE_ORIGIN` con el dominio final y volver a desplegar.

> El certificado lo emite Vercel automáticamente. No hace falta Let's Encrypt ni ZeroSSL
> cuando el sitio está en Vercel; esos se usan en hosting tradicional (documento 3).

---

## 9.5 Actualizar el sitio después

Cada cambio local:

```powershell
git add .
git commit -m "Describe el cambio"
git push
```

Vercel reconstruye solo. No hay que subir archivos por FTP.

Para cambios de contenido (precios, textos):

1. Editar `01-Sitio-Web/src/data.js`.
2. `npm run build` para probar en local.
3. Commit y push.

---

## 9.6 El blog en Vercel: opciones reales

| Opción | Ventaja | Desventaja |
|---|---|---|
| **A. Blog en hosting PHP** (recomendado) | WordPress completo, como se pidió | Necesita hosting aparte |
| **B. Blog en subdominio** (`blog.tudominio.com`) | Separado y limpio | Otro hosting igual |
| **C. Sin blog publicado** | Todo en Vercel | No se cumple el punto de CMS en producción |
| **D. Blog estático** | Rápido | No es WordPress |

Si elegís A o B, en Vercel hay que poner `VITE_BLOG_URL` con la URL completa
(`https://blog.tudominio.com`) para que el enlace del pie no apunte a `/blog` (que en Vercel no existe).

---

## 9.7 Checklist de publicación

- [ ] Repositorio creado y `git push` exitoso.
- [ ] `git ls-files` no muestra `.env`, claves ni contraseñas.
- [ ] Proyecto importado en Vercel.
- [ ] Variables de entorno cargadas.
- [ ] Deploy en verde.
- [ ] Rutas internas funcionan (SPA).
- [ ] `VITE_SITE_ORIGIN` con la URL real.
- [ ] Dominio conectado (si ya lo tenés).
- [ ] Sitemap y robots con el dominio correcto.
- [ ] Search Console verificado.
- [ ] Blog publicado aparte o decisión tomada.

---

## 9.8 Resumen para la defensa

1. Código versionado en **GitHub** con `.gitignore` que excluye secretos y binarios.
2. Despliegue automático en **Vercel** desde la rama `main`.
3. HTTPS automático de Vercel.
4. Variables de entorno separadas del código.
5. Blog WordPress documentado para hosting PHP (Vercel no ejecuta PHP).

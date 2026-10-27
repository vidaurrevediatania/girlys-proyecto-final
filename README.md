# Girlys · Proyecto Final 2.0

Sitio web de manicura y pedicura con **precio cerrado**, más un blog estático,
listo para correr en una PC con Windows y publicarse en **Vercel** con GitHub.

> **Arquitectura:** React + Vite para todo el sitio, blog en Markdown dentro del
> mismo proyecto y despliegue estático en Vercel. **No hay WordPress, PHP, MySQL
> ni base de datos.** Eso elimina el hosting aparte y deja el despliegue en dos pasos.

**Sitio publicado:** <https://girlys-proyecto-final.vercel.app>  
**Repositorio:** <https://github.com/vidaurrevediatania/girlys-proyecto-final>

---

## Qué incluye

| Carpeta | Contenido |
|---|---|
| `01-Sitio-Web` | Sitio React + Vite: calculadora, reserva por WhatsApp, blog y SEO |
| `03-Servidor-Local` | Servidor HTTPS local, certificado y scripts de arranque |
| `04-Documentacion` | Los 7 puntos explicados + publicación en Vercel |
| `05-Recursos` | Capturas y material para redes sociales |
| `vercel.json` | Configuración lista para Vercel |

---

## Arranque rápido (Windows)

Requisitos: **Node.js 18 o superior** y **Git** (GitHub Desktop lo instala; se usa para el certificado local y para publicar).

```powershell
# 1. Instalar dependencias y construir (solo la primera vez)
03-Servidor-Local\instalar.ps1

# 2. Encender
03-Servidor-Local\iniciar.ps1
```

Luego abrir:

- Sitio: <https://localhost:8443/>
- Blog: <https://localhost:8443/blog>
- Entrada de ejemplo: <https://localhost:8443/blog/cuidado-semipermanente>

El navegador advertirá por el certificado autofirmado: **Avanzado → Continuar**.

---

## Publicar en Vercel

El proyecto ya está preparado. Solo hacen falta tus cuentas:

1. Crear un repositorio en GitHub y subir la carpeta.
2. En Vercel: **Add New → Project** → importar el repositorio.
3. **Deploy**.

No hay variables obligatorias: la primera publicación funciona con los datos de
demostración y toma automáticamente la URL que asigna Vercel.

Cuando tengas el dominio:

```powershell
03-Servidor-Local\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

Luego `git add .`, `git commit` y `git push`. Vercel reconstruye solo.

El paso a paso está en [8-subir-al-hosting.md](04-Documentacion/8-subir-al-hosting.md).

---

## Cómo se administra el blog

Cada entrada es un archivo Markdown en `01-Sitio-Web/src/content/blog`:

```markdown
---
titulo: Cómo cuidar la manicura semipermanente
descripcion: Siete hábitos que alargan el esmaltado.
fecha: 2026-10-26
categoria: Cuidado de uñas
imagen: /blog/cuidado-semipermanente.webp
imagenAlt: Uñas con esmaltado nude
---

El texto de la entrada, con **Markdown** normal.
```

Para publicar una entrada nueva:

1. Crear el archivo `.md` con ese formato.
2. Guardar la imagen en `01-Sitio-Web/public/blog`.
3. Hacer `git add`, `git commit` y `git push`.
4. Vercel reconstruye y publica sola. El sitemap se actualiza también.

El sistema de gestión de contenidos es **Git + Markdown**: se edita desde GitHub
o localmente, queda el historial de cambios y se puede volver atrás.

---

## Comandos

```powershell
# Sitio
cd 01-Sitio-Web
npm install
npm run build        # genera dist/, sitemap.xml y robots.txt
npm run dev          # desarrollo con recarga
```

---

## Documentación

1. [Tema, modelo de ingreso, dominio y CMS](04-Documentacion/1-tema-dominio-cms.md)
2. [Instalación local del sitio y del blog](04-Documentacion/2-instalacion-cms-dominio.md)
3. [SSL local y SSL de Vercel](04-Documentacion/3-ssl.md)
4. [Google Analytics 4](04-Documentacion/4-google-analytics.md)
5. [Facebook e Instagram sin pagar](04-Documentacion/5-redes-sociales.md)
6. [Técnicas de SEO](04-Documentacion/6-seo.md)
7. [Vista inicial, tema y dependencias](04-Documentacion/7-vista-inicial-plugins.md)
8. [Publicar en Vercel](04-Documentacion/8-subir-al-hosting.md)
9. [GitHub, Vercel y mantenimiento](04-Documentacion/9-publicar-github-vercel.md)

---

## Datos que faltan reemplazar

Antes de presentar el sitio como negocio real:

- [ ] WhatsApp definitivo
- [ ] Direcciones y teléfonos de las 3 sucursales
- [ ] Horarios
- [ ] Precios confirmados
- [ ] Fotos propias (las actuales son de muestra)
- [ ] Dominio real
- [x] ID de Google Analytics (`G-ZMHXH6EH9Y`, en `.env.production`)
- [x] Instagram: <https://www.instagram.com/girlys.sucre/> (`VITE_INSTAGRAM_URL`)
- [x] Facebook: <https://www.facebook.com/share/1EwZ2ADCBq/> (`VITE_FACEBOOK_URL`)
- [ ] Textos legales revisados

Todo lo comercial vive en `01-Sitio-Web/src/data.js` y `01-Sitio-Web/.env`.

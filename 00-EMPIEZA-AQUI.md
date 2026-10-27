# EMPIEZA AQUÍ

Guía corta para abrir el proyecto y entender qué hay en cada carpeta.
Todo está **en tu PC**. No hace falta WordPress, PHP, MySQL ni Docker.

> **Sitio ya publicado:** <https://girlys-proyecto-final.vercel.app>  
> **Repositorio:** <https://github.com/vidaurrevediatania/girlys-proyecto-final>  
> Ese dominio gratuito de Vercel es suficiente para la entrega.

---

## 1. Abrir el sitio (2 pasos)

La primera vez:

1. Entra a la carpeta **`03-Servidor-Local`**.
2. Haz doble clic en **`instalar.ps1`**. Instala las dependencias y construye el sitio.

Después, cada vez que quieras usarlo:

1. Entra a **`03-Servidor-Local`**.
2. Haz doble clic en **`iniciar.ps1`**.

Abre en el navegador:

| Qué | Dirección |
|---|---|
| Sitio principal | <https://localhost:8443/> |
| Blog | <https://localhost:8443/blog> |
| Una entrada del blog | <https://localhost:8443/blog/cuidado-semipermanente> |

> La primera vez el navegador dirá **"La conexión no es privada"**.
> Haz clic en **Avanzado** y luego en **Continuar a localhost (no seguro)**.
> Es normal: el certificado es autofirmado, o sea, lo creamos nosotros.

**Para apagar:** cierra la ventana negra o pulsa `Ctrl + C`.

---

## 2. ¿Qué hay en cada carpeta?

```
Proyecto Final 2.0
│
├─ 01-Sitio-Web       EL SITIO COMPLETO (React + Vite + blog).
│                     src/data.js          ← precios, direcciones, preguntas
│                     src/content/blog     ← entradas del blog en Markdown
│                     .env                 ← WhatsApp, Analytics, redes
│                     dist                 ← sitio construido (se publica en Vercel)
│
├─ 03-Servidor-Local  Lo que hace que todo funcione en tu PC.
│                     iniciar.ps1          ← enciende
│                     detener.ps1          ← apaga
│                     instalar.ps1         ← instala y construye
│                     configurar-dominio.ps1 ← pone el dominio real
│
├─ 04-Documentacion   Los 7 puntos de la consigna, explicados.
│
├─ 05-Recursos        Capturas del sitio y material para redes.
│
└─ README.md          Resumen para GitHub.
```

> **No hay WordPress.** El blog es parte del mismo sitio React y se administra
> desde archivos Markdown en GitHub. Eso permite publicar todo en Vercel con un clic,
> sin pagar hosting PHP ni mantener una base de datos.

---

## 3. Los 7 puntos y dónde está cada uno

| Punto | Documento | Estado |
|---|---|---|
| 1. Tema, modelo de ingreso, dominio y CMS | `04-Documentacion/1-tema-dominio-cms.md` | ✅ Definido y documentado |
| 2. Instalación del sitio y del blog | `04-Documentacion/2-instalacion-cms-dominio.md` | ✅ Funcionando en local |
| 3. SSL | `04-Documentacion/3-ssl.md` | ✅ Local autofirmado + Vercel automático |
| 4. Google Analytics | `04-Documentacion/4-google-analytics.md` | ✅ Configurado con el ID `G-ZMXH6EH9Y` |
| 5. Facebook e Instagram sin pago | `04-Documentacion/5-redes-sociales.md` | ✅ Material listo; faltan crear las cuentas |
| 6. SEO | `04-Documentacion/6-seo.md` | ✅ Aplicado; falta dominio real |
| 7. Vista inicial, tema y dependencias | `04-Documentacion/7-vista-inicial-plugins.md` | ✅ Hecho |
| 8. Publicar en Vercel | `04-Documentacion/8-subir-al-hosting.md` | ✅ Preparado |
| 9. GitHub, Vercel y mantenimiento | `04-Documentacion/9-publicar-github-vercel.md` | ✅ Preparado |

---

## 4. Lo que tienes que hacer tú (y nadie puede hacer por ti)

1. **Crear el repositorio de GitHub** y subir la carpeta. Los comandos están en el documento 8.
2. **Importar el repositorio en Vercel**. El proyecto ya trae `vercel.json`: no hay que configurar nada.
3. **Google Analytics ya está configurado** con el ID `G-ZMXH6EH9Y` en
   `01-Sitio-Web/.env.production`. No tienes que pegar nada.
4. **Crear Instagram y Facebook** con tu teléfono. El material ya está en `05-Recursos/redes`.
5. **Pasar tus datos reales** (WhatsApp, direcciones, precios y fotos) cuando los tengas.

---

## 5. Publicar en Vercel (resumen)

El sitio **ya está publicado** en:

```
https://girlys-proyecto-final.vercel.app
```

1. Subir el proyecto a GitHub.
2. En <https://vercel.com>, **Add New → Project** e importar el repositorio.
3. Pulsar **Deploy**.

Vercel lee `vercel.json`, construye `01-Sitio-Web` y publica el sitio y el blog.
No hace falta configurar PHP, base de datos ni variables obligatorias.

La URL gratuita de Vercel es suficiente para la entrega. Si más adelante quieres
un dominio propio:

1. Vercel → **Settings → Domains** → agregar el dominio.
2. Ejecutar `03-Servidor-Local\configurar-dominio.ps1 -Dominio "https://tudominio.com"`.
3. Hacer commit y push para que Vercel reconstruya con el dominio nuevo.

El paso a paso completo está en `04-Documentacion/8-subir-al-hosting.md`.

---

## 6. Si algo falla

| Problema | Solución |
|---|---|
| "No se puede acceder a este sitio" | El servidor está apagado: ejecuta `iniciar.ps1` |
| El blog muestra una página en blanco | Falta construir: `cd 01-Sitio-Web; npm run build` |
| Cambié algo y no se ve | Reconstruir con `npm run build` y recargar |
| Quiero reinstalar todo de cero | Ejecutar `instalar.ps1` otra vez |
| Vercel da error al construir | Revisar que el repositorio incluya `01-Sitio-Web/package-lock.json` |

---

## 7. Antes de presentar el negocio como real

El sitio tiene **datos de demostración**. Hay que reemplazar en `01-Sitio-Web/src/data.js`:

- WhatsApp, teléfonos y direcciones
- Horarios
- Precios
- Fotos (las actuales son de muestra)

La lista completa está en `README.md`, sección "Datos que faltan reemplazar".

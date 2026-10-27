# EMPIEZA AQUÍ

Guía corta para abrir el proyecto y entender qué hay en cada carpeta.
Todo está **en tu PC**. No hace falta internet para usarlo (solo para la primera instalación).

---

## 1. Abrir el sitio (2 pasos)

1. Entra a la carpeta **`03-Servidor-Local`**.
2. Haz doble clic en **`iniciar.ps1`**.

Se abre una ventana negra. Espera 3 segundos y abre en el navegador:

| Qué | Dirección |
|---|---|
| Sitio principal | <https://localhost:8443/> |
| Blog | <https://localhost:8443/blog/> |
| Panel del blog | <https://localhost:8443/blog/wp-admin/> |

> La primera vez el navegador dirá **"La conexión no es privada"**.
> Haz clic en **Avanzado** y luego en **Continuar a localhost (no seguro)**.
> Es normal: el certificado es autofirmado, o sea, lo creamos nosotros.

**Para apagar:** cierra la ventana negra o pulsa `Ctrl + C`.

---

## 2. ¿Qué hay en cada carpeta?

```
Proyecto Final 2.0
│
├─ 01-Sitio-Web       EL SITIO (React). Aquí se cambian textos y precios.
│                     src/data.js  ← precios, direcciones, preguntas
│                     .env         ← WhatsApp, Analytics, redes
│
├─ 02-WordPress       EL BLOG. Tema Astra + plugins.
│                     CLAVE-ADMIN-LOCAL.txt ← usuario y contraseña del panel
│
├─ 03-Servidor-Local  Lo que hace que todo funcione en tu PC.
│                     iniciar.ps1        ← enciende
│                     detener.ps1        ← apaga
│                     instalar.ps1       ← instala desde cero
│                     configurar-dominio.ps1 ← pone el dominio real
│
├─ 04-Documentacion   Los 7 puntos de la consigna, explicados.
│
├─ 05-Recursos        Capturas del sitio y textos para redes.
│
└─ 99-Descargas       Instaladores (PHP, WordPress, plugins). Se puede borrar.
```

---

## 3. Los 7 puntos y dónde está cada uno

| Punto | Documento | Estado |
|---|---|---|
| 1. Tema, modelo de ingreso, dominio, CMS | `04-Documentacion/1-tema-dominio-cms.md` | ✅ Definido y documentado |
| 2. Instalación del CMS y dominio | `04-Documentacion/2-instalacion-cms-dominio.md` | ✅ Instalado en local |
| 3. SSL (autofirmado / Let's Encrypt / ZeroSSL) | `04-Documentacion/3-ssl.md` | ✅ Local; hosting documentado |
| 4. Google Analytics | `04-Documentacion/4-google-analytics.md` | ✅ Código listo; falta tu ID |
| 5. Facebook e Instagram sin pago | `04-Documentacion/5-redes-sociales.md` | ✅ Material listo; faltan crear las cuentas |
| 6. SEO | `04-Documentacion/6-seo.md` | ✅ Aplicado; falta dominio real |
| 7. Vista inicial, tema y plugins | `04-Documentacion/7-vista-inicial-plugins.md` | ✅ Hecho |

---

## 4. Lo que tienes que hacer tú (y nadie puede hacer por ti)

1. **Crear la cuenta de Google Analytics** (necesita tu correo de Google) y pegar el ID `G-...`
   en `01-Sitio-Web/.env`.
2. **Crear Instagram y Facebook** con tu teléfono. El material ya está en `05-Recursos/redes`.
3. **Pasar el dominio y el hosting** cuando te los den. Después ejecutar
   `configurar-dominio.ps1` y subir la carpeta `01-Sitio-Web/dist`.

---

## 5. Si algo falla

| Problema | Solución |
|---|---|
| "No se puede acceder a este sitio" | El servidor está apagado: ejecuta `iniciar.ps1` |
| El blog da error 502 | PHP no arrancó: mira `03-Servidor-Local/logs/php-error.log` |
| Cambié algo y no se ve | `cd 01-Sitio-Web` y `npm run build` |
| Olvidé la contraseña del blog | Está en `02-WordPress/CLAVE-ADMIN-LOCAL.txt` |
| Quiero reinstalar todo de cero | Borra `03-Servidor-Local/datos/wordpress.sqlite` y ejecuta `instalar.ps1` |

---

## 6. Antes de publicar

El sitio tiene **datos de demostración**. Antes de presentarlo como negocio real hay que
reemplazar en `src/data.js`:

- WhatsApp, teléfonos y direcciones
- Horarios
- Precios
- Fotos (las actuales son de muestra)

La lista completa está en `README.md`, sección "Datos que faltan reemplazar".

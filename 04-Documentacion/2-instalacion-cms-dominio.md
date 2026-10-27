# Punto 2 · Instalación del CMS y del dominio (en tu PC)

Todo está instalado y funcionando **sin pagar hosting**. Este documento explica qué hay,
cómo se enciende y qué hacer si algo falla.

---

## 2.1 Qué se instaló

| Pieza | Versión | Dónde |
|---|---|---|
| PHP | 8.2.35 (portátil, no se instala en Windows) | `03-Servidor-Local\php` |
| WordPress | última versión en español | `02-WordPress` |
| Base de datos | **SQLite** (archivo, sin MySQL) | `03-Servidor-Local\datos\wordpress.sqlite` |
| Tema | Astra (gratis) | WordPress |
| Plugins | Rank Math SEO, UpdraftPlus, Wordfence | WordPress |
| Servidor local | Node.js + HTTPS autofirmado | `03-Servidor-Local\servidor.js` |

> **No hace falta XAMPP, ni MySQL, ni Docker, ni permisos de administrador.**
> PHP viaja dentro de la carpeta del proyecto.

### Por qué SQLite

WordPress normalmente necesita MySQL (un servicio más que instalar y configurar).
El plugin oficial **SQLite Database Integration** guarda toda la base en un solo archivo.
Ventajas para la entrega:

- Cero configuración de base de datos.
- El respaldo es copiar **un archivo**.
- No hay contraseñas de base de datos que cuidar.

En el hosting real se puede usar MySQL sin cambiar nada del contenido (ver documento 8).

---

## 2.2 Cómo encenderlo

1. Abre la carpeta `03-Servidor-Local`.
2. Doble clic en **`iniciar.ps1`**
   (si Windows pregunta, elegir *Ejecutar con PowerShell*).
3. Se abre una ventana negra. Espera a ver:

```
Sitio web ....... https://localhost:8443/
Blog WordPress .. https://localhost:8443/blog/
Panel de WP ..... https://localhost:8443/blog/wp-admin/
```

4. Abre el navegador en `https://localhost:8443/`.

> La primera vez Chrome/Edge dirá **"La conexión no es privada"**.
> Es normal: el certificado es autofirmado (hecho por nosotros, no por una autoridad).
> Haz clic en **Avanzado → Continuar a localhost (no seguro)**.

### Apagarlo

- Cierra la ventana negra, o
- Pulsa `Ctrl + C` dentro de ella.

Si quedó un proceso colgado, ejecuta `detener.ps1` o reinicia el equipo.

---

## 2.3 Acceso al panel de WordPress

| Dato | Valor |
|---|---|
| URL | `https://localhost:8443/blog/wp-admin/` |
| Usuario | `girlys_admin` |
| Contraseña | está en `02-WordPress\CLAVE-ADMIN-LOCAL.txt` |

**Ese archivo es privado.** No lo subas a GitHub, no lo muestres en capturas.
Si lo pierdes, se puede cambiar la contraseña con un script (pídemelo).

### Qué vas a encontrar dentro

- **Entradas:** 3 publicadas (cuidado de uñas, francesa clásica, cálculo del precio).
- **Páginas:** Inicio (portada), Blog (lista), Servicios y precios.
- **Categorías:** Cuidado de uñas, Tendencias, Paso a paso.
- **Menú:** Inicio · Blog · Servicios y precios · Sitio principal.
- **Comentarios:** cerrados por defecto.
- **Visibilidad en buscadores:** activada (necesaria para que el blog publique `robots.txt` y sus sitemaps).

---

## 2.4 Estructura de la carpeta

```
Proyecto Final 2.0
├─ 00-EMPIEZA-AQUI.md          ← guía rápida
├─ 01-Sitio-Web                ← React + Vite (el sitio)
│   ├─ src                     ← componentes y datos (data.js)
│   ├─ public                  ← imágenes, robots, sitemap
│   ├─ dist                    ← sitio construido (esto se sube al hosting)
│   └─ .env                    ← dominio, WhatsApp, Analytics, redes
├─ 02-WordPress                ← WordPress completo (blog)
├─ 03-Servidor-Local           ← PHP, certificado, servidor, scripts
├─ 04-Documentacion            ← estos documentos (7 puntos)
├─ 05-Recursos                 ← capturas y material para redes
└─ 99-Descargas                ← instaladores originales (se puede borrar)
```

---

## 2.5 Comandos útiles

Desde `03-Servidor-Local`:

```powershell
.\iniciar.ps1                     # enciende sitio + blog
.\detener.ps1                     # apaga todo
.\generar-certificado.ps1         # rehace el certificado SSL local
.\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

Desde `02-WordPress` (con PHP del proyecto):

```powershell
..\03-Servidor-Local\php\php.exe ..\03-Servidor-Local\instalar-wordpress.php
..\03-Servidor-Local\php\php.exe ..\03-Servidor-Local\verificar.php
```

- `instalar-wordpress.php` es idempotente: se puede ejecutar de nuevo sin duplicar contenido.
- `verificar.php` muestra tema, plugins, entradas, páginas y enlaces.

---

## 2.6 Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| "No se puede acceder a este sitio" | El servidor no está encendido | Ejecutar `iniciar.ps1` |
| Página en blanco en `/blog` | PHP no arrancó | Revisar `03-Servidor-Local\logs\php-error.log` |
| "La conexión no es privada" | Certificado autofirmado | Avanzado → Continuar |
| El puerto 8443 está ocupado | Quedó una ventana anterior abierta | Cerrar las ventanas negras y reintentar |
| Cambié el diseño y no se ve | Falta reconstruir | `cd 01-Sitio-Web; npm run build` |
| WordPress pide instalar de nuevo | Se borró `datos\wordpress.sqlite` | Ejecutar `instalar-wordpress.php` |

---

## 2.7 Lo que falta para el hosting real

Este montaje es local. Cuando tengas el dominio y el hosting:

1. Subir el contenido de `01-Sitio-Web\dist` a `public_html`.
2. Instalar WordPress en `/blog` (CWP o cPanel) y pasar el contenido con
   **Herramientas → Exportar / Importar**.
3. Activar SSL gratis (documento 3).
4. Ejecutar `configurar-dominio.ps1` antes de construir.

Está detallado en el **documento 8**.

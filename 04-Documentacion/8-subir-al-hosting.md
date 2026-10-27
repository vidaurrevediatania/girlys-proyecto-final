# Punto 8 · Publicar el sitio en internet (GitHub + Vercel)

Esta es la parte que haces tú. Son dos cuentas gratuitas y dos pasos:
**subir el proyecto a GitHub** e **importarlo en Vercel**. No hay que configurar
PHP, base de datos, certificados ni hosting.

> **Antes de empezar:** el proyecto ya está preparado. `vercel.json` contiene
> todo lo necesario para construir y publicar el sitio y el blog.

---

## 8.1 Lo que necesitas

- [ ] Cuenta de **GitHub** (gratis): <https://github.com/signup>
- [ ] Cuenta de **Vercel** (gratis): <https://vercel.com/signup>
- [ ] El proyecto en tu PC, con el sitio funcionando en `https://localhost:8443`

Para crear la cuenta de Vercel, elige **Continue with GitHub**. Así quedan conectadas
y no tienes que recordar otra contraseña.

---

## 8.2 Checklist antes de subir

- [ ] El sitio abre bien en `https://localhost:8443/`.
- [ ] El blog abre bien en `https://localhost:8443/blog`.
- [ ] Los datos de demostración están claros (WhatsApp, direcciones, precios).
- [ ] No hay contraseñas ni claves en el proyecto.

El archivo `.gitignore` ya excluye lo que no debe subir:

```
node_modules/          ← dependencias (se instalan solas en Vercel)
01-Sitio-Web/dist/     ← construcción (Vercel la hace)
.env                   ← tus datos locales
03-Servidor-Local/certs/        ← certificados locales (se generan solos)
```

---

## 8.3 Subir el proyecto a GitHub

Elige **una** de las dos formas. La A es la más fácil si no usas la terminal.

### Opción A · GitHub Desktop (recomendada)

1. Descargar **GitHub Desktop** gratis: <https://desktop.github.com>
2. Instalarlo y abrirlo.
3. Iniciar sesión con la cuenta de GitHub.
4. Menú **File → Add local repository…**
5. Elegir la carpeta **`Proyecto Final 2.0`** (la que contiene `01-Sitio-Web`).
6. Si dice que no es un repositorio, pulsar **create a repository** y aceptar.
7. Arriba a la derecha, pulsar **Publish repository**.
8. Nombre: `girlys-proyecto-final`.
9. **Desmarcar** *Keep this code private* si quieres que sea público
   (para la entrega suele servir privado; Vercel puede leer repositorios privados).
10. Pulsar **Publish repository**.

GitHub Desktop sube solo los archivos permitidos y omite `node_modules`, `dist`,
`.env` y las claves.

### Opción B · PowerShell

Abrir PowerShell **dentro de la carpeta `Proyecto Final 2.0`** y ejecutar:

```powershell
git status
git add .
git commit -m "Proyecto Final 2.0: sitio React con blog estatico"
git branch -M main
```

Luego crear el repositorio vacío en <https://github.com/new>:

- Nombre: `girlys-proyecto-final`
- **No** marcar "Add a README", "Add .gitignore" ni licencia.
- Pulsar **Create repository**.

GitHub muestra una dirección parecida a:

```
https://github.com/TU-USUARIO/girlys-proyecto-final.git
```

Copiarla y ejecutar (reemplazando la dirección):

```powershell
git remote add origin https://github.com/TU-USUARIO/girlys-proyecto-final.git
git push -u origin main
```

La primera vez se abre una ventana del navegador para iniciar sesión en GitHub.
No hay que escribir una contraseña en la terminal.

### Comprobar que no se subió nada privado

En PowerShell, dentro del proyecto:

```powershell
git ls-files | Select-String "\.env$|CLAVE|\.key$|node_modules|/dist/"
```

No debe devolver nada. Si devuelve algo, avisar antes de publicar.

---

## 8.4 Publicar en Vercel

1. Entrar a <https://vercel.com> e iniciar sesión **con GitHub**.
2. Pulsar **Add New… → Project**.
3. En la lista, buscar `girlys-proyecto-final` y pulsar **Import**.
   (Si no aparece, pulsar **Adjust GitHub App Permissions** y dar acceso al repositorio.)
4. En la pantalla de configuración:

| Campo | Qué poner |
|---|---|
| **Project Name** | `girlys-proyecto-final` (o el que quieras) |
| **Framework Preset** | **Other** |
| **Root Directory** | **dejar vacío** (la raíz del repositorio) |
| **Build Command** | dejar el que aparece (lo toma de `vercel.json`) |
| **Output Directory** | dejar el que aparece |
| **Environment Variables** | ninguna por ahora |

> **Importante:** no elegir la carpeta `01-Sitio-Web` como Root Directory.
> El archivo `vercel.json` de la raíz ya indica dónde está el sitio y cómo construirlo.

5. Pulsar **Deploy**.
6. Esperar 1 o 2 minutos. Cuando termine, Vercel muestra **Congratulations** y un botón
   **Visit**.
7. La dirección será parecida a:

```
https://girlys-proyecto-final.vercel.app
```

Esa URL ya funciona y tiene HTTPS. Se puede entregar así mientras no haya dominio propio.

---

## 8.5 Probar la publicación

Abrir la URL de Vercel y comprobar:

| Prueba | Resultado esperado |
|---|---|
| `https://TU-PROYECTO.vercel.app/` | Portada con candado |
| `.../blog` | Listado del blog |
| `.../blog/cuidado-semipermanente` | Entrada completa |
| `.../sitemap.xml` | Sitemap con la URL de Vercel |
| `.../robots.txt` | Robots apuntando al sitemap |
| `.../blog/no-existe` | Página 404 propia |
| Calculadora | El precio cambia al elegir opciones |
| Botón de WhatsApp | Abre WhatsApp con el resumen |

> El sitemap usará automáticamente la URL de Vercel porque todavía no hay dominio
> configurado. Cuando conectes el dominio, se actualiza solo en la próxima publicación.

---

## 8.6 Conectar un dominio propio (opcional)

**La URL gratuita de Vercel ya sirve para la entrega.** Este paso es solo si más
adelante quieres un dominio como `girlys.com.bo`.

1. Comprar el dominio (NIC Bolivia, Namecheap, GoDaddy o similar).
2. En Vercel: abrir el proyecto → **Settings → Domains**.
3. Escribir el dominio y pulsar **Add**.
4. Vercel muestra los registros DNS. Cargarlos en el panel del proveedor del dominio:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

5. Esperar la propagación (5 minutos a 24 horas) y pulsar **Refresh** en Vercel.
6. Cuando Vercel diga **Valid Configuration**, ejecutar en tu PC:

```powershell
cd "03-Servidor-Local"
.\configurar-dominio.ps1 -Dominio "https://tudominio.com"
```

7. Hacer `commit` y `push` (o publicar desde GitHub Desktop).
8. Vercel reconstruye y el canonical, el sitemap y `robots.txt` quedan con el dominio nuevo.

El certificado HTTPS del dominio lo emite Vercel automáticamente.

---

## 8.7 Si Vercel muestra un error

| Mensaje | Causa probable | Solución |
|---|---|---|
| `No package.json found` | Se eligió mal la Root Directory | Volver a Settings → General → Root Directory: vacío |
| `vite: not found` | No se instalaron las dependencias | Revisar que `01-Sitio-Web/package-lock.json` esté en GitHub |
| `Build failed` | Un archivo no compila | Ejecutar `npm run build` en local y corregir el error |
| La página carga en blanco | Se publicó `dist` viejo o falta el rewrite | Revisar que `vercel.json` esté en la raíz del repositorio |
| El blog da 404 al entrar directo | Falta el rewrite del SPA | Confirmar que `vercel.json` incluye `"rewrites"` |
| No aparece el repositorio | Vercel no tiene permiso | **Adjust GitHub App Permissions** y dar acceso |

Para volver a desplegar después de corregir: hacer `commit` y `push`.
Vercel publica solo, sin tocar ningún panel.

---

## 8.8 Resumen para la defensa

1. Código versionado en **GitHub**.
2. Publicación automática en **Vercel** desde la rama `main`.
3. HTTPS automático y gratuito.
4. Un solo despliegue incluye el sitio y el blog.
5. Sin hosting PHP, sin base de datos y sin costo mensual.

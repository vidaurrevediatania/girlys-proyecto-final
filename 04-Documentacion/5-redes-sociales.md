# Punto 5 · Facebook e Instagram (sin pagar nada)

Crear cuentas y publicar es gratis. Lo único que no se puede automatizar es **crear las cuentas**:
eso lo tenés que hacer vos con tu correo y tu teléfono, porque Meta pide verificación.

Todo el material ya está preparado en `05-Recursos\redes`:

| Archivo | Para qué |
|---|---|
| `perfil-1080.png` / `.jpg` | Foto de perfil lista (1080 × 1080) |
| `textos-publicaciones.md` | Las primeras 9 publicaciones escritas |
| `calendario-4-semanas.md` | Qué publicar cada semana |
| `generar-imagen-perfil.ps1` | Vuelve a generar la foto si cambia el nombre |
| `generar-imagen-og.ps1` | Vuelve a generar la imagen de portada para compartir |

---

## 5.1 Crear la cuenta de Instagram (profesional, gratis)

1. Descargar Instagram en el teléfono (o entrar a <https://instagram.com>).
2. **Crear cuenta nueva** con el correo del negocio.
3. Usuario sugerido (elegir uno libre):

```
@girlys.nails
@girlys.manicura
@girlys.sucre
```

4. Cuando pregunte el tipo de cuenta, elegir **Profesional → Empresa** (es gratis).
5. Categoría: **Salón de uñas**.
6. Foto de perfil: subir `perfil-1080.jpg`.
7. Nombre visible (no el usuario): **Girlys · Manicura y pedicura**.
8. Biografía: copiar el texto de abajo.

### Biografía lista para pegar

```
Manicura y pedicura con precio cerrado 💅
Calculá tu precio antes de reservar
3 salones en Sucre, Bolivia
👇 Reservá por WhatsApp
```

9. En el campo **Sitio web**, pegar el dominio publicado:
   `https://girlys-proyecto-final.vercel.app` (Instagram no acepta `localhost`).
10. Activar el botón de WhatsApp en el perfil:
    **Editar perfil → Acciones → WhatsApp** → número del salón.

---

## 5.2 Crear la página de Facebook (gratis)

1. Entrar a <https://facebook.com/pages/create>.
2. Nombre: **Girlys · Manicura y pedicura**.
3. Categoría: **Salón de uñas**.
4. Foto de perfil: `perfil-1080.jpg`.
5. Foto de portada: usar una foto real del salón (mínimo 820 × 312 px) o
   `01-Sitio-Web\public\og-girlys.jpg` como provisional.
6. Descripción:

```
Manicura y pedicura con precio cerrado en Sucre.
Calculá tu precio en el sitio y reservá por WhatsApp. Anticipo del 50 %.
```

7. En **Configuración → General → Nombre de usuario**: `girlys.nails` (o el que esté libre).
8. En **Información de contacto**, agregar el WhatsApp y el horario.
9. Botón de acción: **Enviar mensaje por WhatsApp**.

---

## 5.3 Vincular Instagram con Facebook (gratis y recomendado)

1. En Instagram: **Configuración → Cuenta → Compartir en otras apps → Facebook**.
2. Iniciar sesión y elegir la página.
3. Ventaja: publicás una vez y sale en las dos redes.
4. También se puede programar desde **Meta Business Suite** (gratis):
   <https://business.facebook.com>.

> Esto **no** activa anuncios. Todo sigue siendo orgánico y sin costo.

---

## 5.4 Qué NO hacer (para no gastar)

- No pulsar **"Promocionar publicación"** ni **"Impulsar"**: eso cobra.
- No crear campañas en Meta Ads.
- No comprar seguidores ni "paquetes de crecimiento".
- No usar música con derechos en Reels (mejor audio original o de la biblioteca).

Todo lo que se pide en la consigna se cumple con cuentas orgánicas.

---

## 5.5 Conectar las redes con el sitio

Cuando tengas las URLs, abrir `01-Sitio-Web\.env.production` (el archivo que usa el sitio
publicado) y completar:

```env
VITE_INSTAGRAM_URL=https://instagram.com/girlys.nails
VITE_FACEBOOK_URL=https://facebook.com/girlys.nails
VITE_TIKTOK_URL=
VITE_YOUTUBE_URL=
```

Para probar en la PC alcanza con repetir lo mismo en `01-Sitio-Web\.env` y ejecutar:

```powershell
cd "01-Sitio-Web"
npm run build
```

Para que se vea en el sitio publicado, además hay que subir el cambio:

```powershell
git add 01-Sitio-Web/.env.production
git commit -m "Agregar enlaces de Instagram y Facebook"
git push origin main
```

Vercel reconstruye sola en un par de minutos. Los iconos aparecen en el pie del sitio. Si una
URL queda vacía, el icono no se muestra (no hay enlaces rotos).

---

## 5.6 Primera semana: mínimo viable

Para que las cuentas no estén vacías el día de la entrega:

1. **Foto de perfil** y biografía completas.
2. **3 publicaciones**:
   - Presentación del salón (texto en `textos-publicaciones.md`, publicación 1).
   - Lista de precios (publicación 2).
   - Antes y después de una manicura (foto real).
3. **Historias destacadas**: "Precios", "Antes y después", "Cómo reservar".
4. En cada publicación, invitá a calcular el precio en el sitio.

Con eso ya se ve una cuenta activa y coherente con la web.

---

## 5.7 Resumen para la defensa

| Requisito | Cómo se cumple |
|---|---|
| Facebook | Página de empresa gratuita, categoría Salón de uñas |
| Instagram | Cuenta profesional gratuita, vinculada a la página |
| Sin pago | Solo publicaciones orgánicas; nada de anuncios |
| Coherencia visual | Misma foto de perfil, misma paleta y mismo mensaje que la web |
| Conversión | Botón de WhatsApp y enlace al sitio en ambas redes |

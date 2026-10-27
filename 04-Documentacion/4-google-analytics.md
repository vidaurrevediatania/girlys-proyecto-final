# Punto 4 · Google Analytics 4

El sitio **ya tiene el código de Analytics instalado**. Solo falta pegar el identificador
de tu cuenta de Google, porque esa cuenta la tenés que crear vos (yo no puedo crear cuentas
de Google en tu nombre).

---

## 4.1 Cómo está implementado (ya hecho)

Archivo: `01-Sitio-Web\src\lib\analytics.js`

- Si `VITE_GA_MEASUREMENT_ID` está vacío → **no se carga nada** de Google.
- Si hay ID → aparece un aviso de cookies. Analytics **solo se carga si la persona acepta**.
- No se envían nombres, teléfonos ni el texto de la reserva. Solo eventos y el salón.

### Eventos que ya se miden

| Evento | Cuándo se dispara |
|---|---|
| `elegir_servicio` | La clienta elige un servicio en la calculadora |
| `cotizacion` | Cambia forma, largo o diseño y se recalcula el precio |
| `reservar` / `reserva_iniciada` | Empieza el formulario de reserva |
| `reserva_solicitada` | Completa la reserva |
| `clic_reservar` | Pulsa el botón "Reservar" |
| `clic_whatsapp` | Abre WhatsApp (con el origen: calculadora, pie, flotante...) |
| `ver_salon` | Mira una sucursal |
| `clic_social` | Pulsa una red social o el blog |

Con eso se puede responder: **¿cuánta gente calcula un precio y cuánta termina escribiendo?**

---

## 4.2 Crear la propiedad (10 minutos, gratis)

1. Entrar a <https://analytics.google.com> con la cuenta de Google del negocio.
2. Abajo a la izquierda: **Administrar** (icono de engranaje).
3. **Crear → Propiedad**.
4. Nombre: `Girlys` · Zona horaria: **(GMT-04:00) La Paz** · Moneda: **Bolívar (BOB)**.
5. **Siguiente** → *Información del negocio*:
   - Sector: **Comercio y servicios → Belleza y cuidado personal**
   - Tamaño: **Pequeña**
   - Cómo se usa Analytics: marcar las opciones que correspondan.
6. **Crear** y aceptar los términos.
7. Elegir plataforma: **Web**.
8. Flujo de datos:
   - URL del sitio: `https://tudominio.com` (el dominio real; si todavía no lo tenés,
     escribí `https://localhost:8443` y después se cambia).
   - Nombre del flujo: `Sitio Girlys`.
9. **Crear flujo**.
10. Copiar el **ID de medición**, con la forma:

```
G-XXXXXXXXXX
```

---

## 4.3 Pegar el ID en el proyecto

1. Abrir `01-Sitio-Web\.env` con el Bloc de notas.
2. Buscar:

```env
VITE_GA_MEASUREMENT_ID=
```

3. Pegar el ID:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Guardar y reconstruir:

```powershell
cd "01-Sitio-Web"
npm run build
```

5. Reiniciar el servidor (`iniciar.ps1`).

> Si publicás en Vercel, el ID también se puede cargar como variable de entorno en el panel
> de Vercel (Settings → Environment Variables) sin tocar el archivo.

---

## 4.4 Comprobar que funciona

1. Abrir `https://localhost:8443/`.
2. Debe aparecer el aviso de cookies (abajo).
3. Pulsar **Aceptar**.
4. En Analytics: **Informes → Tiempo real**.
5. Debe aparecer **1 usuario activo** en menos de 30 segundos.
6. Probar la calculadora y ver si aparecen los eventos:
   **Administrar → Tiempo real** o **Informes → Compromiso → Eventos**.

### Si no aparece nada

| Revisar | Qué hacer |
|---|---|
| ¿Aceptaste el aviso? | Sin aceptar, el script no se carga (es a propósito) |
| ¿Reconstruiste? | `npm run build` después de cambiar `.env` |
| ¿El ID está bien copiado? | Debe empezar con `G-` y no tener espacios |
| ¿Bloqueador de anuncios? | Desactivarlo para la prueba |

---

## 4.5 Privacidad (importante para la entrega)

- Analytics **no** se carga antes del consentimiento → cumple con la política de cookies.
- La política de privacidad del sitio ya menciona analytics y cómo rechazarlo.
- No se envían datos personales a Google: solo el tipo de servicio, el salón y el precio
  estimado (números, sin identificar a la persona).
- Si más adelante se agrega chat (Tawk.to) o píxel de Meta, **hay que actualizar la política**
  y volver a pedir consentimiento.

---

## 4.6 Resumen para la defensa

1. GA4 creado con la cuenta del negocio.
2. ID pegado en `.env` y sitio reconstruido.
3. Carga **solo con consentimiento**.
4. Eventos personalizados que miden el embudo: calcular → reservar → WhatsApp.
5. Verificado en tiempo real.

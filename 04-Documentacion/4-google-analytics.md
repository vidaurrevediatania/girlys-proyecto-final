# Punto 4 · Google Analytics 4

El sitio **ya tiene el código de Analytics instalado y configurado** con el ID de medición
`G-ZMHXH6EH9Y`. La cuenta y la propiedad ya fueron creadas; no hay que pegar nada.

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
   - URL del sitio: `https://girlys-proyecto-final.vercel.app` (el sitio ya está publicado ahí).
   - Nombre del flujo: `Sitio Girlys`.
9. **Crear flujo**.
10. Copiar el **ID de medición**, con la forma:

```
G-XXXXXXXXXX
```

---

## 4.3 Dónde está guardado el ID

El ID `G-ZMHXH6EH9Y` está en:

```text
01-Sitio-Web/.env.production
```

Contenido:

```env
VITE_GA_MEASUREMENT_ID=G-ZMHXH6EH9Y
```

Ese archivo **sí se sube a GitHub** y Vercel lo usa al construir. El ID de medición es un
dato público (no es una contraseña), por eso no hay problema en que esté en el repositorio.

Si algún día hay que cambiarlo:

1. Editar `01-Sitio-Web/.env.production`.
2. Guardar.
3. Hacer `git add`, `git commit` y `git push`.
4. Vercel reconstruye sola y toma el ID nuevo.

Para pruebas locales con `npm run dev`, el ID se puede poner en `01-Sitio-Web/.env`
(ese archivo no se sube a GitHub). El sitio publicado usa `.env.production`.

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
2. ID `G-ZMHXH6EH9Y` configurado en `.env.production` y sitio reconstruido.
3. Carga **solo con consentimiento**.
4. Eventos personalizados que miden el embudo: calcular → reservar → WhatsApp.
5. Verificado en tiempo real.

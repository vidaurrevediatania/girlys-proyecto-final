# Punto 1 · Tema, modelo de ingreso, dominio y CMS

Este documento explica **qué se decidió** y **por qué**, para que puedas defenderlo en la presentación.

---

## 1.1 Tema del proyecto

**Girlys** es un salón de manicura y pedicura en Santa Cruz de la Sierra, con tres sucursales.
El sitio resuelve un problema concreto del rubro: **la clienta no sabe cuánto va a pagar hasta que se sienta en la silla**.

La propuesta del sitio es una sola frase:

> *Manicura y pedicura con precio cerrado: elegís servicio, forma, largo y diseño, y ves el total antes de reservar.*

Eso se traduce en una función central: **la calculadora de precios** conectada a la reserva por WhatsApp.

---

## 1.2 Modelo de ingreso

El sitio no vende productos: **vende turnos**. El ingreso se genera así:

| Fuente | Cómo funciona | Estado |
|---|---|---|
| Servicios de manicura y pedicura | Precio base por servicio (55 Bs a 230 Bs) | Implementado en el sitio |
| Extras | Francesa +25 Bs, nail art +45 Bs, diseño personalizado +120 Bs, retiro de esmalte +15 Bs | Implementado en la calculadora |
| Anticipo del 50 % | La clienta transfiere la mitad al reservar por WhatsApp; el resto se paga en el salón | Implementado como texto y cálculo; el cobro es manual (transferencia/QR) |
| Fidelización | Volver cada 2-3 semanas (semipermanente) | Sugerido en el blog; sin programa automático todavía |

### Por qué el anticipo del 50 %

- Reduce las ausencias (el problema número uno de los salones).
- Compromete a la clienta sin pedirle el total por adelantado.
- Es fácil de explicar y no necesita pasarela de pago ni comisiones.

### Cómo escala (ideas para después, no implementadas)

1. **Paquete de 3 sesiones** con pequeño descuento (manos + pies).
2. **Membresía mensual** de retoque semipermanente.
3. **Venta de productos** (aceite de cutículas) en el salón.
4. **Recordatorio automático** por WhatsApp a los 20 días.

> Importante para la defensa: el sitio **no cobra online**. El botón abre WhatsApp con el resumen de la reserva y el anticipo. Eso evita comisiones y funciona con lo que el salón ya usa hoy.

---

## 1.3 Dominio

**El sitio ya está publicado** en la URL gratuita de Vercel. No hace falta comprar
un dominio para la entrega.

| Dato | Valor |
|---|---|
| Dominio actual | **https://girlys-proyecto-final.vercel.app** (gratis) |
| Dónde se administra | Vercel → proyecto → **Settings → Domains** |
| SSL | automático y gratis |
| Dominio propio | opcional, para más adelante |

### Cómo funciona

- En local, el sitio usa `https://localhost:8443`.
- En Vercel, la dirección de producción es la URL gratuita del proyecto.
- El canonical, el sitemap y `robots.txt` se generan solos con la dirección del despliegue.
- No hay que ejecutar `configurar-dominio.ps1` mientras se use la URL de Vercel.

### Si más adelante compras un dominio

1. Comprar el dominio (NIC Bolivia, Namecheap, GoDaddy o similar).
2. En Vercel: **Settings → Domains → Add**, escribir el dominio y seguir los registros DNS.
3. Ejecutar en tu PC:
   ```powershell
   cd 03-Servidor-Local
   .\configurar-dominio.ps1 -Dominio "https://tudominio.com"
   ```
4. Hacer `git add .`, `git commit` y `git push`.

Vercel emite el certificado HTTPS solo. No hay que instalar Let's Encrypt ni tocar Apache.

> En el `.env` local, `VITE_SITE_ORIGIN=https://TU-DOMINIO.com` es solo un marcador.
> En Vercel no está configurado, así que el sitio toma automáticamente su URL real.

### Recomendación

- Para la entrega alcanza con la URL gratuita de Vercel.
- Para el negocio conviene un dominio propio: `girlys.com.bo` o `girlysbolivia.com`
  (entre 10 y 15 USD al año). Es un paso opcional.

---

## 1.4 CMS elegido

El proyecto usa un **CMS basado en Git** (también llamado *Git-based CMS*):

| Pieza | Tecnología | Dónde vive | Para qué |
|---|---|---|---|
| Sitio principal | **React + Vite** | `/` | Calculadora, reserva, SEO, velocidad |
| Blog | **Markdown + React** | `/blog` | Publicar entradas sin base de datos |
| Gestión de contenido | **GitHub** | Repositorio | Crear, editar, borrar y versionar entradas |
| Publicación | **Vercel** | Nube | Construir y publicar en cada cambio |

### Cómo se administra el contenido

Cada entrada es un archivo `.md` con un encabezado de datos:

```markdown
---
titulo: Cómo cuidar la manicura semipermanente
descripcion: Siete hábitos que alargan el esmaltado.
fecha: 2026-10-26
categoria: Cuidado de uñas
imagen: /blog/cuidado-semipermanente.webp
imagenAlt: Uñas con esmaltado nude
---

Texto de la entrada con Markdown normal.
```

Flujo de trabajo:

1. Se crea o edita el archivo (en GitHub o en la PC).
2. Se guarda la imagen en `01-Sitio-Web/public/blog`.
3. Se hace `commit` y `push`.
4. Vercel reconstruye el sitio y publica la entrada sola.

El historial de Git permite **volver atrás** si una entrada sale mal. Es el mismo
principio de un CMS, pero sin panel visual ni base de datos.

### Por qué no se usa WordPress

| Problema de WordPress en este proyecto | Consecuencia |
|---|---|
| Vercel no ejecuta PHP | Habría que pagar o conseguir un hosting PHP aparte |
| Necesita MySQL y un panel de administración | Más cuentas, contraseñas y actualizaciones |
| Hay que actualizar el core, el tema y los plugins | Riesgo de seguridad y mantenimiento mensual |
| El blog queda en otro servidor | El dominio se parte en dos y el SSL se duplica |

La versión con WordPress existió durante el desarrollo y se descartó a propósito:
**el objetivo es que el sitio completo se publique en Vercel con un solo clic**.
Para la consigna, el CMS sigue existiendo: el contenido se gestiona desde el repositorio
con Markdown, categorías, fechas e imágenes.

### Qué partes del CMS están cubiertas

| Función de un CMS | Cómo se resuelve aquí |
|---|---|
| Crear entradas | Archivo `.md` nuevo en `src/content/blog` |
| Editar entradas | Editar el `.md` desde GitHub o localmente |
| Borrar entradas | Eliminar el `.md` y hacer commit |
| Categorías | Campo `categoria` del encabezado |
| Fecha | Campo `fecha` |
| Imagen destacada | Campo `imagen` + archivo en `public/blog` |
| Vista previa | `npm run dev` en local |
| Historial y rollback | Git / GitHub |
| Publicación | Automática con Vercel |

### Limitación honesta

No hay un panel de administración visual como `wp-admin`. Si la cátedra exige
**WordPress de forma obligatoria**, hay que decirlo antes de la entrega: este proyecto
prioriza el despliegue estático en Vercel y no incluye PHP. La alternativa sería
volver a un hosting PHP aparte, que es justamente lo que se quiso evitar.

---

## Resumen para la defensa

1. **Tema:** salón de uñas con precios transparentes.
2. **Modelo de ingreso:** turnos + extras + anticipo del 50 % por WhatsApp.
3. **Dominio:** URL gratuita de Vercel y plan de migración a dominio propio.
4. **CMS:** blog estático en Markdown gestionado desde GitHub; sin PHP ni base de datos.

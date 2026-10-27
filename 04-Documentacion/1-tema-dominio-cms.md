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

**Todavía no hay dominio asignado.** El proyecto está preparado para funcionar con cualquiera:
la dirección se guarda en un solo lugar (`VITE_SITE_ORIGIN` dentro de `01-Sitio-Web\.env`) y un
script actualiza el resto de los archivos.

| Dato | Valor |
|---|---|
| Dominio actual | **pendiente** (marcador `https://TU-DOMINIO.com`) |
| Dónde se cambia | `03-Servidor-Local\configurar-dominio.ps1` |
| SSL local | autofirmado (documento 3) |
| SSL en hosting | Let's Encrypt gratis (documento 3) |

### Cómo poner el dominio cuando lo tengas

1. Abre PowerShell en `03-Servidor-Local`.
2. Ejecuta:
   ```powershell
   .\configurar-dominio.ps1 -Dominio "https://tudominio.com"
   ```
3. El script actualiza `.env`, `sitemap.xml`, `robots.txt`, `index.html` y reconstruye el sitio.

> El marcador `TU-DOMINIO.com` aparece en el canonical y en el sitemap **solo mientras no haya dominio**.
> No se debe publicar en internet con ese marcador: Google vería una dirección que no existe.

### Recomendación de dominio

- Si el proveedor del curso te da un subdominio (por ejemplo `algo.si.com.bo`), sirve para la entrega.
- Para el negocio real conviene un dominio propio: `girlys.com.bo` o `girlysbolivia.com`
  (entre 10 y 15 USD al año).

### Cómo se conecta un dominio nuevo (resumen)

1. Comprar el dominio (NIC Bolivia, Namecheap, GoDaddy).
2. Cambiar los *nameservers* a los del hosting.
3. En CWP → **DNS Functions → DNS Zone Editor**, crear la zona.
4. En CWP → **Addon Domains**, agregarlo apuntando a `public_html`.
5. Emitir SSL (documento 3) y ejecutar `configurar-dominio.ps1`.

---

## 1.4 CMS elegido

Se usan **dos piezas**, y cada una hace lo que mejor sabe hacer:

| Pieza | Tecnología | Dónde vive | Para qué |
|---|---|---|---|
| Sitio principal | **React + Vite** (sitio estático) | `/` | Calculadora, reserva, SEO, velocidad |
| Blog | **WordPress + Astra** | `/blog/` | Publicar entradas sin tocar código (requisito de CMS, tema y plugins) |

### Por qué no todo en WordPress

- La calculadora con precios dinámicos y el flujo de reserva se controlan mejor en React.
- El sitio estático carga en menos de 1 segundo y no depende de una base de datos.
- WordPress queda aislado: si el blog falla, el sitio principal sigue funcionando.

### Por qué no todo en React

- El requisito pedía CMS, tema y plugins.
- Un blog necesita escribir y publicar sin reconstruir el proyecto cada vez.
- WordPress da panel, usuarios, categorías y SEO (Rank Math) sin programar.

### Cómo se conectan

```
https://dominio/            → sitio React (HTML/CSS/JS ya construido)
https://dominio/blog/       → WordPress (PHP + base de datos)
https://dominio/blog/wp-admin/ → panel de WordPress
```

El pie del sitio principal tiene un enlace al blog cuando `VITE_BLOG_URL` está definido (aquí: `/blog`).

---

## Resumen para la defensa

1. **Tema:** salón de uñas con precios transparentes.
2. **Modelo de ingreso:** turnos + extras + anticipo del 50 % por WhatsApp.
3. **Dominio:** subdominio gratuito del curso, con plan de migración a dominio propio.
4. **CMS:** WordPress solo para el blog, React para el sitio comercial.

# Ruta cPanel + WordPress · los 14 puntos

> **Esta guía reemplaza la ruta anterior (React + Vercel) para la entrega.**
> El sitio de Vercel sigue funcionando como respaldo, pero la versión que se
> presenta y se califica es la de **cPanel + WordPress** en
> <https://girlysbeautiful.si.com.bo>.

| Dato | Valor |
|---|---|
| Panel | <https://cwp.si.com.bo:2083> |
| Dominio | `girlysbeautiful.si.com.bo` |
| Servidor (IP) | `64.176.17.27` |
| Google Analytics 4 | `G-ZMHXH6EH9Y` |
| WhatsApp | `+591 633 964 52` → <https://wa.me/59163396452> |
| Instagram | <https://www.instagram.com/girlys.sucre/> |
| Facebook | <https://www.facebook.com/share/1EwZ2ADCBq/> |
| Título del sitio | `Girlys · Manicura en Sucre` |

---

## 0. Antes de tocar nada: tres reglas

1. **Nunca me mandes tu contraseña ni la de WordPress.** Yo te digo dónde hacer
   clic; vos lo hacés en tu navegador. Si alguna vez la escribiste en un chat,
   cambiala.
2. **Una cosa por vez.** Si algo falla, se anota el mensaje exacto y se resuelve
   antes de seguir. No se instala nada "por si acaso".
3. **Cada paso se fotografía.** Guardá las capturas en
   `05-Recursos/capturas/cpanel/`. Son la prueba para el informe y para el
   profesor.

### Dónde quedamos (lo que se puede comprobar)

- El dominio `girlysbeautiful.si.com.bo` **ya apunta** al servidor
  `64.176.17.27` (DNS correcto).
- El panel `cwp.si.com.bo:2083` **responde**.
- Pero la web **no responde** en los puertos 80 (http) ni 443 (https).
  Eso significa que el sitio todavía **no está publicado** o que el firewall
  del servidor está bloqueando la web. Hay que resolverlo antes del SSL.
- En el proyecto quedó documentada una prueba de WordPress **en tu PC**
  (con SQLite), no la instalación del panel. Los clics exactos que hiciste en
  cPanel no quedaron registrados acá, así que esta guía arranca desde cero,
  ordenada, sin dar nada por hecho.

---

## Mapa de los 14 puntos

| # | Punto | Herramienta | Dónde se demuestra |
|---|---|---|---|
| 1 | Tema, modelo de ingreso, dominio y CMS | Documento + WordPress | Página de inicio y `wp-admin` |
| 2 | Instalación en CMS y dominio | cPanel + WordPress | `girlysbeautiful.si.com.bo` |
| 3 | SSL (Let's Encrypt, autofirmado, ZeroSSL) | cPanel → SSL/TLS | Candado en el navegador |
| 4 | Google Analytics | Site Kit o WPCode | Informe en tiempo real |
| 5 | Facebook e Instagram sin pago | Páginas + enlaces | Iconos en el pie |
| 6 | SEO | Rank Math | Títulos, sitemap, Search Console |
| 7 | Vista inicial y plugins básicos | Tema + plugins | Inicio armado |
| 8 | Plugins sociales y chat | Joinchat / Tawk.to / Messenger | Botones flotantes |
| 9 | Documentación primera versión | Este documento + capturas | Informe |
| 10 | PayPal | Botón de pago | Página de reserva |
| 11 | YouTube y TikTok | Canales + videos embebidos | Inicio y pie |
| 12 | Chat en línea | Tawk.to + Messenger | Ventana de chat |
| 13 | Mensaje a WhatsApp | Joinchat + formulario | Botón y mensaje prearmado |
| 14 | Contenido final | WordPress | Textos, fotos y precios reales |

---

## Punto 2 · Instalar WordPress en el subdominio

> Este paso va **antes** que el 1 en la práctica: sin WordPress no hay CMS.
> El punto 1 se completa después, cuando el sitio ya tiene tema y contenido.

### 2.1 Comprobar el subdominio

1. Entrá a <https://cwp.si.com.bo:2083> con tu usuario y contraseña.
2. Buscá en el menú izquierdo **Domains** (o **Dominios**) → **Subdomains**
   (o **Add New Domain**).
3. Tiene que existir `girlysbeautiful.si.com.bo`.
   - Si **no existe**: creála. En "Document Root" dejá la carpeta que propone
     el panel (algo como `/home/TU_USUARIO/girlysbeautiful.si.com.bo`) y
     anotá esa ruta.
   - Si **existe**: abrí el detalle y anotá la **Document Root**.
4. Comprobá que el DNS ya está bien (debería estarlo):
   `girlysbeautiful.si.com.bo` → `64.176.17.27`.

### 2.2 Comprobar PHP y MySQL

1. En el menú, buscá **PHP** → **PHP Selector** o **PHP Version**.
   Elegí **PHP 8.1** o **8.2** (no 7.x).
2. Buscá **MySQL** → **MySQL Manager** (o **Databases**).
   Deberías poder crear una base y un usuario. No los crees todavía si vas a
   usar Softaculous: el instalador los crea solo.

### 2.3 Instalar con Softaculous (la forma fácil)

1. En el menú buscá **Softaculous** o **WordPress Manager**.
2. Elegí **WordPress** → **Install** (Instalar).
3. Completá:

| Campo | Qué poner |
|---|---|
| Choose Domain | `girlysbeautiful.si.com.bo` |
| In Directory | dejar **vacío** (para que el sitio quede en la raíz) |
| Site Name | `Girlys · Manicura en Sucre` |
| Site Description | `Manicura en Sucre, Bolivia` |
| Admin Username | algo que no sea `admin` (ej. `girlys_admin`) |
| Admin Password | una contraseña nueva y larga, guardada en tu gestor |
| Admin Email | tu correo real |
| Language | `Español` |

4. Pulsá **Install** y esperá. Al final te da dos enlaces:
   - Sitio: `https://girlysbeautiful.si.com.bo`
   - Panel: `https://girlysbeautiful.si.com.bo/wp-admin`
5. Abrí el panel y entrá con el usuario y la contraseña que acabas de crear.

> **Si no aparece Softaculous**, no te trabes: usá la instalación manual del
> Anexo A. Es más larga, pero es la misma idea.

### 2.4 Si la web sigue sin abrir

Si el panel funciona pero `http://girlysbeautiful.si.com.bo` no abre:

1. En cPanel buscá **Web Server** / **Apache Status** y fijate si Apache o
   Nginx está **detenido**.
2. Buscá **Firewall** (CSF) y revisá que los puertos **80** y **443** estén
   abiertos.
3. Si no encontrás la opción, escribí al soporte del hosting:
   *"El panel responde en 2083 pero el dominio no responde en los puertos 80 y
   443. ¿Pueden verificar el firewall y el servidor web?"*
4. No sigas con SSL hasta que `http://girlysbeautiful.si.com.bo` abra.

**Evidencia para el informe:** captura del subdominio creado y de la pantalla
final de Softaculous.

---

## Punto 3 · SSL (HTTPS)

El orden correcto es: primero **Let's Encrypt**, si falla **ZeroSSL**, y el
**autofirmado** solo como último recurso para la demo.

### 3.1 Let's Encrypt (recomendado, gratis y se renueva solo)

1. cPanel → **SSL/TLS** → **Let's Encrypt SSL** (o **AutoSSL**).
2. Elegí `girlysbeautiful.si.com.bo`.
3. Pulsá **Issue** / **Install**.
4. Esperá 1–2 minutos y abrí `https://girlysbeautiful.si.com.bo`.
   Tiene que aparecer el candado.

> Let's Encrypt necesita que el puerto **80** esté abierto y que el dominio
> apunte al servidor. Si falla, casi siempre es por eso.

### 3.2 ZeroSSL (si Let's Encrypt no funciona)

1. Entrá a <https://zerossl.com> y creá una cuenta gratis.
2. **New Certificate** → escribí `girlysbeautiful.si.com.bo` → **Next**.
3. Elegí validación **HTTP File** (te da un archivo para subir) o **DNS**
   (te da un registro TXT). La más simple suele ser HTTP File.
4. Descargá el certificado. Te da tres textos:
   - **Private Key** (clave privada)
   - **Certificate** (certificado)
   - **CA Bundle** (cadena)
5. En cPanel → **SSL/TLS** → **Install SSL Certificate** (o **Manage
   Certificates**), pegá los tres textos y guardá.
6. **Nunca compartas la Private Key.** Si alguien la ve, hay que regenerar el
   certificado.

### 3.3 Autofirmado (solo para mostrar en clase)

1. cPanel → **SSL/TLS** → **Generate a Self-Signed Certificate**.
2. Dominio: `girlysbeautiful.si.com.bo`.
3. Instalalo.
4. El navegador va a mostrar "No es privada". Es normal: sirve para demostrar
   que el sitio tiene HTTPS, **no** para visitantes reales.

**Evidencia:** captura del candado y de la pantalla de Let's Encrypt.

---

## Punto 4 · Google Analytics

1. En WordPress: **Plugins → Añadir nuevo** → buscar **Site Kit by Google** →
   **Instalar** → **Activar**.
2. **Ajustes → Site Kit** → **Iniciar sesión con Google** → autorizar.
3. Conectar **Analytics** y elegir la propiedad que ya tiene el ID
   `G-ZMHXH6EH9Y`.
4. Verificar: abrir el sitio en una pestaña y mirar en Google Analytics
   **Informes → Tiempo real**. Tiene que aparecer 1 usuario.

> Alternativa si Site Kit se complica: instalar **WPCode** y pegar el código de
> Google en el `<head>`. El ID es `G-ZMHXH6EH9Y`.
> No crear una propiedad nueva: se usa la que ya tiene datos.

**Evidencia:** captura de "Tiempo real" con la visita.

---

## Punto 5 · Facebook e Instagram (sin pagar)

1. **Instagram:** ya existe <https://www.instagram.com/girlys.sucre/>.
   Pasarla a cuenta **Profesional → Empresa** (gratis) y completar biografía,
   foto y enlace al sitio.
2. **Facebook:** entrar a la página, **Configuración → Nombre de usuario** y
   pedir `girlys.sucre` (o similar). Así el enlace deja de ser el de compartir.
3. En WordPress, los enlaces van en:
   - **Apariencia → Personalizar → Pie de página** (o el widget de redes), y
   - el menú.
4. **No** activar anuncios ni "promocionar publicación". Todo orgánico.

**Evidencia:** captura de ambas páginas con el enlace al sitio en la biografía.

---

## Punto 6 · SEO

1. Instalar **Rank Math SEO** (gratis): **Plugins → Añadir nuevo** → buscar →
   Instalar → Activar.
2. Asistente: elegir **Fácil**, tipo de sitio **Negocio local**, conectar
   Google Search Console (opcional pero suma).
3. **Ajustes → Enlaces permanentes** → elegir **Nombre de la entrada**
   (`https://girlysbeautiful.si.com.bo/mi-entrada/`).
4. En cada página, completar:
   - Título SEO (máx. 60 caracteres)
   - Meta descripción (máx. 155)
   - Imagen destacada con texto alternativo
5. Título de la portada:
   `Manicura en Sucre | Girlys`
6. Descripción:
   `Manicura clásica, semipermanente y esculpida en Sucre. Tres salones, atención con cita previa y precios claros.`
7. Rank Math genera `sitemap_index.xml` solo. Abrilo y verificalo.
8. En Google Search Console, agregar la propiedad y enviar el sitemap.

**Evidencia:** captura de Rank Math en verde y del sitemap abierto.

---

## Punto 7 · Vista inicial y plugins básicos

### Tema

Para no pelear con diseño, usar **Astra** (gratis) con **Starter Templates**:

1. **Apariencia → Temas → Añadir nuevo** → buscar **Astra** → Instalar →
   Activar.
2. Instalar **Starter Templates** y elegir una plantilla de **salón de uñas /
   belleza**. Importar solo la página de inicio.
3. Reemplazar textos, fotos y colores por los de Girlys.

> Si preferís algo más visual y arrastrable: **Elementor** (gratis) + tema
> **Hello Elementor**. Es más pesado, pero más fácil para alguien que no
> programa.

### Plugins básicos (los mínimos, no 20)

| Plugin | Para qué | Gratis |
|---|---|---|
| Rank Math SEO | Punto 6 | Sí |
| Site Kit by Google | Punto 4 | Sí |
| WPForms Lite | Formulario de contacto | Sí |
| LiteSpeed Cache (o WP Super Cache) | Velocidad | Sí |
| UpdraftPlus | Copias de seguridad | Sí |
| Wordfence Security | Seguridad | Sí |
| WPCode | Pegar códigos (GA, PayPal) | Sí |

Instalar uno por uno y **activar solo lo que se usa**. Después de cada
instalación, abrir el sitio y comprobar que sigue funcionando.

### Páginas mínimas

- Inicio
- Servicios (con precios)
- Salones (con mapas)
- Blog
- Contacto / Reservar
- Política de privacidad
- Términos y condiciones

**Evidencia:** captura de la portada terminada y de la lista de plugins.

---

## Punto 8 · Plugins sociales y chat

Instalar **uno** de estos dos caminos:

**Camino A (más simple):** plugin **Joinchat** (gratis) para WhatsApp, y
**Custom Facebook Feed** o el widget nativo de Facebook para la página.

**Camino B (más completo):** plugin **Social Chat** (gratis) que muestra
botones de WhatsApp, Messenger, Telegram y TikTok en un solo flotante.

Después:

1. **WhatsApp:** número `59163396452`, mensaje
   `Hola Girlys, quiero reservar una manicura.`
2. **Messenger:** conectar la página de Facebook.
3. **Telegram:** crear el canal o usuario y pegar el enlace `https://t.me/...`.
4. **TikTok:** pegar el enlace del perfil.
5. **Facebook:** enlace de la página en el pie.
6. Revisar en el teléfono que los botones no tapen el contenido.

**Evidencia:** captura del sitio en el celular con los botones flotantes.

---

## Punto 9 · Documentación primera versión

Armar una carpeta con:

1. Este documento, actualizado con lo que realmente se hizo.
2. Capturas de: panel, WordPress, SSL, Analytics, Search Console, redes,
   plugins, PayPal, chat y WhatsApp.
3. Un índice con los 14 puntos y una captura por punto.
4. Datos de acceso **no** van en el documento. Se guardan en un gestor de
   contraseñas.

**Evidencia:** el PDF o la carpeta entregada.

---

## Punto 10 · PayPal

> **Aviso honesto:** en Bolivia PayPal suele permitir **pagar** pero no siempre
> **cobrar y retirar** a un banco local. Si tu cuenta no habilita cobros, el
> botón queda como demostración y se explica la limitación en la defensa.

1. Crear cuenta en <https://www.paypal.com> (gratis).
2. Si la cuenta permite cobrar, crear un botón:
   **PayPal → Herramientas → Botones de pago → Crear botón**.
3. Copiar el código HTML.
4. En WordPress: **WPCode → Add Snippet → HTML** o un bloque **HTML
   personalizado** en la página de reserva.
5. Pegar el código y publicar.
6. Probar en modo **sandbox** antes de usar dinero real.

Si no se puede cobrar:

- Dejar el botón en modo demostración, y
- ofrecer el pago real por **QR bancario** o transferencia, documentando que
  PayPal queda como opción internacional.

**Evidencia:** captura del botón y de la página de reserva.

---

## Punto 11 · YouTube y TikTok

1. Crear el canal de YouTube con el correo de Girlys.
2. Crear la cuenta de TikTok `@girlys.sucre` (o el nombre disponible).
3. Grabar **3 videos cortos** con el teléfono:
   - Presentación del salón (15 s).
   - Antes y después de una manicura (15 s).
   - Consejo de cuidado (20 s).
4. Subirlos a ambas plataformas con el enlace del sitio en la descripción.
5. En WordPress, embeber el video de YouTube en la portada o en el blog con un
   bloque **YouTube**, y poner los iconos de YouTube y TikTok en el pie.

**Evidencia:** captura de los canales y del video embebido.

---

## Punto 12 · Chat en línea

**Opción recomendada: Tawk.to (gratis).**

1. Crear cuenta en <https://www.tawk.to>.
2. Crear una propiedad con el nombre `Girlys Sucre`.
3. Copiar el código de inserción.
4. En WordPress: **WPCode → HTML** en el pie, o el plugin oficial **Tawk.to
   Live Chat** → pegar el Property ID.
5. Probar desde el celular: escribir un mensaje y responder desde la app.

**Messenger:** instalar el plugin **Messenger Customer Chat** y conectar la
página de Facebook. Si no aparece, usar el enlace `m.me/...` como botón.

**TikTok:** no tiene chat web; se usa el enlace al perfil y los mensajes
directos desde la app.

**Evidencia:** captura de una conversación de prueba.

---

## Punto 13 · Mensaje a WhatsApp

1. Crear el enlace base:
   `https://wa.me/59163396452`
2. Con mensaje prearmado:
   `https://wa.me/59163396452?text=Hola%20Girlys%2C%20quiero%20reservar%20una%20manicura.`
3. Usarlo en:
   - el botón flotante (Joinchat),
   - el botón "Reservar" del menú,
   - el formulario de contacto (que arme el mensaje con nombre, servicio y
     fecha).
4. Probar desde el celular y desde la computadora.

**Evidencia:** captura de WhatsApp abierto con el mensaje ya escrito.

---

## Punto 14 · Contenido final

Reemplazar todo lo de demostración por datos reales:

- [ ] Precios confirmados (los actuales son de muestra).
- [ ] Fotos propias del salón y de trabajos (no de banco de imágenes).
- [ ] Direcciones exactas y pin de Google Maps de cada salón.
- [ ] Horarios confirmados (¿el domingo cierra?).
- [ ] Textos legales revisados.
- [ ] Dominio y correo de contacto reales.
- [ ] Enlaces de redes verificados.

Servicios y precios que ya están en el proyecto (para cargar en WordPress):

| Servicio | Duración | Precio |
|---|---|---|
| Manicura Express | 45 min | Bs 55 |
| Manicura Clásica | 60 min | Bs 70 |
| Manicura Spa | 90 min | Bs 120 |
| Manicura Semipermanente | 120 min | Bs 130 |
| Manicura Esculpida | 150 min | Bs 200 |

Solo **manicura**. No se ofrece pedicura.

**Evidencia:** captura de la página final y lista de datos confirmados.

---

## Anexo A · Instalación manual de WordPress (sin Softaculous)

1. cPanel → **MySQL Manager** → crear base `girlys_wp` y usuario
   `girlys_user` con contraseña larga. Anotar los tres datos y **agregar el
   usuario a la base con todos los permisos**.
2. Descargar <https://wordpress.org/latest.zip> en tu PC.
3. cPanel → **File Manager** → entrar a la carpeta del subdominio
   (`/home/TU_USUARIO/girlysbeautiful.si.com.bo`).
4. **Upload** el `.zip` y **Extract** ahí dentro.
5. Abrir `https://girlysbeautiful.si.com.bo` en el navegador.
6. Seguir el instalador: idioma, título, usuario, contraseña, correo.
7. En la pantalla de base de datos, poner los datos del paso 1.

Si el instalador no aparece, revisar que `index.php` esté en la raíz de la
carpeta del subdominio (no dentro de una subcarpeta `wordpress/`).

---

## Anexo B · Qué mandarme cuando termines cada fase

Para no adivinar, mandame **texto** (no capturas de contraseñas):

1. ¿Qué opciones ves en el menú izquierdo? (nombres exactos)
2. ¿Existe el subdominio y cuál es su Document Root?
3. ¿Softaculous aparece? ¿Sí o no?
4. ¿`http://girlysbeautiful.si.com.bo` abre? ¿Qué dice?
5. ¿Qué error aparece en Let's Encrypt, si falla?

Con eso te digo el siguiente clic exacto, sin que tengas que decidir nada
técnico.

# Informe de estado · WordPress en cPanel

**Proyecto:** Girlys · Manicura en Sucre  
**Dominio:** `girlysbeautiful.si.com.bo`  
**Panel:** `https://cwp.si.com.bo:2083`  
**Fecha:** 2 de noviembre de 2026

---

## 1. Qué ya está hecho

| Componente | Estado | Dónde |
|---|---|---|
| Dominio principal | Configurado | `girlysbeautiful.si.com.bo` |
| DNS | Correcto | Apunta a `64.176.17.27` |
| WordPress | Instalado | `public_html/blog` |
| Base de datos | Creada y completa | `girlysbe_blog` |
| Tablas de WordPress | Presentes | `wp_posts`, `wp_users`, `wp_options`, `wp_comments` |
| URL del sitio en WordPress | Configurada | `https://girlysbeautiful.si.com.bo/blog` |
| Usuario administrador | Creado | `girlys_gestion` |
| Panel de WordPress | Pendiente de acceso | `https://girlysbeautiful.si.com.bo/blog/wp-admin` |

**Conclusión:** WordPress **no hay que reinstalarlo**. Está completo. Lo único que falta es que el servidor web acepte conexiones en los puertos 80 y 443.

---

## 2. El problema que bloquea todo

El panel funciona en el puerto **2083**, pero el dominio no responde en los puertos **80** (http) ni **443** (https).

Prueba técnica desde fuera del servidor:

```
Trying 64.176.17.27:80...
connect failed: Connection refused
curl: (7) Failed to connect
```

```
Trying 64.176.17.27:443...
connect failed: Connection refused
curl: (7) Failed to connect
```

**Interpretación:** no hay ningún servicio escuchando en esos puertos. No es un problema de DNS, de WordPress, de la base de datos ni de los archivos. Es el servicio web del servidor.

En phpMyAdmin se ve que el servidor usa **nginx/1.30.6**. Nginx está instalado, pero no está atendiendo los puertos 80 y 443.

---

## 3. Mensaje para el administrador del hosting

> Hola. Mi cuenta es **girlysbe**, dominio `girlysbeautiful.si.com.bo` (IP `64.176.17.27`). El WordPress ya está instalado en `public_html/blog` y la base `girlysbe_blog` tiene todas las tablas. El problema es que los puertos **80** y **443** devuelven **“Connection refused”**: no hay ningún servicio escuchando ahí. ¿Pueden revisar Nginx/Apache y habilitar esos dos puertos? El DNS está correcto: el dominio resuelve a esa IP. Gracias.

---

## 4. Los 14 puntos · estado actual

| # | Punto | Estado | Qué falta |
|---|---|---|---|
| 1 | Tema, modelo de ingreso, dominio y CMS | ✅ Definido | Documentar en el informe |
| 2 | Instalación en CMS y dominio | 🟡 Instalado | Que el servidor abra 80/443 |
| 3 | SSL (Let's Encrypt, autofirmado, ZeroSSL) | ⏳ Pendiente | Let's Encrypt cuando abran los puertos |
| 4 | Google Analytics | ⏳ Pendiente | Instalar Site Kit con `G-ZMHXH6EH9Y` |
| 5 | Facebook e Instagram sin pago | ✅ Cuentas creadas | Enlazarlas en WordPress |
| 6 | SEO | ⏳ Pendiente | Instalar Rank Math y configurar |
| 7 | Vista inicial y plugins básicos | ⏳ Pendiente | Tema, páginas y plugins |
| 8 | Plugins sociales y chat | ⏳ Pendiente | Joinchat, Tawk.to y Messenger |
| 9 | Documentación primera versión | 🟡 En curso | Este informe + capturas |
| 10 | PayPal | ⏳ Pendiente | Botón y prueba |
| 11 | YouTube y TikTok | ⏳ Pendiente | Canales y videos |
| 12 | Chat en línea | ⏳ Pendiente | Tawk.to o Messenger |
| 13 | Mensaje a WhatsApp | 🟡 Enlace listo | Integrar en el sitio |
| 14 | Contenido final | 🟡 Textos listos | Cargar en WordPress |

Leyenda: ✅ hecho · 🟡 en curso · ⏳ pendiente.

---

## 5. Datos que ya están definidos

### Servicios y precios

| Servicio | Duración | Precio |
|---|---|---|
| Manicura Express | 45 min | Bs 55 |
| Manicura Clásica | 60 min | Bs 70 |
| Manicura Spa | 90 min | Bs 120 |
| Manicura Semipermanente | 120 min | Bs 130 |
| Manicura Esculpida | 150 min | Bs 200 |

Solo manicura. No se ofrece pedicura.

### Sucursales

| Sucursal | Dirección |
|---|---|
| Centro Histórico | Calle Junín · Galería Paseo La Plata |
| Av. Las Américas | 258 Av. Las Américas |
| Av. Jaime Mendoza | Calle Tarija 14 |

### Horarios

- Lunes a viernes: 09:00–18:00
- Sábado: 09:00–16:00
- Domingo: cerrado

### Contacto y redes

- WhatsApp: `+591 633 964 52` → `https://wa.me/59163396452`
- Instagram: `https://www.instagram.com/girlys.sucre/`
- Facebook: `https://www.facebook.com/share/1EwZ2ADCBq/`
- Google Analytics 4: `G-ZMHXH6EH9Y`

---

## 6. Capturas que hay que guardar

Guardar en `05-Recursos/capturas/cpanel/`:

- [ ] Panel principal con el dominio principal.
- [ ] Lista de subdominios (vacía, pero el dominio es principal).
- [ ] Administrador de archivos con `public_html/blog`.
- [ ] phpMyAdmin con la base `girlysbe_blog`.
- [ ] Tabla `wp_options` con `siteurl` y `home`.
- [ ] Tabla `wp_users` con el usuario administrador.
- [ ] Error del navegador al abrir el sitio (para documentar el bloqueo).
- [ ] Mensaje enviado al soporte.

---

## 7. Próximos pasos, en orden

1. **Servidor:** que el administrador abra los puertos 80 y 443.
2. **Acceso:** entrar a `https://girlysbeautiful.si.com.bo/blog/wp-admin` con `girlys_gestion`.
3. **SSL:** activar Let's Encrypt para el dominio.
4. **Raíz:** mover WordPress de `/blog` a la raíz para que quede en `https://girlysbeautiful.si.com.bo`.
5. **Tema y páginas:** instalar el tema y cargar los textos.
6. **Plugins:** Rank Math, Site Kit, WPForms, caché, seguridad y copias.
7. **Redes y chat:** Joinchat, Tawk.to, Messenger, YouTube y TikTok.
8. **Pagos:** botón de PayPal y QR local.
9. **Contenido final:** fotos propias, precios confirmados y textos legales.
10. **Entrega:** actualizar este informe con capturas y resultados.

---

## 8. Plan B si el servidor no se arregla

Si en 48 horas los puertos 80 y 443 siguen cerrados:

1. Instalar WordPress en un hosting gratuito con Softaculous.
2. Configurar el tema, los plugins y el contenido allí.
3. Mostrar ese sitio como demostración temporal.
4. Migrar a `girlysbeautiful.si.com.bo` cuando el servidor esté operativo.

La desventaja es que la dirección temporal no será el dominio del proyecto. La ventaja es que los 14 puntos se pueden practicar y demostrar sin esperar.

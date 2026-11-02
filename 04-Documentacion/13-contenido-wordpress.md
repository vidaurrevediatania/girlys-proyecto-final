# Contenido para WordPress · copia del sitio Vercel

**Proyecto:** Girlys · Manicura en Sucre
**Referencia visual y de contenido:** `https://girlys-proyecto-final.vercel.app/`
**Dominio final:** `https://girlysbeautiful.si.com.bo`
**Fecha:** 2 de noviembre de 2026

> Este documento tiene el texto exacto de cada sección del sitio Vercel, listo para copiar y pegar en WordPress.
> No se inventó contenido nuevo: se transcribió el que ya está publicado y aprobado.
> La única diferencia es que en WordPress el blog pasa a ser entradas nativas y las páginas legales tienen URL propia.

---

## 1. Datos maestros (no cambiar sin confirmar)

### Servicios y precios

| Servicio | Duración | Precio base | Descripción |
|---|---|---|---|
| Manicura Express | 45 min | Bs 55 | Limado, cutículas y esmaltado tradicional. |
| Manicura Clásica | 1 hora | Bs 70 | Completa: limado, cutículas, hidratación y esmalte. |
| Manicura Spa | 1 h 30 | Bs 120 | Exfoliación, masque y masaje de mano. |
| Manicura Semipermanente | 2 horas | Bs 130 | Gel con lámpara UV, 21 días de duración. |
| Manicura Esculpida | 2 h 30 | Bs 200 | Acrílico o gel de reconstrucción, el largo va incluido. |

**Solo manicura. No se ofrece pedicura en ningún texto, menú ni publicación.**

### Recargos de la calculadora

| Concepto | Opciones | Recargo |
|---|---|---|
| Forma | Redonda | sin recargo |
| Forma | Ovalada | sin recargo |
| Forma | Almendra | +12 % |
| Forma | Cuadrada | +5 % |
| Forma | Stiletto | +25 % |
| Largo | Corto (0.24–0.64 cm) | sin recargo |
| Largo | Medio (0.72–0.88 cm) | +10 % |
| Largo | Largo (0.96–1.44 cm) | +24 % |
| Diseño | Sin diseño | incluido |
| Diseño | French clásica | +Bs 25 |
| Diseño | Nail art por uña | +Bs 45 |
| Diseño | Diseño personalizado | +Bs 120 |
| Retiro | Retirar esmalte previo (gel, acrílico o postizas) | +Bs 15 |

- El total se redondea a múltiplos de 5.
- Anticipo: **50 %** del total.
- El saldo se paga en el salón al terminar.

### Salones

| Salón | Dirección | Teléfono | Horario |
|---|---|---|---|
| Centro Histórico | Calle Junín · Galería Paseo La Plata | +591 633 964 52 | Lun–Vie 09:00–18:00 · Sáb 09:00–16:00 · Dom cerrado |
| Av. Las Américas | 258 Av. Las Américas | +591 633 964 52 | Lun–Vie 09:00–18:00 · Sáb 09:00–16:00 · Dom cerrado |
| Av. Jaime Mendoza | Calle Tarija 14 · Av. Jaime Mendoza | +591 633 964 52 | Lun–Vie 09:00–18:00 · Sáb 09:00–16:00 · Dom cerrado |

### Contacto y redes

- WhatsApp general: `+591 633 964 52`
- Enlace: `https://wa.me/59163396452`
- Instagram: `https://www.instagram.com/girlys.sucre/`
- Facebook: `https://www.facebook.com/share/1EwZ2ADCBq/`
- Google Analytics 4: `G-ZMHXH6EH9Y`
- Correo de administración: `vidaurrevediatania@gmail.com`

### Dirección visual (para que se parezca al sitio Vercel)

| Elemento | Valor |
|---|---|
| Fondo principal (papel) | `#fdf8f4` |
| Fondo alterno | `#faf3ec` / `#f6ece2` |
| Texto principal | `#241c17` |
| Rosa empolvado (precio y botones) | `#bf8a85` |
| Rojo ladrillo (acentos) | `#ab6741` |
| Verde salvia (salones) | `#6f8460` |
| Títulos | Times New Roman / serif |
| Texto corrido | Karla / sans-serif |
| Bordes | finos, color `rgba(47,38,32,0.11)` |
| Radios | 3–10 px, sin esquinas muy redondeadas |

**Tema recomendado en WordPress:** un tema minimalista de bloque completo, con fondo crema, tipografía serif en títulos y sans en el cuerpo. Sirven `Twenty Twenty-Five`, `Kadence`, `Blocksy` o `GeneratePress`. El objetivo es que se lea igual de limpio que Vercel, no que sea idéntico píxel por píxel.

---

## 2. Mapa del sitio y menú

### Páginas

| Página | Slug | Función |
|---|---|---|
| Inicio | `/` | Portada, servicios, calculadora, salones, preguntas, legal |
| Blog | `/blog/` | Listado de entradas |
| Privacidad | `/privacidad/` | Política completa |
| Términos y precios | `/terminos/` | Condiciones comerciales |
| Cambios y cancelaciones | `/cancelaciones/` | Política de cambios |
| Contacto | `/contacto/` | Datos, WhatsApp y salones |

### Entradas del blog (3)

| Entrada | Slug | Fecha | Categoría |
|---|---|---|---|
| Cómo cuidar la manicura semipermanente para que dure más | `/cuidado-semipermanente/` | 26/10/2026 | Cuidado de uñas |
| Francesa clásica: por qué nunca pasa de moda | `/francesa-clasica/` | 22/10/2026 | Tendencias |
| Largo, forma y precio: cómo se calcula una manicura esculpida | `/precio-manicura-esculpida/` | 18/10/2026 | Paso a paso |

### Menú principal

```
Servicios · Calculadora · Salones · Preguntas · Blog · [Reservar]
```

- Los cuatro primeros son anclas dentro de Inicio: `#servicios`, `#calculadora`, `#sucursales`, `#preguntas`.
- `Blog` va a `/blog/`.
- `Reservar` va al ancla `#sucursales` y se muestra como botón.
- En móvil, el menú se pliega en hamburguesa.

---

## 3. Inicio · bloque por bloque

### 3.1 Portada · `#portada`

**Etiqueta superior**

```
Sucre · desde 2019
```

**Título (H1)**

```
Manicura
con precio cerrado.
```

**Bajada**

```
Tres salones, el mismo equipo, y una calculadora que te dice cuánto vas a pagar antes de sentarte en la silla.
```

*(La palabra “antes” va en cursiva.)*

**Botones**

```
Calcular mi precio   → #calculadora
Ver los tres salones → #sucursales
```

**Datos destacados**

| Etiqueta | Valor |
|---|---|
| Anticipo | 50 % |
| Manicura desde | 55 Bs |
| Salones | 3 |

**Imagen:** carrusel de trabajos. Mientras no haya fotos reales, usar los looks ilustrados o las imágenes actuales del sitio. Texto alternativo: `Trabajo de manicura 1 del salón`.

---

### 3.2 Servicios · `#servicios`

**Numeral:** `01`

**Título (H2)**

```
La lista de precios
```

**Bajada**

```
Sin sorpresas al final de la silla
```

**Subtítulo de grupo**

```
Manicura
```

**Lista (cada fila muestra nombre, descripción, duración y precio)**

| Nombre | Descripción | Duración | Precio |
|---|---|---|---|
| Manicura Express | Limado, cutículas y esmaltado tradicional. | 45 min | 55 Bs |
| Manicura Clásica | Completa: limado, cutículas, hidratación y esmalte. | 1 hora | 70 Bs |
| Manicura Spa | Exfoliación, masque y masaje de mano. | 1 h 30 | 120 Bs |
| Manicura Semipermanente | Gel con lámpara UV, 21 días de duración. | 2 horas | 130 Bs |
| Manicura Esculpida | Acrílico o gel de reconstrucción, el largo va incluido. | 2 h 30 | 200 Bs |

**Nota al pie de la lista**

```
El precio final depende de la forma, el largo y el diseño: por eso la calculadora de abajo es la fuente real del número.
```

> En WordPress, cada fila puede ser un enlace a `#calculadora` que preseleccione el servicio. Si no se puede preseleccionar, el enlace lleva igual a la calculadora.

---

### 3.3 Calculadora · `#calculadora`

**Numeral:** `02`

**Título (H2)**

```
Calculadora de uñas
```

**Bajada**

```
Forma, diseño y largo. El número sale solo.
```

**Bloque A · Elige el servicio**

```
Servicio
[ Manicura Express — 55 Bs ]
[ Manicura Clásica — 70 Bs ]
[ Manicura Spa — 120 Bs ]
[ Manicura Semipermanente — 130 Bs ]
[ Manicura Esculpida — 200 Bs ]
```

Debajo, texto dinámico: resumen del servicio + duración. Ejemplo:

```
Completa: limado, cutículas, hidratación y esmalte. · 1 hora
```

**Bloque B · Elige la forma**

```
Redonda   · sin recargo · La más fácil de mantener en casa.
Ovalada   · sin recargo · Alarga el dedo sin exagerar.
Almendra  · +12 %       · Punta afinada; pide más tiempo de lima.
Cuadrada  · +5 %        · Borde recto, estilo clásico.
Stiletto  · +25 %       · La más laboriosa: requiere extensions.
```

**Bloque C · Ajusta la extensión**

```
Corto  · 0.24 a 0.64 cm desde el borde natural.
Medio  · 0.72 a 0.88 cm desde el borde natural.
Largo  · 0.96 a 1.44 cm desde el borde natural.
```

Texto de escala:

```
La medida es la extensión desde el borde natural. Escala 1:1 al 100 % de zoom; puede variar según la pantalla.
```

**Bloque D · Añade un diseño**

```
Sin diseño              · Solo el color.                          · —
French clásica          · Borde en la punta.                      · + 25
Nail art por uña        · Detalle dibujado a mano, hasta 5 uñas.  · + 45
Diseño personalizado    · Pintado a mano, solo para ti.           · + 120
Retirar esmalte previo  · Gel, acrílico o uñas postizas.           · + 15
```

**Ficha lateral (resumen)**

```
Tu ficha
[Servicio elegido]

Forma [forma]                    + [recargo]
Extensión [tramo] · [cm]         + [recargo]
[Diseño]                         incluido / + [recargo]
Retiro de esmalte                + 15

Total del servicio               [total] Bs
Para reservar · anticipo 50 %    [anticipo] Bs
El resto, [saldo] Bs, lo pagas en el salón.

[Reservar con este cálculo]
[Consultar por WhatsApp]
Te ocupa [duración] de la tarde.
```

**Implementación en WordPress (recomendada, sin programar):**

1. Instalar **Forminator** (gratis).
2. Crear un formulario con campos de selección: servicio, forma, largo, diseño y retiro.
3. Usar la función **Cálculos** de Forminator con esta fórmula:

```
ROUND( (base * forma * largo + diseno + retiro) / 5 ) * 5
```

4. Mostrar dos campos calculados: **Total** y **Anticipo 50 %**.
5. El botón de envío lleva a WhatsApp con el resumen, o muestra el resumen en pantalla.
6. Si el profesor exige la calculadora idéntica, se puede incrustar la de Vercel con un `<iframe>` mientras se termina la versión nativa. Es una solución temporal, no la definitiva.

> La calculadora es el punto 7 de la lista (plugins y funciones). No bloquea los demás puntos: se puede publicar el sitio con la lista de precios y agregar la calculadora después.

---

### 3.4 Salones · `#sucursales`

**Numeral:** `03`

**Título (H2)**

```
Dónde te atendemos
```

**Bajada**

```
Elige el salón que te queda más cerca
```

**Tarjeta 1 · Centro Histórico**

```
Centro Histórico
Calle Junín · Galería Paseo La Plata

Teléfono: +591 633 964 52
Horario: Lun–Vie 09:00–18:00 · Sáb 09:00–16:00 · Dom cerrado

[Reservar en Centro Histórico]
```

**Tarjeta 2 · Av. Las Américas**

```
Av. Las Américas
258 Av. Las Américas

Teléfono: +591 633 964 52
Horario: Lun–Vie 09:00–18:00 · Sáb 09:00–16:00 · Dom cerrado

[Reservar en Av. Las Américas]
```

**Tarjeta 3 · Av. Jaime Mendoza**

```
Av. Jaime Mendoza
Calle Tarija 14 · Av. Jaime Mendoza

Teléfono: +591 633 964 52
Horario: Lun–Vie 09:00–18:00 · Sáb 09:00–16:00 · Dom cerrado

[Reservar en Av. Jaime Mendoza]
```

**Mapas (Google Maps embebido)**

| Salón | Consulta del mapa |
|---|---|
| Centro Histórico | `Calle Junín, Galería Paseo La Plata, Sucre, Bolivia` |
| Av. Las Américas | `258 Avenida Las Américas, Sucre, Bolivia` |
| Av. Jaime Mendoza | `Calle Tarija 14, Avenida Jaime Mendoza, Sucre, Bolivia` |

**Flujo de reserva (modal o página)**

```
1. Elige el día
2. Elige la hora
3. Tus datos

Nombre y apellido       [ Ej. Daniela Ribera ]
Teléfono o WhatsApp     [ 700 00 000 ]

Servicio      [servicio · forma · largo]
Diseño        [diseño]
Duración      [duración]
Total         [total] Bs
Anticipo 50 % [anticipo] Bs

[Solicitar cita · anticipo [anticipo] Bs]
No se cobra nada en la web. Te confirmamos por WhatsApp.
```

**Pantalla de confirmación**

```
Solicitud enviada
[CÓDIGO]

[salón] · [día] [número] [mes] · [hora]
[servicio] · [forma] · [largo] · [diseño]

Anticipo a pagar: [anticipo] Bs
Te escribimos por WhatsApp para confirmar el cupo.
El saldo de [saldo] Bs lo pagas al terminar.

[Confirmar por WhatsApp]
```

> En WordPress, el flujo se puede resolver con Forminator + el plugin de reservas o, más simple, con un formulario que envía el resumen a WhatsApp. No se necesita pago en línea para reservar.

---

### 3.5 Preguntas frecuentes · `#preguntas`

**Numeral:** `04`

**Título (H2)**

```
Antes de reservar
```

**Bajada**

```
Lo que casi todas preguntan
```

**Pregunta 1**

```
¿El precio que muestra la calculadora es el final?
```
```
Sí. La calculadora suma el servicio, la forma, el largo y el diseño. Ese número es el total del trabajo; el anticipo es el 50 % y el resto se paga en el salón. Si cambias de diseño o de largo al llegar, se ajusta antes de empezar.
```

**Pregunta 2**

```
¿Cómo confirmo mi cita?
```
```
Eliges salón, día y hora en la sección Salones, dejas tu nombre y WhatsApp y envías la solicitud. Te escribimos por WhatsApp para confirmar el cupo y coordinar el anticipo. La cita queda confirmada cuando respondemos.
```

**Pregunta 3**

```
¿Puedo cambiar o cancelar la cita?
```
```
Sí, avisando con al menos 24 horas. Te reprogramamos una vez sin costo y el anticipo pasa a la nueva fecha. Con menos de 24 horas el anticipo no se devuelve, porque ese cupo ya estaba separado.
```

**Pregunta 4**

```
¿Cuánto dura cada servicio?
```
```
Cada servicio tiene su duración en la lista de precios: desde 45 minutos de una manicura express hasta 2 horas y media de una esculpida. La calculadora también te muestra el tiempo antes de reservar.
```

**Pregunta 5**

```
¿Puedo llevar mi propio diseño o una foto de referencia?
```
```
Sí. El nail art por uña cubre un detalle dibujado a mano en hasta cinco uñas. Si el diseño es más elaborado, se cotiza como diseño personalizado: mándanos la referencia por WhatsApp y te confirmamos el precio antes de la cita.
```

**Pregunta 6**

```
¿Cobran por retirar el esmalte de otro salón?
```
```
El retiro de gel, acrílico o uñas postizas tiene un costo de 15 Bs. Se marca en la calculadora y se suma al total. Si el trabajo anterior está muy dañado, te lo decimos antes de empezar.
```

**Pregunta 7**

```
¿Qué forma y qué largo me convienen?
```
```
La redonda es la más fácil de mantener; la almendra alarga el dedo; la cuadrada es la más clásica y la stiletto la que más tiempo de lima lleva. En la calculadora puedes verlas y cambiar el largo en centímetros antes de reservar.
```

**Cierre**

```
¿Te quedó otra duda? Escríbenos por WhatsApp.
```

Enlace: `https://wa.me/59163396452?text=Hola%20Girlys%20%F0%9F%91%8B%2C%20tengo%20una%20duda%20antes%20de%20reservar.`

> Estas siete preguntas son las que alimentan el `FAQPage` de Google. En WordPress se pueden cargar con Rank Math o con un bloque de acordeón. No cambiar el texto sin confirmar con la dueña.

---

### 3.6 Legal · `#legal`

**Numeral:** `05`

**Título (H2)**

```
Lo que conviene saber
```

**Bajada**

```
Privacidad, precios y cambios de cita
```

**Introducción**

```
Toca cada bloque para leerlo completo. Si algo no queda claro, pregúntanos por WhatsApp antes de reservar.
```

**Bloque 1 · Privacidad** (texto completo en la sección 6 de este documento)

**Bloque 2 · Términos y precios** (texto completo en la sección 7)

**Bloque 3 · Cambios y cancelaciones** (texto completo en la sección 8)

**Pie**

```
Última actualización: octubre de 2026.
```

---

## 4. Encabezado y pie

### Encabezado

```
Girlys
manicura

Servicios · Calculadora · Salones · Preguntas · Blog
[Reservar]
```

- La barra se fija al hacer scroll.
- En móvil: logo + hamburguesa + botón Reservar.

### Pie

**Columna 1**

```
Girlys

Manicura en Sucre. Atendemos con cita, sin fila y con el precio cerrado antes de empezar.

[Calcular mi cita]

Síguenos
Instagram ↗
Facebook ↗
```

**Columna 2 · Salones**

```
Centro Histórico
Calle Junín · Galería Paseo La Plata

Av. Las Américas
258 Av. Las Américas

Av. Jaime Mendoza
Calle Tarija 14 · Av. Jaime Mendoza
```

**Columna 3 · Contacto**

```
+591 633 964 52
WhatsApp Centro Histórico

+591 633 964 52
WhatsApp Av. Las Américas

+591 633 964 52
WhatsApp Av. Jaime Mendoza

+591 633 964 52
WhatsApp general
```

**Línea legal**

```
© 2026 Girlys · Sucre. Precios en bolivianos; el anticipo del 50 % confirma el cupo.

Privacidad · Términos · Cancelaciones · Preguntas · Blog · Volver arriba ↑
```

---

## 5. Blog · página de listado

**Etiqueta**

```
Blog · Girlys
```

**Título (H1)**

```
Consejos para tu manicura,
sin vueltas.
```

**Bajada**

```
Cuidado, tendencias y precios claros. Lo que aprendemos en el salón, escrito para que tu esmaltado dure más y no te sorprenda la cuenta.
```

**Botones**

```
Ver las entradas      → #entradas
Calcular mi precio    → /#calculadora
```

**Imagen de portada:** `/blog/portada-blog.webp`
**Texto alternativo:** `Detalle de una manicura con diseño nude`
**Pie de foto:** `Trabajo real del salón · diseño nude`

**Numeral:** `01`
**Título de la lista:** `Últimas entradas`
**Bajada:** `Tres lecturas cortas para llegar mejor preparada a tu cita`

**Filtros:** `Todas · Cuidado de uñas · Tendencias · Paso a paso`

**Entrada destacada:** la más reciente (cuidado semipermanente), con botón `Leer la entrada`.

**Cierre**

```
Antes de reservar
¿Cuánto sale tu combinación?
Elige servicio, forma, largo y diseño. La calculadora muestra el total y el anticipo del 50 % antes de escribirnos.
[Calcular mi precio]
```

**Estado vacío de categoría**

```
No hay entradas en esta categoría todavía. Prueba con «Todas».
```

---

## 6. Entrada 1 · Cuidado semipermanente

**Título:** `Cómo cuidar la manicura semipermanente para que dure más`
**Slug:** `cuidado-semipermanente`
**Fecha:** 26 de octubre de 2026
**Categoría:** Cuidado de uñas
**Descripción:** `Siete hábitos sencillos que alargan la vida del esmaltado sin dañar la uña natural.`
**Imagen:** `/blog/cuidado-semipermanente.webp`
**Texto alternativo:** `Uñas con diseño de mármol azul sobre fondo claro`

**Cuerpo**

```
El esmaltado semipermanente puede durar entre dos y tres semanas si se cuida. No hace falta cambiar toda la rutina: alcanza con pequeños ajustes.

## Los siete hábitos

1. **Usa guantes** para lavar platos y limpiar. El detergente reseca el borde y levanta el sellado.
2. **No uses las uñas como herramienta**: abre las latas con una cuchara, no con el pulgar.
3. **Aplica aceite para cutículas** todas las noches. La piel hidratada sostiene mejor el esmaltado.
4. **Evita la acetona pura** entre citas; si necesitas quitar esmalte, usa uno sin acetona.
5. **Sécalas bien** después de la piscina o el mar: la humedad prolongada ablanda la capa.
6. **Lima solo los bordes despuntados**, en una sola dirección y con lima fina.
7. **Vuelve al salón** si ves un desprendimiento. Retirar a tiempo evita arrancar capas de la uña.

> Regla simple: si una uña se engancha en el cabello, ya toca retirarla.

## Cuándo conviene retirarlo

No esperes a que el esmalte se caiga solo. Cuando aparece una burbuja de aire en el borde o una punta levantada, el agua y el jabón se meten debajo y pueden provocar humedad en la uña natural. El retiro profesional toma pocos minutos y protege la placa.

Si el esmalte está intacto pero la uña creció mucho, el retiro también es la mejor opción: recortar o limar por encima del esmaltado suele quebrar el sellado.

## Una rutina mínima

| Momento | Qué hacer |
|---|---|
| Todas las noches | Aceite para cutículas y crema de manos |
| Al lavar platos | Guantes de goma |
| Cada 2 o 3 semanas | Retiro o relleno en el salón |
| Si se levanta una punta | No arrancarlo: pedir turno |

## Precio claro antes de reservar

Si quieres saber cuánto sale tu combinación favorita, [la calculadora del sitio principal](/#calculadora) muestra el total y el anticipo antes de reservar. Eliges servicio, forma, largo y diseño: el número que ves es el que pagas en el salón.
```

**Firma**

```
Escrito por
Equipo de Girlys
Manicura con precio cerrado en Sucre. Escribimos lo que aplicamos en el salón, sin promesas que no podamos cumplir.
```

---

## 7. Entrada 2 · Francesa clásica

**Título:** `Francesa clásica: por qué nunca pasa de moda`
**Slug:** `francesa-clasica`
**Fecha:** 22 de octubre de 2026
**Categoría:** Tendencias
**Descripción:** `La media luna limpia sigue siendo el diseño más pedido, y tiene sentido.`
**Imagen:** `/blog/francesa-clasica.webp`
**Texto alternativo:** `Manicura francesa clásica con media luna blanca`

**Cuerpo**

```
La francesa clásica es la prueba de que lo simple funciona: una base natural y una media luna blanca en la punta. No necesita glitter ni colores fuertes para verse cuidada.

## Por qué sigue vigente

Se ve limpia en cualquier largo, combina con todo y crece de forma discreta. Cuando la uña crece, el borde blanco sigue viéndose bien unos días más que un color sólido. Por eso es el diseño que más se repite en el salón: sirve para una entrevista de trabajo, para un casamiento y para la semana normal.

## Cómo pedirla

Pide **francesa clásica con media luna fina**. Si tu uña es corta, conviene una línea algo más gruesa para que se note; si es larga, la línea fina alarga el dedo.

También puedes elegir el tono de la base:

- **Nude rosado:** el más natural, disimula las imperfecciones de la placa.
- **Lechoso:** ilumina la mano y se nota más en uñas cortas.
- **Transparente:** deja ver la uña natural; ideal si ya tienes buena base.

## Errores que arruinan una francesa

1. **Línea demasiado gruesa:** come el largo de la uña y se ve pesada.
2. **Blanco puro sobre base fría:** el contraste puede verse artificial; un blanco crema suaviza.
3. **No sellar la punta:** el esmalte se levanta antes de tiempo.
4. **Limar después del secado:** el borde queda desparejo y se engancha.

## Cuánto cuesta

En el sitio principal la francesa clásica se suma al precio del servicio como diseño. [La calculadora](/#calculadora) lo muestra antes de confirmar la cita, sin sorpresas al final. Si tienes una referencia o un diseño en mente, mándala por WhatsApp y la revisamos juntas.
```

---

## 8. Entrada 3 · Precio de la esculpida

**Título:** `Largo, forma y precio: cómo se calcula una manicura esculpida`
**Slug:** `precio-manicura-esculpida`
**Fecha:** 18 de octubre de 2026
**Categoría:** Paso a paso
**Descripción:** `Qué mira el salón antes de darte un precio: servicio, forma, largo y diseño.`
**Imagen:** `/blog/manicura-esculpida.webp`
**Texto alternativo:** `Uñas esculpidas con forma de almendra y diseño nude`

**Cuerpo**

```
Una manicura esculpida no cuesta lo mismo en todas las manos. El precio depende de cuatro cosas concretas: el servicio, la forma, el largo y el diseño. Entenderlas te ayuda a calcular antes de reservar y a elegir lo que realmente quieres.

## 1. El servicio

Manicura clásica, semipermanente o esculpida: cada servicio tiene su precio base y su tiempo. La esculpida lleva más producto y más limado que una manicura clásica, por eso parte de un precio distinto.

## 2. La forma

Redonda, ovalada, almendra, cuadrada o stiletto. Las formas más trabajadas llevan más tiempo de limado y, a veces, más producto para sostener la estructura. La almendra y la stiletto son las que más paciencia piden.

## 3. El largo

Se mide en centímetros sobre la uña natural: corto, medio o largo. A más largo, más producto y más tiempo. También cambia el cuidado: una uña muy larga necesita más atención para no engancharse.

## 4. El diseño

Sin diseño, francesa clásica, nail art por uña o diseño personalizado. El diseño personalizado se cotiza aparte porque se dibuja a mano y puede llevar varios colores.

## Cómo se arma el total

La calculadora del sitio suma el precio base del servicio, el ajuste por forma y largo, y el diseño elegido. Después muestra el total estimado y el anticipo del 50 %. El precio final se confirma en el salón, mirando la uña: si la uña natural está muy dañada o el diseño necesita más material, se avisa antes de empezar.

### Un ejemplo

Manicura esculpida + forma almendra + largo medio + francesa clásica. La calculadora muestra cada concepto por separado, no un número mágico. Así puedes cambiar una opción y ver cómo afecta al total.

## Qué llevar a la cita

- Una **foto de referencia** del diseño, si tienes una.
- El **largo** que usas normalmente y si quieres cambiarlo.
- Si vienes de otro salón, avisa **cómo está la uña** para reservar el tiempo correcto.
- El **anticipo** del 50 % para confirmar el cupo.

[Calcula tu combinación](/#calculadora) y escríbenos por WhatsApp con el resumen. Si tienes dudas, te respondemos antes de que reserves.
```

---

## 9. Política de privacidad

**Título de la página:** `Privacidad`
**Slug:** `privacidad`
**Meta descripción:** `Qué datos pide Girlys para coordinar una cita, cómo se usan y cómo pedir que se borren.`

```
Para coordinar una cita te pedimos tu nombre y un número de WhatsApp. Usamos esos datos solamente para confirmar la reserva, avisarte de un cambio de horario y responder tus consultas. No los vendemos ni los compartimos con terceros.

La solicitud se completa en tu navegador y se envía por WhatsApp cuando pulsas el botón de confirmación. No queda guardada en un servidor nuestro. Puedes pedir que borremos la conversación por el mismo WhatsApp.

Si aceptas la analítica, Google Analytics recibe datos agregados de navegación (páginas vistas, clics y dispositivo). No recibe tu nombre, tu teléfono ni el detalle de tu reserva. Puedes rechazarla y la página funciona igual.
```

**Cierre:** `Última actualización: octubre de 2026.`

---

## 10. Términos y precios

**Título de la página:** `Términos y precios`
**Slug:** `terminos`
**Meta descripción:** `Precios en bolivianos, anticipo del 50 % y qué incluye cada servicio de manicura en Girlys.`

```
Todos los precios están en bolivianos (Bs) y son referenciales hasta que se confirma la cita. El total que muestra la calculadora corresponde al servicio, la forma, el largo y el diseño elegidos.

Para separar el cupo se pide un anticipo del 50 %. El saldo se paga en el salón al terminar el trabajo. El anticipo se descuenta del total, no se suma.

Las duraciones son estimadas: dependen del estado de la uña y del detalle del diseño. Si el trabajo requiere más tiempo del previsto, te lo avisamos antes de continuar.

Las fotos de trabajos son de referencia. El resultado puede variar por el tono de piel, la forma natural de la uña y la técnica elegida.
```

**Cierre:** `Última actualización: octubre de 2026.`

---

## 11. Cambios y cancelaciones

**Título de la página:** `Cambios y cancelaciones`
**Slug:** `cancelaciones`
**Meta descripción:** `Cómo reprogramar o cancelar una cita en Girlys y qué pasa con el anticipo del 50 %.`

```
Puedes cambiar la fecha u hora avisando con al menos 24 horas de anticipación. Te reprogramamos una vez sin costo y el anticipo se aplica a la nueva cita.

Si cancelas con menos de 24 horas, el anticipo no se devuelve: ese cupo ya estaba reservado para ti y no se pudo ofrecer a otra persona.

Si llegas más de 15 minutos tarde, puede que tengamos que acortar el servicio o reprogramarte, según la agenda del salón. Te avisamos por WhatsApp en cuanto vemos el retraso.

Si el salón tiene que cancelar por un motivo de fuerza mayor, te devolvemos el anticipo o lo pasamos a la fecha que elijas.
```

**Cierre:** `Última actualización: octubre de 2026.`

---

## 12. Contacto

**Título:** `Contacto`
**Slug:** `contacto`
**Meta descripción:** `Escríbenos por WhatsApp o visita uno de los tres salones de Girlys en Sucre.`

```
¿Quieres reservar o tienes una duda?

Escríbenos por WhatsApp al +591 633 964 52 y te respondemos con el precio y la disponibilidad.

## Salones

Centro Histórico
Calle Junín · Galería Paseo La Plata

Av. Las Américas
258 Av. Las Américas

Av. Jaime Mendoza
Calle Tarija 14 · Av. Jaime Mendoza

## Horarios

Lunes a viernes: 09:00–18:00
Sábado: 09:00–16:00
Domingo: cerrado

## Redes

Instagram: https://www.instagram.com/girlys.sucre/
Facebook: https://www.facebook.com/share/1EwZ2ADCBq/
```

**Botón:** `Escribir por WhatsApp` → `https://wa.me/59163396452`

---

## 13. SEO de cada página

| Página | Título SEO (≤ 60 caracteres) | Meta descripción (≤ 155) | Palabra clave principal |
|---|---|---|---|
| Inicio | `Girlys · Manicura en Sucre` | `Calcula el precio de tu manicura, elige forma, largo y diseño, y reserva en nuestros tres salones de Sucre.` | manicura Sucre |
| Blog | `Blog de Girlys · Manicura y cuidado de uñas en Sucre` | `Consejos de manicura, tendencias y precios claros. Lo que aprendemos en el salón, escrito para que tu esmaltado dure más.` | cuidado de uñas Sucre |
| Privacidad | `Privacidad · Girlys` | `Qué datos pide Girlys para coordinar una cita, cómo se usan y cómo pedir que se borren.` | — |
| Términos | `Términos y precios · Girlys` | `Precios en bolivianos, anticipo del 50 % y qué incluye cada servicio de manicura en Girlys.` | precios manicura Sucre |
| Cancelaciones | `Cambios y cancelaciones · Girlys` | `Cómo reprogramar o cancelar una cita en Girlys y qué pasa con el anticipo del 50 %.` | cancelar cita manicura |
| Contacto | `Contacto · Girlys Sucre` | `Escríbenos por WhatsApp o visita uno de los tres salones de Girlys en Sucre.` | salón de manicura Sucre |
| Entrada 1 | `Cómo cuidar la manicura semipermanente` | `Siete hábitos sencillos que alargan la vida del esmaltado sin dañar la uña natural.` | manicura semipermanente cuidado |
| Entrada 2 | `Francesa clásica: por qué nunca pasa de moda` | `La media luna limpia sigue siendo el diseño más pedido, y tiene sentido.` | francesa clásica |
| Entrada 3 | `Cómo se calcula una manicura esculpida` | `Qué mira el salón antes de darte un precio: servicio, forma, largo y diseño.` | precio manicura esculpida |

**Configuración general de SEO:**

- Idioma del sitio: Español (Bolivia).
- Títulos en formato `Página · Girlys`.
- URL canónica: `https://girlysbeautiful.si.com.bo/...`
- Imagen social: `og-girlys.jpg` (1200 × 630).
- Activar `FAQPage` con las siete preguntas de la sección 3.5.
- Activar `NailSalon` con nombre, teléfono, dirección y horarios.
- Mapa del sitio XML generado por Rank Math.
- `robots.txt`: permitir todo y apuntar al sitemap.

---

## 14. Imágenes y textos alternativos

| Archivo | Dónde se usa | Texto alternativo |
|---|---|---|
| `og-girlys.jpg` | Vista previa al compartir | `Girlys, manicura en Sucre` |
| `favicon.svg` | Icono del sitio | — |
| `blog/portada-blog.webp` | Portada del blog | `Detalle de una manicura con diseño nude` |
| `blog/cuidado-semipermanente.webp` | Entrada 1 | `Uñas con diseño de mármol azul sobre fondo claro` |
| `blog/francesa-clasica.webp` | Entrada 2 | `Manicura francesa clásica con media luna blanca` |
| `blog/manicura-esculpida.webp` | Entrada 3 | `Uñas esculpidas con forma de almendra y diseño nude` |

**Pendiente:** fotos reales del salón y de trabajos. Mientras no existan, se usan estas imágenes y se avisa que son de referencia.

---

## 15. Enlaces y mensajes de WhatsApp

**Número:** `59163396452`

| Origen | Mensaje |
|---|---|
| Botón general | `Hola Girlys 👋, quiero hacer una consulta.` |
| Consulta por salón | `Hola Girlys 👋, quiero consultar por el salón [nombre].` |
| Duda antes de reservar | `Hola Girlys 👋, tengo una duda antes de reservar.` |
| Calculadora | `Hola Girlys 👋, quiero reservar una cita.` + servicio, forma, extensión, diseño, total y anticipo. |
| Confirmación de reserva | `Hola Girlys 👋, acabo de enviar una solicitud de reserva.` + código, salón, fecha, hora, servicio, forma, largo, diseño, total y anticipo. |

**Formato del enlace:**

```
https://wa.me/59163396452?text=TEXTO%20CODIFICADO
```

---

## 16. Plugins que necesita este contenido

| Punto de la lista | Plugin | Para qué |
|---|---|---|
| 4 · Analytics | Site Kit by Google | Conectar `G-ZMHXH6EH9Y` |
| 6 · SEO | Rank Math | Títulos, descripciones, sitemap, FAQ, datos locales |
| 7 · Formularios y calculadora | Forminator | Calculadora y formulario de reserva |
| 8 · Redes y chat | Tawk.to + Joinchat | Chat en línea y botón de WhatsApp |
| 3 · SSL | Let's Encrypt (del panel) | HTTPS |
| Seguridad y copias | Wordfence + UpdraftPlus | Respaldo y protección |
| Velocidad | LiteSpeed Cache o WP Super Cache | Caché |

> No instalar todos el mismo día. Primero tema y páginas, después SEO y Analytics, después formularios y chat. Cada plugin nuevo se prueba abriendo el sitio.

---

## 17. Checklist de publicación

- [ ] Tema instalado y colores/tipografías ajustados.
- [ ] Página Inicio creada con las seis secciones y sus anclas.
- [ ] Menú principal y botón Reservar configurados.
- [ ] Las cinco páginas legales/contacto creadas.
- [ ] Las tres entradas publicadas con imagen destacada y categoría.
- [ ] Enlaces de WhatsApp probados en celular.
- [ ] Mapas de los tres salones cargando.
- [ ] Calculadora o formulario de reserva funcionando.
- [ ] Rank Math configurado con títulos y descripciones de la sección 13.
- [ ] Site Kit conectado a `G-ZMHXH6EH9Y`.
- [ ] Botones de Instagram y Facebook en el pie.
- [ ] Tawk.to visible y con mensaje de bienvenida.
- [ ] SSL activo y sin contenido mixto.
- [ ] Vista móvil revisada.
- [ ] Capturas guardadas en `05-Recursos/capturas/wordpress/`.

---

## 18. Lo que no se debe publicar

- Pedicura: no existe en la lista de servicios.
- Precios distintos a los de la tabla maestra.
- Direcciones o teléfonos inventados.
- Fotos de otros salones sin permiso.
- Textos legales “de plantilla” que contradigan el anticipo del 50 % o la política de 24 horas.
- Enlaces a PayPal si la cuenta todavía no puede cobrar en Bolivia.
- Promesas de resultados garantizados o de duración exacta del esmaltado.

---

**Siguiente paso:** cuando los puertos 80 y 443 estén abiertos, entrar a `/blog/wp-admin`, mover WordPress a la raíz y cargar este contenido en el orden del checklist. Mientras tanto, este documento queda como fuente única de textos para no reescribir nada dos veces.

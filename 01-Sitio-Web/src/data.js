// ============================================================
// datos del salón · precios en bolivianos
// todo editable desde acá: es el único lugar con números
// ============================================================

export const MONEDA = 'Bs'

export const SERVICIOS = [
  {
    id: 'manicura-express',
    zona: 'manos',
    nombre: 'Manicura Express',
    duracion: 45,
    precio: 55,
    resumen: 'Limado, cutículas y esmaltado tradicional.',
  },
  {
    id: 'manicura-classic',
    zona: 'manos',
    nombre: 'Manicura Clásica',
    duracion: 60,
    precio: 70,
    resumen: 'Completa: limado, cutículas, hidratación y esmalte.',
  },
  {
    id: 'manicura-spa',
    zona: 'manos',
    nombre: 'Manicura Spa',
    duracion: 90,
    precio: 120,
    resumen: 'Exfoliación, masque y masaje de mano.',
  },
  {
    id: 'manicura-semi',
    zona: 'manos',
    nombre: 'Manicura Semipermanente',
    duracion: 120,
    precio: 130,
    resumen: 'Gel con lámpara UV, 21 días de duración.',
  },
  {
    id: 'manicura-esculpidas',
    zona: 'manos',
    nombre: 'Manicura Esculpida',
    duracion: 150,
    precio: 200,
    resumen: 'Acrílico o gel de reconstrucción, el largo va incluido.',
  },
]

export const FORMAS = [
  {
    id: 'redonda',
    nombre: 'Redonda',
    mult: 1.0,
    detalle: 'La más fácil de mantener en casa.',
    svg: { punta: 0.82, arco: 1.0, caja: 1.0 },
  },
  {
    id: 'ovalada',
    nombre: 'Ovalada',
    mult: 1.0,
    detalle: 'Alarga el dedo sin exagerar.',
    svg: { punta: 0.66, arco: 1.0, caja: 0.99 },
  },
  {
    id: 'almendra',
    nombre: 'Almendra',
    mult: 1.12,
    detalle: 'Punta afinada; pide más tiempo de lima.',
    svg: { punta: 0.46, arco: 1.2, caja: 0.96 },
  },
  {
    id: 'cuadrada',
    nombre: 'Cuadrada',
    mult: 1.05,
    detalle: 'Borde recto, estilo clásico.',
    svg: { punta: 0.93, arco: 0.22, caja: 1.02 },
  },
  {
    id: 'stiletto',
    nombre: 'Stiletto',
    mult: 1.25,
    detalle: 'La más laboriosa: requiere extensions.',
    svg: { punta: 0.14, arco: 0.6, caja: 0.94 },
  },
]

export const LARGOS = [
  { id: 'corto', nombre: 'Corto', unidadesMax: 8, mult: 1.0, detalle: 'Hasta 0.6 cm sobre tu uña natural.' },
  { id: 'medio', nombre: 'Medio', unidadesMax: 11, mult: 1.1, detalle: 'De 0.7 a 0.9 cm.' },
  { id: 'largo', nombre: 'Largo', unidadesMax: 18, mult: 1.24, detalle: 'De 1 a 1.4 cm.' },
]

export const DISENOS = [
  { id: 'ninguno', nombre: 'Sin diseño', precio: 0, detalle: 'Solo el color.' },
  { id: 'french', nombre: 'French clásica', precio: 25, detalle: 'Borde en la punta.' },
  { id: 'art', nombre: 'Nail art por uña', precio: 45, detalle: 'Detalle dibujado a mano, hasta 5 uñas.' },
  // a medida: se dibuja para ti, con la técnica y el tiempo que lleva.
  // Por eso vale bastante más que un diseño de catálogo.
  { id: 'personalizado', nombre: 'Diseño personalizado', precio: 120, detalle: 'Pintado a mano, solo para ti.' },
]

export const RETIRO = { nombre: 'Retirar esmalte previo', precio: 15 }

export const ANTICIPO = 0.5

// Datos de ejemplo: reemplazar direcciones, teléfonos y horarios reales
// antes de publicar. Ver docs/contenido.md, sección 3.
export const SUCURSALES = [
  {
    id: 'centro',
    nombre: 'Centro Histórico',
    linea: 'Calle Bolívar 112 · Centro Histórico',
    calle: 'Calle Bolívar 112',
    zona: 'Centro Histórico',
    telefono: '+591 700 11 203',
    nota: 'Casa colonial restaurada, a dos cuadras de la Plaza 25 de Mayo.',
    horario: [
      { abre: '09:00', cierra: '19:30' },
      { abre: '09:00', cierra: '19:30' },
      { abre: '09:00', cierra: '19:30' },
      { abre: '09:00', cierra: '19:30' },
      { abre: '09:00', cierra: '19:30' },
      { abre: '09:00', cierra: '19:00' },
      null, // domingo
    ],
  },
  {
    id: 'recoleta',
    nombre: 'La Recoleta',
    linea: 'Calle Polanco 45 · La Recoleta',
    calle: 'Calle Polanco 45',
    zona: 'La Recoleta',
    telefono: '+591 700 44 118',
    nota: 'Frente al mirador. Sala chica, pensada para citas tranquilas.',
    horario: [
      { abre: '08:30', cierra: '18:30' },
      { abre: '08:30', cierra: '18:30' },
      { abre: '08:30', cierra: '18:30' },
      { abre: '08:30', cierra: '18:30' },
      { abre: '08:30', cierra: '18:30' },
      { abre: '09:00', cierra: '16:00' },
      null,
    ],
  },
  {
    id: 'siles',
    nombre: 'Av. Hernando Siles',
    linea: 'Av. Hernando Siles, 3er anillo, piso 2 · San Felipe',
    calle: 'Av. Hernando Siles, 3er anillo, piso 2',
    zona: 'San Felipe',
    telefono: '+591 700 88 455',
    nota: 'Segundo piso con ventanal. Se recomienda reservar para el atardecer.',
    horario: [
      null, // lunes
      { abre: '10:00', cierra: '20:00' },
      { abre: '10:00', cierra: '20:00' },
      { abre: '10:00', cierra: '20:00' },
      { abre: '10:00', cierra: '20:00' },
      { abre: '10:00', cierra: '20:00' },
      { abre: '10:00', cierra: '18:00' },
    ],
  },
]

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
export const DIAS_CORTO = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// ============================================================
// preguntas frecuentes
// El JSON-LD de Google se genera solo desde este arreglo en
// vite.config.js. No hay que copiarlo a mano en el HTML.
// ============================================================

export const PREGUNTAS = [
  {
    id: 'precio',
    pregunta: '¿El precio que muestra la calculadora es el final?',
    respuesta:
      'Sí. La calculadora suma el servicio, la forma, el largo y el diseño. Ese número es el total del trabajo; el anticipo es el 50 % y el resto se paga en el salón. Si cambias de diseño o de largo al llegar, se ajusta antes de empezar.',
  },
  {
    id: 'reserva',
    pregunta: '¿Cómo confirmo mi cita?',
    respuesta:
      'Eliges salón, día y hora en la sección Salones, dejas tu nombre y WhatsApp y envías la solicitud. Te escribimos por WhatsApp para confirmar el cupo y coordinar el anticipo. La cita queda confirmada cuando respondemos.',
  },
  {
    id: 'cambio',
    pregunta: '¿Puedo cambiar o cancelar la cita?',
    respuesta:
      'Sí, avisando con al menos 24 horas. Te reprogramamos una vez sin costo y el anticipo pasa a la nueva fecha. Con menos de 24 horas el anticipo no se devuelve, porque ese cupo ya estaba separado.',
  },
  {
    id: 'duracion',
    pregunta: '¿Cuánto dura cada servicio?',
    respuesta:
      'Cada servicio tiene su duración en la lista de precios: desde 45 minutos de una manicura express hasta 2 horas y media de una esculpida. La calculadora también te muestra el tiempo antes de reservar.',
  },
  {
    id: 'diseno',
    pregunta: '¿Puedo llevar mi propio diseño o una foto de referencia?',
    respuesta:
      'Sí. El nail art por uña cubre un detalle dibujado a mano en hasta cinco uñas. Si el diseño es más elaborado, se cotiza como diseño personalizado: mándanos la referencia por WhatsApp y te confirmamos el precio antes de la cita.',
  },
  {
    id: 'retiro',
    pregunta: '¿Cobran por retirar el esmalte de otro salón?',
    respuesta:
      'El retiro de gel, acrílico o uñas postizas tiene un costo de 15 Bs. Se marca en la calculadora y se suma al total. Si el trabajo anterior está muy dañado, te lo decimos antes de empezar.',
  },
  {
    id: 'formas',
    pregunta: '¿Qué forma y qué largo me convienen?',
    respuesta:
      'La redonda es la más fácil de mantener; la almendra alarga el dedo; la cuadrada es la más clásica y la stiletto la que más tiempo de lima lleva. En la calculadora puedes verlas y cambiar el largo en centímetros antes de reservar.',
  },
]

// ============================================================
// textos legales
// Revisa con la dueña del salón antes de publicar: son las reglas
// comerciales reales, no un adorno. Están enlazados desde el pie.
// ============================================================

export const POLITICAS = [
  {
    id: 'privacidad',
    titulo: 'Privacidad',
    parrafos: [
      'Para coordinar una cita te pedimos tu nombre y un número de WhatsApp. Usamos esos datos solamente para confirmar la reserva, avisarte de un cambio de horario y responder tus consultas. No los vendemos ni los compartimos con terceros.',
      'La solicitud se completa en tu navegador y se envía por WhatsApp cuando pulsas el botón de confirmación. No queda guardada en un servidor nuestro. Puedes pedir que borremos la conversación por el mismo WhatsApp.',
      'Si aceptas la analítica, Google Analytics recibe datos agregados de navegación (páginas vistas, clics y dispositivo). No recibe tu nombre, tu teléfono ni el detalle de tu reserva. Puedes rechazarla y la página funciona igual.',
    ],
  },
  {
    id: 'terminos',
    titulo: 'Términos y precios',
    parrafos: [
      'Todos los precios están en bolivianos (Bs) y son referenciales hasta que se confirma la cita. El total que muestra la calculadora corresponde al servicio, la forma, el largo y el diseño elegidos.',
      'Para separar el cupo se pide un anticipo del 50 %. El saldo se paga en el salón al terminar el trabajo. El anticipo se descuenta del total, no se suma.',
      'Las duraciones son estimadas: dependen del estado de la uña y del detalle del diseño. Si el trabajo requiere más tiempo del previsto, te lo avisamos antes de continuar.',
      'Las fotos de trabajos son de referencia. El resultado puede variar por el tono de piel, la forma natural de la uña y la técnica elegida.',
    ],
  },
  {
    id: 'cancelaciones',
    titulo: 'Cambios y cancelaciones',
    parrafos: [
      'Puedes cambiar la fecha u hora avisando con al menos 24 horas de anticipación. Te reprogramamos una vez sin costo y el anticipo se aplica a la nueva cita.',
      'Si cancelas con menos de 24 horas, el anticipo no se devuelve: ese cupo ya estaba reservado para ti y no se pudo ofrecer a otra persona.',
      'Si llegas más de 15 minutos tarde, puede que tengamos que acortar el servicio o reprogramarte, según la agenda del salón. Te avisamos por WhatsApp en cuanto vemos el retraso.',
      'Si el salón tiene que cancelar por un motivo de fuerza mayor, te devolvemos el anticipo o lo pasamos a la fecha que elijas.',
    ],
  },
]

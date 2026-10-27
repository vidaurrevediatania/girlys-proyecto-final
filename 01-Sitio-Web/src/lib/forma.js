/**
 * EL LARGO CRECE, EL ANCHO NO.
 *
 * Una uña de verdad no se ensancha cuando se alarga: lo que crece es el
 * borde libre. El lecho (su ancho) y la forma de la punta se quedan igual,
 * así que una almendra sigue siendo almendra con 0.2 cm y con 1.4 cm.
 *
 * Si el ancho creciera con el largo, la uña sería solo un zoom: con el largo
 * mínimo parecería una uña y con el máximo una aguja. Por eso el ancho es
 * fijo y lo único que se estira es la altura del costado. Y como la cúpula
 * de la punta se deriva del ancho, la punta tampoco cambia de forma.
 */
export const ANCHO = 26
export const SEPARACION_REGLA = 1.68 // la regla va a 1.68 medios anchos del centro

/**
 * El largo en unidades de dibujo, a partir de las unidades del deslizador.
 * La relación es lineal: 3 unidades dan 60 u y 18 dan 164 u, con la uña de
 * 9 unidades (0.7 cm, el valor por defecto del calculadora) en 101.6 u.
 */
export const largoEnPx = (unidades) => 60 + ((unidades - 3) / 15) * 104

/** medidas derivadas de los 4 números interpolables, en un solo sitio
    para que la uña y el diseño usen exactamente las mismas cifras */
export function medidas({ unidades, punta, arco, caja }) {
  const largoPx = largoEnPx(unidades)
  const anchoCuticula = ANCHO * caja // fijo: alargar no ensancha
  const anchoPunta = anchoCuticula * punta
  const tipY = BASE_Y - largoPx
  // la cúpula de la punta crece con el ancho de la punta y con el arco:
  // la cuadrada (arco chico) queda de corte casi recto, la redonda (arco ~1)
  // cierra media circunferencia
  const altoPunta = Math.max(anchoPunta * arco, 0.6)
  const yHombro = tipY + altoPunta
  return { unidades, largoPx, anchoCuticula, anchoPunta, tipY, altoPunta, yHombro }
}

/**
 * El ancho del costado a lo alto del tramo t (0 = cutícula, 1 = hombro).
 *
 *   ancho(t) = 1 − (1 − punta) · t^q
 *
 * Con q > 1 la curva queda SIEMPRE por fuera de la recta que une la cutícula
 * con el hombro: el costado se abomba hacia fuera y afina cada vez más rápido
 * hacia la punta, como una hoja. Si q bajara de 1 la uña saldría con cintura,
 * que es lo que la hacía leer como campana. El exponente reparte la
 * convergencia: alto en las formas anchas, que se quedan casi paralelas,
 * y bajo en las afiladas, que estrechan a lo largo de todo el costado.
 * En t = 0 la derivada es cero, así que el costado nace vertical y entra en
 * la cúpula sin esquina.
 */
const perfil = (t, punta) => 1 - (1 - punta) * Math.pow(t, 1.5 + 1.6 * punta)

const r = (n) => Math.round(n * 100) / 100

export { r }

/** el factor con que un cuarto de elipse se aproxima con una Bézier */
const KAPPA = 0.5523

const LADOS = 40

/**
 * LA PUNTA: dos curvas de Bézier, una por lado.
 *
 * Antes era media elipse y se le pegaba al costado de un jalón: el costado
 * llegaba al hombro con su propia inclinación y la elipse salía vertical, así
 * que el contorno se quebraba exactamente donde se nota, en la parte final de
 * la uña. Con la almendra la esquina era de 19° y con la ovalada de 15°.
 *
 * No se puede arreglar por el otro lado —que el costado llegue vertical a la
 * punta obligaría a que la uña salga con cintura, que es justo lo que el perfil
 * rechaza— así que la curva de la punta arranca en la dirección en que llega
 * el propio costado. Y llega al vértice en horizontal, para que las dos
 * mitades encajen sin quiebre. El contorno queda continuo (C1) en las dos
 * uniones: con el costado y con el vértice.
 *
 * Vive en su propia función porque el french la necesita: la franja blanca
 * es esta misma curva bajada δ, y así el blanco abraza la punta en vez de
 * ser un casquete suelto encima.
 */
export function puntaBezier({ unidades, punta, arco, caja }) {
  const m = medidas({ unidades, punta, arco, caja })
  const h = m.largoPx - m.altoPunta // altura del costado: de la cutícula al hombro

  // el costado izquierdo, de la cutícula al hombro
  const izq = []
  for (let i = 0; i <= LADOS; i++) {
    const t = i / LADOS
    izq.push([-m.anchoCuticula * perfil(t, punta), BASE_Y - h * t])
  }

  // la dirección en que el costado llega al hombro: la punta tiene que
  // arrancar en esa misma dirección o el contorno se quiebra
  const [ax, ay] = izq[izq.length - 2]
  const [bx, by] = izq[izq.length - 1]
  const ul = Math.hypot(bx - ax, by - ay)
  const dx = (bx - ax) / ul
  const dy = (by - ay) / ul

  // el largo de la tangente: el del cuarto de elipse, para que la punta siga
  // siendo la misma cuando el costado llega vertical
  const k = KAPPA * m.altoPunta
  const c1i = [bx + k * dx, by + k * dy] // control del lado izquierdo
  const c1d = [-c1i[0], c1i[1]] // su reflejo
  const c2i = [-KAPPA * m.anchoPunta, m.tipY] // control junto al vértice
  const c2d = [-c2i[0], c2i[1]]
  const vertice = [0, m.tipY]

  return { ...m, h, izq, c1i, c1d, c2i, c2d, vertice }
}

export const BASE_Y = 200

/**
 * La UÑA: silueta continua de 4 números interpolables.
 * Si son continuos, la forma se deforma en vez de saltar.
 *
 * unidades → el largo del deslizador; solo él cambia de largo
 * punta → fracción del ancho que queda en la punta (1 = ancha, 0 = aguja)
 * arco  → cuánto se redondea la punta (0 = corte recto)
 * caja  → proporción del ancho total
 *
 * El punto más ancho es la cutícula, y el recorte de la punta arranca en el
 * último tramo del largo, no desde la mitad, como en una uña real.
 * La silueta se muestrea en vez de escribirse a mano: así el costado nunca
 * se pasa de largo ni hace picos en las esquinas (el Catmull-Rom sí lo hacía
 * en el corte recto de la cuadrada).
 */
export function construirPath({ unidades, punta, arco, caja }) {
  const { izq, c1i, c2i, c1d, c2d, vertice, largoPx: L, anchoCuticula: a, altoPunta: alto } =
    puntaBezier({ unidades, punta, arco, caja })
  const curvaBase = a * 0.26

  const PASOS = 14

  // el costado derecho es el reflejo del izquierdo, recorrido al revés
  const der = izq.map(([x, y]) => [-x, y]).reverse()

  const partes = [`M ${r(izq[0][0])} ${r(izq[0][1])}`]
  for (let i = 1; i < izq.length; i++) partes.push(`L ${r(izq[i][0])} ${r(izq[i][1])}`)
  // la punta: del hombro izquierdo al vértice y del vértice al hombro derecho
  partes.push(`C ${r(c1i[0])} ${r(c1i[1])} ${r(c2i[0])} ${r(c2i[1])} ${r(vertice[0])} ${r(vertice[1])}`)
  partes.push(`C ${r(c2d[0])} ${r(c2d[1])} ${r(c1d[0])} ${r(c1d[1])} ${r(der[0][0])} ${r(der[0][1])}`)
  // costado derecho, del hombro a la cutícula
  for (let i = 1; i < der.length; i++) partes.push(`L ${r(der[i][0])} ${r(der[i][1])}`)
  // el nacimiento: arco suave hacia abajo (la cutícula)
  for (let i = 1; i < PASOS; i++) {
    const g = (Math.PI * i) / PASOS
    partes.push(`L ${r(a * Math.cos(g))} ${r(BASE_Y + curvaBase * Math.sin(g))}`)
  }

  return `${partes.join(' ')} Z`
}

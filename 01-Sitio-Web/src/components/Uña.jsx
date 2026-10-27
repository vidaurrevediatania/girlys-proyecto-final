import { useEffect, useId, useReducer, useRef } from 'react'
import {
  BASE_Y,
  BORDE_NATURAL_Y,
  SEPARACION_REGLA,
  construirPath,
  medidas,
  puntaBezier,
  r,
} from '../lib/forma.js'
import { textoLargo } from '../lib/precio.js'

/** el diseño vive dentro del mismo clip y usa las mismas medidas que la uña.
    Como el ancho no cambia al alargar, los diseños se quedan pegados a la
    punta: se agrandan con la uña, no con el largo. */
function Diseno({ diseno, a, punta }) {
  const { tipY } = punta
  if (diseno === 'french') {
    // LA PUNTA BLANCA: una media luna pegada al borde.
    //
    // La sonrisa va VOLTEADA: la línea de abajo es la misma curva de la
    // punta, bajada δ, y no una curva de smile. Así los dos bordes del
    // blanco giran para el mismo lado y queda una media luna de verdad —
    // fina, con las puntas afiladas en los costados—, que es como sale el
    // french en las fotos del salón.
    //
    // Antes la curva de la punta se medía contra el largo entero de la uña,
    // así que en las puntas bajas —la cuadrada, que solo tiene 5 unidades
    // de cúpula— el blanco se derramaba por los costados y quedaba un tazón
    // en vez de un french.
    //
    // Una media luna lisa y opaca, siguiendo el contorno real de la punta.
    // Limitamos su grosor a la extensión disponible para que en uñas cortas
    // la línea de sonrisa no tape el lecho natural.
    const { c1i, c1d, c2i, c2d, vertice, yHombro, anchoPunta } = punta
    const d = Math.min(a * 0.32, punta.extensionPx * 0.7)
    const X = a + 12
    const baja = ([x, y]) => `${r(x)} ${r(y + d)}`
    return (
      <path
        fillOpacity="1"
        d={`M ${r(-X)} ${r(tipY - 12)}
            L ${r(-X)} ${r(yHombro + d)}
            L ${r(-anchoPunta)} ${r(yHombro + d)}
            C ${baja(c1i)} ${baja(c2i)} ${baja(vertice)}
            C ${baja(c2d)} ${baja(c1d)} ${r(anchoPunta)} ${r(yHombro + d)}
            L ${r(X)} ${r(yHombro + d)}
            L ${r(X)} ${r(tipY - 12)} Z`}
      />
    )
  }
  if (diseno === 'personalizado') {
    // DISEÑO A MEDIDA: lo más elaborado de todos. Flor grande con centro
    // dorado, un filete y puntos sueltos, como los que se pintan a mano en
    // el salón. Va pegado a la punta para que no se separe del borde al
    // alargar, y anclada por debajo del vértice para que los pétalos no se
    // salgan del recorte ni en la cuadrada ni en el stiletto, donde la
    // cúpula es mínima.
    const cy = tipY + a * 0.5
    const R = a * 0.3
    const petalo = a * 0.16
    const fondo = cy + R + petalo
    const petalos = [0, 72, 144, 216, 288].map((g) => {
      const rad = (g * Math.PI) / 180
      return { x: Math.cos(rad) * R, y: cy + Math.sin(rad) * R }
    })
    return (
      <>
        {petalos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={petalo} />
        ))}
        <circle cx="0" cy={cy} r={a * 0.09} fill="var(--laton)" />
        <circle cx="0" cy={cy} r={a * 0.035} fill="var(--esmalte)" />
        {/* el filete: el trazo fino que arma el diseño */}
        <path
          d={`M ${r(-a * 0.44)} ${r(fondo + a * 0.16)}
              Q ${r(-a * 0.05)} ${r(fondo - a * 0.02)} ${r(a * 0.44)} ${r(fondo + a * 0.1)}`}
          fill="none"
          stroke="var(--laton)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx={-a * 0.42} cy={cy - a * 0.34} r={a * 0.05} />
        <circle cx={a * 0.44} cy={fondo + a * 0.3} r={a * 0.045} />
      </>
    )
  }
  if (diseno === 'art') {
    // florcita de cinco pétalos con dos puntos sueltos. Va pegada a la punta
    // para que no se separe del borde al alargar, y anclada por debajo del
    // vértice para que los pétalos no se salgan del recorte.
    const cy = tipY + a * 0.45
    const R = a * 0.26
    const petalo = a * 0.145
    const petalos = [0, 72, 144, 216, 288].map((g) => {
      const rad = (g * Math.PI) / 180
      return { x: Math.cos(rad) * R, y: cy + Math.sin(rad) * R }
    })
    return (
      <>
        {petalos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={petalo} />
        ))}
        <circle cx="0" cy={cy} r={a * 0.08} fill="var(--laton)" />
        <circle cx={-a * 0.34} cy={cy + a * 0.3} r={a * 0.05} />
        <circle cx={a * 0.36} cy={cy - a * 0.28} r={a * 0.05} />
      </>
    )
  }
  return null
}

export default function Uña({
  forma,
  diseno,
  unidades,
  regla = true,
  tinte = '#fdf4ec', // blanco cálido: punta french y acentos, sobre la laca
  esmalte = 'var(--esmalte)', // el color de la laca
  className = '',
}) {
  const id = useId().replace(/:/g, '')
  const [, redibujar] = useReducer((x) => x + 1, 0)
  const geoRef = useRef({ unidades, ...forma.svg })
  const destinoRef = useRef({ unidades, ...forma.svg })

  destinoRef.current = { unidades, ...forma.svg }

  useEffect(() => {
    const desde = { ...geoRef.current }
    const hasta = { ...destinoRef.current }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      geoRef.current = hasta
      redibujar()
      return
    }

    let inicio = null
    const DURACION = 420
    const paso = (t) => {
      if (inicio === null) inicio = t
      const p = Math.min(1, (t - inicio) / DURACION)
      const e = 1 - Math.pow(1 - p, 3)
      const siguiente = {}
      for (const clave of Object.keys(hasta)) {
        siguiente[clave] = desde[clave] + (hasta[clave] - desde[clave]) * e
      }
      geoRef.current = siguiente
      redibujar()
      if (p < 1) requestAnimationFrame(paso)
    }
    const raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [forma.id, unidades])

  const geo = geoRef.current
  const path = construirPath(geo)
  const punta = puntaBezier(geo)
  const { anchoCuticula: a } = medidas(geo)
  const medioDedo = a * SEPARACION_REGLA

  return (
    <svg
      className={`una ${className}`}
      viewBox={regla ? '-52 28 160 184' : '-48 28 96 184'}
      role="img"
      aria-label={`Uña ${forma.nombre.toLowerCase()}, extensión de ${textoLargo(unidades)} desde el borde natural`}
    >
      <defs>
        <clipPath id={`u${id}`}>
          <path d={path} />
        </clipPath>
        {/* la luz de la laca: de la punta al nacimiento, suave. Es la única
            fuente de brillo: sin franjas ni reflejos pegados encima */}
        <linearGradient id={`l${id}`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="28%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="62%" stopColor="#000" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
        {/* el costado: la uña es curva, así que los bordes caen apenas en
            sombra y el centro devuelve la luz. Sin esto la placa lee como un
            papel plano recortado; con demasiada, el rojo se ensucia */}
        <linearGradient
          id={`v${id}`}
          gradientUnits="userSpaceOnUse"
          x1={-a}
          y1="0"
          x2={a}
          y2="0"
        >
          <stop offset="0%" stopColor="#000" stopOpacity="0.13" />
          <stop offset="17%" stopColor="#000" stopOpacity="0.02" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="78%" stopColor="#000" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.13" />
        </linearGradient>
        {/* el asiento del nacimiento: una sombra suave en la cutícula */}
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* la laca, siempre: "sin diseño" sigue siendo "solo el color" */}
      <path d={path} fill={esmalte} />
      <path d={path} fill={`url(#l${id})`} />

      <g clipPath={`url(#u${id})`}>
        {/* el diseño en claro, encima de la laca */}
        <g fill={tinte} fillOpacity="0.92">
          <Diseno diseno={diseno} a={a} punta={punta} />
        </g>
        {/* la curvatura del costado, encima de todo: tiñe igual la laca y el
            diseño, así el dibujo no queda como un calcomanía pegada */}
        <rect
          x={-a - 3}
          y={punta.tipY - 12}
          width={(a + 3) * 2}
          height={punta.largoPx + 24}
          fill={`url(#v${id})`}
        />
        {/* asiento del nacimiento */}
        <rect
          x={-a - 12}
          y={BASE_Y - punta.largoPx * 0.18}
          width={(a + 12) * 2}
          height={punta.largoPx * 0.18 + 12}
          fill={`url(#s${id})`}
        />
      </g>

      {/* el filete: pelo, no muro */}
      <path d={path} fill="none" stroke="var(--tinta)" strokeOpacity="0.45" strokeWidth="1.1" />

      {/* 2. la medida, al costado de la uña */}
      {regla && (
        <g stroke="var(--tinta-4)" strokeWidth="1">
          <line
            x1={medioDedo + 8}
            y1={BORDE_NATURAL_Y}
            x2={medioDedo + 14}
            y2={BORDE_NATURAL_Y}
          />
          <line x1={medioDedo + 11} y1={punta.tipY} x2={medioDedo + 14} y2={punta.tipY} />
          <line
            x1={medioDedo + 11}
            y1={BORDE_NATURAL_Y}
            x2={medioDedo + 11}
            y2={punta.tipY}
            strokeDasharray="2 4"
            strokeOpacity="0.6"
          />
        </g>
      )}
      {regla && (
        <text
          x={medioDedo + 17}
          y={(BORDE_NATURAL_Y + punta.tipY) / 2 + 4}
          textAnchor="start"
          fill="var(--tinta-3)"
          fontSize="11"
          fontFamily="var(--sans)"
          letterSpacing="0.08em"
        >
          {textoLargo(unidades)}
        </text>
      )}
    </svg>
  )
}

/** miniatura de forma para el selector — solo la silueta, sin diseño */
export function GlifoForma({ forma, elegido }) {
  return (
    <svg className="glifo" viewBox="-30 94 60 122" aria-hidden="true" focusable="false">
      <path
        d={construirPath({ unidades: 9, ...forma.svg })}
        fill="var(--una-base)"
        stroke={elegido ? 'var(--polvo-hondo)' : 'var(--filete-fuerte)'}
        strokeOpacity={elegido ? 0.9 : 0.55}
        strokeWidth={elegido ? 1.7 : 1.3}
      />
    </svg>
  )
}

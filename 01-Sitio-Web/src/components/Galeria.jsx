import { useEffect, useRef, useState } from 'react'
import Uña from './Uña.jsx'
import { FORMAS } from '../data.js'

const ALMENDRA = FORMAS.find((f) => f.id === 'almendra')
const REDONDA = FORMAS.find((f) => f.id === 'redonda')

/**
 * Las fotos se descubren solas: Vite las ve en build y el glob las trae.
 * El usuario solo tiene que soltar los archivos en src/fotos, sin importar
 * el nombre ni la extensión. Si la carpeta está vacía, se usan los looks.
 */
const importadas = import.meta.glob('../fotos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const fotos = Object.entries(importadas)
  .map(([ruta, url]) => ({ url, nombre: ruta.split('/').pop().replace(/\.[^.]+$/, '') }))
  .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }))

/* Los looks ilustrados, por si la carpeta está vacía.
   `esmalte` es el color de la laca y `tinte` el del diseño encima.
   El largo va en unidades del deslizador, como en la calculadora. */
const LOOKS = [
  { forma: ALMENDRA, unidades: 10.5, diseno: 'french', esmalte: '#c9837f', tinte: '#fbf1e8' },
  { forma: ALMENDRA, unidades: 9.6, diseno: 'art', esmalte: '#e6b6ac', tinte: '#fff6ee' },
  { forma: ALMENDRA, unidades: 11.7, diseno: 'personalizado', esmalte: '#c9b6a6', tinte: '#e9dccb' },
  { forma: REDONDA, unidades: 8.4, diseno: 'ninguno', esmalte: '#4a5d8c', tinte: '#e9eef7' },
  { forma: ALMENDRA, unidades: 10.8, diseno: 'ninguno', esmalte: '#e7c8b4', tinte: '#f7e8dc' },
]

const conFotos = fotos.length > 0
const total = conFotos ? fotos.length : LOOKS.length

/* Ritmo: las fotos pesan poco, así que lo lento era el cambio, no la
   descarga. Intervalo corto y fundido breve — se lee como "está cambiando",
   no como una presentación de diapositivas. */
const INTERVALO = 2600
const FUNDIDO = 320

export default function Galeria() {
  const [activa, setActiva] = useState(0)
  const [pausado, setPausado] = useState(false)
  const marco = useRef(null)

  const reducido =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (pausado || reducido) return
    const t = setInterval(() => setActiva((i) => (i + 1) % total), INTERVALO)
    return () => clearInterval(t)
  }, [pausado, reducido, total])

  // si el usuario quita o agrega fotos, el índice puede quedar fuera de rango
  useEffect(() => {
    if (activa >= total) setActiva(0)
  }, [activa, total])

  const ir = (i) => setActiva((i + total) % total)

  const onTecla = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      ir(activa + 1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      ir(activa - 1)
    }
  }

  return (
    <figure
      className="galeria"
      ref={marco}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
      onKeyDown={onTecla}
      aria-roledescription="carrusel"
      aria-label="Trabajos recientes"
    >
      <div className="galeria-marco" style={{ '--fundido': `${FUNDIDO}ms` }}>
        {conFotos
          ? fotos.map((f, i) => (
              <div
                key={f.url}
                className={`galeria-slide ${i === activa ? 'es-activa' : ''}`}
                aria-hidden={i !== activa}
              >
                <img
                  src={f.url}
                  alt={`Trabajo de manicura ${i + 1} del salón`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))
          : LOOKS.map((l, i) => (
              <div
                key={l.forma.id + i}
                className={`galeria-slide ${i === activa ? 'es-activa' : ''}`}
                aria-hidden={i !== activa}
              >
                <div className="galeria-look">
                  <Uña
                    forma={l.forma}
                    unidades={l.unidades}
                    diseno={l.diseno}
                    regla={false}
                    esmalte={l.esmalte}
                    tinte={l.tinte}
                  />
                </div>
              </div>
            ))}
      </div>

      <div className="galeria-puntos" role="tablist" aria-label="Elegir trabajo">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activa}
            aria-label={`Trabajo ${i + 1}`}
            className={`galeria-punto ${i === activa ? 'es-activo' : ''}`}
            onClick={() => ir(i)}
          />
        ))}
      </div>
    </figure>
  )
}
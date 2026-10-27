import { useEffect } from 'react'
import { POLITICAS } from '../data.js'
import Revelar from './Revelar.jsx'

/**
 * Los textos legales viven en src/data.js. Son las reglas reales del
 * salón: si cambian el anticipo o la política de cancelación, se
 * cambian en un solo sitio.
 */
export default function Legal() {
  // Los enlaces del pie llevan a #privacidad, #terminos o #cancelaciones.
  // El bloque tiene que abrirse solo; si no, la persona llega a una
  // portada cerrada y cree que el enlace no funciona.
  useEffect(() => {
    const abrirDestino = () => {
      const id = window.location.hash.slice(1)
      if (!id) return
      const destino = document.getElementById(id)
      if (destino instanceof HTMLDetailsElement) destino.open = true
    }
    abrirDestino()
    window.addEventListener('hashchange', abrirDestino)
    return () => window.removeEventListener('hashchange', abrirDestino)
  }, [])

  return (
    <section className="seccion t-legal" id="legal">
      <div className="contenido">
        <header className="encabezado-seccion">
          <span className="numeral">05</span>
          <h2 className="titulo-seccion titular">Lo que conviene saber</h2>
          <p className="rotulo-seccion">Privacidad, precios y cambios de cita</p>
        </header>

        <p className="apunte legal-intro">
          Toca cada bloque para leerlo completo. Si algo no queda claro, pregúntanos
          por WhatsApp antes de reservar.
        </p>

        <div className="legal-rejilla">
          {POLITICAS.map((p, i) => (
            <Revelar key={p.id} delay={i * 50}>
              <details className="legal-bloque" id={p.id}>
                <summary>
                  <span className="serif">{p.titulo}</span>
                  <span className="pregunta-signo" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="legal-texto">
                  {p.parrafos.map((parrafo) => (
                    <p key={parrafo.slice(0, 32)} className="apunte">
                      {parrafo}
                    </p>
                  ))}
                </div>
              </details>
            </Revelar>
          ))}
        </div>

        <p className="nota legal-fecha">Última actualización: octubre de 2026.</p>
      </div>
    </section>
  )
}

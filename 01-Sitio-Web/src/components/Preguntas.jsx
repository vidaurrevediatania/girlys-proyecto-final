import { PREGUNTAS } from '../data.js'
import Revelar from './Revelar.jsx'
import { medir } from '../lib/analytics.js'
import { whatsappUrl } from '../lib/sitio.js'

export default function Preguntas() {
  return (
    <section className="seccion t-preguntas" id="preguntas">
      <div className="contenido">
        <header className="encabezado-seccion">
          <span className="numeral">04</span>
          <h2 className="titulo-seccion titular">Antes de reservar</h2>
          <p className="rotulo-seccion">Lo que casi todas preguntan</p>
        </header>

        <div className="preguntas-rejilla">
          {PREGUNTAS.map((p, i) => (
            <Revelar key={p.id} delay={i * 40}>
              <details className="pregunta" id={p.id}>
                <summary>
                  <span>{p.pregunta}</span>
                  <span className="pregunta-signo" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="apunte">{p.respuesta}</p>
              </details>
            </Revelar>
          ))}
        </div>

        <p className="nota preguntas-pie">
          ¿Te quedó otra duda?{' '}
          <a
            className="enlace-subrayado"
            href={whatsappUrl('Hola Girlys 👋, tengo una duda antes de reservar.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => medir('clic_whatsapp', { origen: 'preguntas' })}
          >
            Escríbenos por WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}

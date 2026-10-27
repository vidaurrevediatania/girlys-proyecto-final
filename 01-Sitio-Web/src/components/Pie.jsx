import { SUCURSALES } from '../data.js'
import { medir } from '../lib/analytics.js'
import { REDES, SITIO, hayRedes, whatsappUrl } from '../lib/sitio.js'

export default function Pie() {
  const anio = new Date().getFullYear()

  return (
    <footer className="seccion t-pie pie">
      <div className="contenido">
        <div className="pie-rejilla">
          <div>
            <p className="marca-nombre serif pie-marca">Girlys</p>
            <p className="apunte pie-linea">
              Manicura y pedicura en Santa Cruz de la Sierra. Atendemos con cita,
              sin fila y con el precio cerrado antes de empezar.
            </p>
            <a className="btn btn-linea pie-cta" href="#calculadora">
              Calcular mi cita
            </a>

            {hayRedes && (
              <div className="pie-redes">
                <p className="etiqueta">Síguenos</p>
                <ul className="pie-redes-lista">
                  {REDES.map((red) => (
                    <li key={red.id}>
                      <a
                        href={SITIO.redes[red.id]}
                        className="pie-red"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => medir('clic_social', { red: red.id, origen: 'pie' })}
                      >
                        {red.nombre} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <p className="etiqueta">Salones</p>
            <ul className="pie-lista">
              {SUCURSALES.map((s) => (
                <li key={s.id}>
                  <a href="#sucursales" className="pie-enlace">
                    <span className="serif">{s.nombre}</span>
                    <span className="nota">{s.linea}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="etiqueta">Contacto</p>
            <ul className="pie-lista">
              {SUCURSALES.map((s) => (
                <li key={s.id}>
                  <a
                    className="pie-enlace"
                    href={whatsappUrl(
                      `Hola Girlys 👋, quiero consultar por el salón ${s.nombre}.`,
                      s.telefono,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => medir('clic_whatsapp', { origen: 'pie', salon: s.nombre })}
                  >
                    <span className="serif">{s.telefono}</span>
                    <span className="nota">WhatsApp {s.nombre}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  className="pie-enlace pie-wa-general"
                  href={whatsappUrl('Hola Girlys 👋, quiero hacer una consulta.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => medir('clic_whatsapp', { origen: 'pie_general' })}
                >
                  <span className="serif">{SITIO.whatsappVisible}</span>
                  <span className="nota">WhatsApp general</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pie-legal">
          <p className="nota">
            © {anio} Girlys · Santa Cruz de la Sierra. Precios en bolivianos; el
            anticipo del 50 % confirma el cupo.
          </p>
          <nav className="pie-legal-enlaces" aria-label="Información legal">
            <a href="#privacidad" className="nota">
              Privacidad
            </a>
            <a href="#terminos" className="nota">
              Términos
            </a>
            <a href="#cancelaciones" className="nota">
              Cancelaciones
            </a>
            <a href="#preguntas" className="nota">
              Preguntas
            </a>
            {SITIO.blog && (
              <a
                href={SITIO.blog}
                className="nota"
                onClick={() => medir('clic_social', { red: 'blog', origen: 'pie' })}
              >
                Blog
              </a>
            )}
            <a href="#portada" className="nota pie-subir">
              Volver arriba ↑
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

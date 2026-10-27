import Galeria from './Galeria.jsx'
import { precioDesde } from '../lib/precio.js'
import { SERVICIOS } from '../data.js'

export default function Portada() {
  const desde = precioDesde(SERVICIOS)

  return (
    <section className="seccion t-portada portada" id="portada">
      <div className="contenido portada-rejilla">
        <div className="portada-texto">
          <p className="etiqueta">Sucre · desde 2019</p>

          <h1 className="titular portada-h1">
            Manicura y pedicura
            <span className="portada-h1-linea">con precio cerrado.</span>
          </h1>

          <p className="rotulo-seccion portada-rotulo">
            Tres salones, el mismo equipo, y una calculadora que te dice cuánto vas a
            pagar <em>antes</em> de sentarte en la silla.
          </p>

          <div className="portada-acciones">
            <a href="#calculadora" className="btn btn-firme">
              Calcular mi precio
            </a>
            <a href="#sucursales" className="btn btn-linea">
              Ver los tres salones
            </a>
          </div>

          <dl className="portada-datos">
            <div>
              <dt className="etiqueta">Anticipo</dt>
              <dd className="serif portada-dato">50 %</dd>
            </div>
            <div>
              <dt className="etiqueta">Manicura desde</dt>
              <dd className="serif portada-dato">{desde} Bs</dd>
            </div>
            <div>
              <dt className="etiqueta">Salones</dt>
              <dd className="serif portada-dato">3</dd>
            </div>
          </dl>
        </div>

        {/* el money shot de un salón es el trabajo hecho, no un dibujo */}
        <Galeria />
      </div>
    </section>
  )
}
import Revelar from './Revelar.jsx'
import { SUCURSALES } from '../data.js'
import { resumenHorario } from '../lib/agenda.js'

export default function Sucursales({ alElegir }) {
  return (
    <section className="seccion t-sucursales" id="sucursales">
      <div className="contenido">
        <header className="encabezado-seccion">
          <span className="numeral">03</span>
          <h2 className="titulo-seccion titular">Dónde te atendemos</h2>
          <p className="rotulo-seccion">Elige el salón que te queda más cerca</p>
        </header>

        <div className="salones">
          {SUCURSALES.map((s, i) => {
            const h = resumenHorario(s)
            return (
              <Revelar key={s.id} delay={i * 80} className="salon ficha">
                <p className="numeral salon-numeral">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="salon-nombre">{s.nombre}</h3>
                <p className="salon-linea apunte">{s.linea}</p>

                <dl className="salon-datos">
                  <div>
                    <dt className="etiqueta">Horario</dt>
                    <dd className="serif salon-valor">{h.rango}</dd>
                  </div>
                  <div>
                    <dt className="etiqueta">Cierra</dt>
                    <dd className="serif salon-valor">{h.cerrado}</dd>
                  </div>
                  <div>
                    <dt className="etiqueta">Teléfono</dt>
                    <dd className="serif salon-valor">{s.telefono}</dd>
                  </div>
                </dl>

                <p className="apunte salon-nota">{s.nota}</p>

                <button className="btn btn-linea salon-cta" onClick={() => alElegir(s.id)}>
                  Reservar en {s.nombre}
                </button>
              </Revelar>
            )
          })}
        </div>
      </div>
    </section>
  )
}

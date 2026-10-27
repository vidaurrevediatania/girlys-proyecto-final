import Revelar from './Revelar.jsx'
import { SERVICIOS } from '../data.js'
import { duracionTexto } from '../lib/precio.js'

const GRUPOS = [
  { id: 'manos', titulo: 'Manicura' },
]

export default function Servicios({ onElegir }) {
  return (
    <section className="seccion t-servicios" id="servicios">
      <div className="contenido">
        <header className="encabezado-seccion">
          <span className="numeral">01</span>
          <h2 className="titulo-seccion titular">La lista de precios</h2>
          <p className="rotulo-seccion">Sin sorpresas al final de la silla</p>
        </header>

        {GRUPOS.map((grupo, gi) => (
          <Revelar key={grupo.id} delay={gi * 70} className="grupo-precios">
            <h3 className="etiqueta grupo-titulo">{grupo.titulo}</h3>
            <ul className="lista-precios">
              {SERVICIOS.filter((s) => s.zona === grupo.id).map((s) => (
                <li key={s.id}>
                  <button className="precio-fila" onClick={() => onElegir(s.id)}>
                    <span className="precio-nombre serif">{s.nombre}</span>
                    <span className="precio-detalle apunte">{s.resumen}</span>
                    <span className="precio-tiempo nota">{duracionTexto(s.duracion)}</span>
                    <span className="precio-bolsa serif">{s.precio} Bs</span>
                  </button>
                </li>
              ))}
            </ul>
          </Revelar>
        ))}

        <p className="nota servicios-nota">
          El precio final depende de la forma, el largo y el diseño: por eso la
          calculadora de abajo es la fuente real del número.
        </p>
      </div>
    </section>
  )
}

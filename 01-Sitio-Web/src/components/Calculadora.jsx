import Uña, { GlifoForma } from './Uña.jsx'
import Revelar from './Revelar.jsx'
import { DISENOS, FORMAS, LARGOS, SERVICIOS } from '../data.js'
import { medir } from '../lib/analytics.js'
import { duracionTexto, textoLargo } from '../lib/precio.js'
import { mensajeReserva, whatsappUrl } from '../lib/sitio.js'

function LineaFila({ etiqueta, valor }) {
  return (
    <div className="ticket-linea">
      <span className="ticket-dato serif">{etiqueta}</span>
      <span className="ticket-linea-puntos" aria-hidden="true" />
      <span className="ticket-monto serif">{valor}</span>
    </div>
  )
}

export default function Calculadora({ seleccion, alCambiar, precio, alReservar }) {
  const { servicio, forma, largo, diseno } = seleccion
  const pos = seleccion.largoPos * 100

  return (
    <section className="seccion t-calculo" id="calculadora">
      <div className="contenido">
        <header className="encabezado-seccion">
          <span className="numeral">02</span>
          <h2 className="titulo-seccion titular">Calculadora de uñas</h2>
          <p className="rotulo-seccion">Forma, diseño y largo. El número sale solo.</p>
        </header>

        <div className="calc-rejilla">
          {/* ---------------- controles ---------------- */}
          <div className="calc-controles">
            <Revelar className="bloque">
              <div className="bloque-cab">
                <span className="numeral">a</span>
                <h3 className="bloque-titulo">Elige el servicio</h3>
              </div>
              <label className="campo-salto" htmlFor="servicio">
                Servicio
              </label>
              <select
                id="servicio"
                className="campo"
                value={servicio.id}
                onChange={(e) => alCambiar({ servicioId: e.target.value })}
              >
                <optgroup label="Manos">
                  {SERVICIOS.filter((s) => s.zona === 'manos').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre} — {s.precio} Bs
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Pies">
                  {SERVICIOS.filter((s) => s.zona === 'pies').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre} — {s.precio} Bs
                    </option>
                  ))}
                </optgroup>
              </select>
              <p className="apunte bloque-apunte">
                {servicio.resumen} · {duracionTexto(servicio.duracion)}
              </p>
            </Revelar>

            <Revelar className="bloque" delay={60}>
              <div className="bloque-cab">
                <span className="numeral">b</span>
                <h3 className="bloque-titulo">Elige la forma</h3>
              </div>
              <div className="formas" role="radiogroup" aria-label="Forma de la uña">
                {FORMAS.map((f) => {
                  const recargo = Math.round((f.mult - 1) * 100)
                  return (
                    <button
                      key={f.id}
                      role="radio"
                      aria-checked={forma.id === f.id}
                      className="forma-btn"
                      onClick={() => alCambiar({ formaId: f.id })}
                    >
                      <GlifoForma forma={f} elegido={forma.id === f.id} />
                      <span className="forma-nombre">{f.nombre}</span>
                      <span className="forma-nota nota">
                        {recargo > 0 ? `+${recargo} %` : 'sin recargo'}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="apunte bloque-apunte">{forma.detalle}</p>
            </Revelar>

            <Revelar className="bloque" delay={120}>
              <div className="bloque-cab">
                <span className="numeral">c</span>
                <h3 className="bloque-titulo">Ajusta el largo</h3>
              </div>
              <div className="largo-cabecera">
                <span className="largo-tramo serif">{largo.nombre}</span>
                <span className="largo-medida serif">{textoLargo(seleccion.unidades)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={pos}
                onChange={(e) => alCambiar({ largoPos: Number(e.target.value) / 100 })}
                style={{ '--llenado': `${pos}%` }}
                aria-label={`Largo de la uña: ${textoLargo(seleccion.unidades)}`}
                aria-valuetext={`${largo.nombre}, ${textoLargo(seleccion.unidades)}`}
              />
              <div className="largo-marcas" aria-hidden="true">
                {LARGOS.map((l) => (
                  <span key={l.id}>{l.nombre}</span>
                ))}
              </div>
              <p className="apunte bloque-apunte">{largo.detalle}</p>
            </Revelar>

            <Revelar className="bloque" delay={180}>
              <div className="bloque-cab">
                <span className="numeral">d</span>
                <h3 className="bloque-titulo">Añade un diseño</h3>
              </div>
              <div className="disenos" role="radiogroup" aria-label="Diseño">
                {DISENOS.map((d) => (
                  <button
                    key={d.id}
                    role="radio"
                    aria-checked={diseno.id === d.id}
                    className="fila diseno-fila"
                    onClick={() => alCambiar({ disenoId: d.id })}
                  >
                    <span className="punto-elegido" aria-hidden="true" />
                    <span className="rotulo-opcion">
                      {d.nombre}
                      <span className="entradilla">{d.detalle}</span>
                    </span>
                    <span className="preciosuma serif">
                      {d.precio === 0 ? '—' : `+ ${d.precio}`}
                    </span>
                  </button>
                ))}
              </div>

              <label className="fila retiro-fila">
                <input
                  type="checkbox"
                  className="salto-anchor"
                  checked={seleccion.retiro}
                  onChange={(e) => alCambiar({ retiro: e.target.checked })}
                />
                <span className="punto-elegido" aria-hidden="true" />
                <span className="rotulo-opcion">
                  Retirar esmalte previo
                  <span className="entradilla">Gel, acrílico o uñas postizas.</span>
                </span>
                <span className="preciosuma serif">+ 15</span>
              </label>
            </Revelar>
          </div>

          {/* ---------------- ficha + silueta ---------------- */}
          <aside className="calc-lateral">
            <Revelar delay={80} className="ticket ficha">
              <figure className="ticket-figura">
                <Uña
                  forma={forma}
                  diseno={diseno.id}
                  unidades={seleccion.unidades}
                />
              </figure>

              <div className="ticket-cuerpo">
                <p className="etiqueta">Tu ficha</p>
                <p className="ticket-servicio">{servicio.nombre}</p>

                <div className="ticket-lineas">
                  <LineaFila etiqueta={`Forma ${forma.nombre.toLowerCase()}`} valor={`+ ${precio.recargoForma}`} />
                  <LineaFila
                    etiqueta={`Largo ${largo.nombre.toLowerCase()} · ${textoLargo(seleccion.unidades)}`}
                    valor={`+ ${precio.recargoLargo}`}
                  />
                  <LineaFila
                    etiqueta={diseno.nombre}
                    valor={diseno.precio === 0 ? 'incluido' : `+ ${precio.recargoDiseno}`}
                  />
                  {seleccion.retiro && <LineaFila etiqueta="Retiro de esmalte" valor={`+ ${precio.recargoRetiro}`} />}
                </div>

                <div className="ticket-total">
                  <span className="etiqueta">Total del servicio</span>
                  <span className="ticket-total-cifra">{precio.total} Bs</span>
                </div>

                <div className="ticket-anticipo">
                  <span className="etiqueta">Para reservar · anticipo 50 %</span>
                  <span className="ticket-anticipo-cifra">{precio.anticipo} Bs</span>
                  <span className="ticket-saldo nota">
                    El resto, {precio.saldo} Bs, lo pagas en el salón.
                  </span>
                </div>

                <button className="btn btn-firme ticket-cta" onClick={alReservar}>
                  Reservar con este cálculo
                </button>
                <a
                  className="btn btn-linea ticket-wa"
                  href={whatsappUrl(mensajeReserva({ seleccion, precio }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => medir('clic_whatsapp', { origen: 'calculadora' })}
                >
                  Consultar por WhatsApp
                </a>
                <p className="nota ticket-duracion">
                  Te ocupa {duracionTexto(servicio.duracion)} de la tarde.
                </p>
              </div>
            </Revelar>
          </aside>
        </div>
      </div>
    </section>
  )
}
import { useMemo, useState } from 'react'
import Revelar from './Revelar.jsx'
import { ExpandableCardDemo } from './ExpandableCard.jsx'
import { SUCURSALES } from '../data.js'
import { cuposDe, etiquetaDia, proximosDias } from '../lib/agenda.js'
import { duracionTexto } from '../lib/precio.js'

function Resumen({ sucursal, etiqueta, hora, seleccion, precio, enviado, onEnviar, datos, alDato }) {
  const { servicio, forma, largo, diseno } = seleccion

  if (enviado) {
    const codigo = `${sucursal.id.slice(0, 2).toUpperCase()}-${(etiqueta.numero * 7 + hora.replace(':', '')) % 1000}`
    return (
      <div className="ticket ficha confirmacion" role="status">
        <p className="etiqueta">Reserva registrada</p>
        <p className="confirmacion-codigo">{codigo}</p>
        <p className="apunte">
          {sucursal.nombre} · {etiqueta.largo} {etiqueta.numero} {etiqueta.mes} · {hora}
        </p>
        <p className="apunte">{servicio.nombre} · {forma.nombre} · {largo.nombre}</p>

        <div className="ticket-total">
          <span className="etiqueta">Anticipo a pagar</span>
          <span className="ticket-total-cifra">{precio.anticipo} Bs</span>
        </div>
        <p className="nota">
          Presenta este código en el salón. El saldo de {precio.saldo} Bs lo pagas al
          terminar.
        </p>
        <a
          className="btn btn-linea"
          href={`https://wa.me/${sucursal.telefono.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
        >
          Confirmar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      className="ticket ficha resumen"
      onSubmit={(e) => {
        e.preventDefault()
        onEnviar()
      }}
    >
      <p className="etiqueta">Tu reserva</p>

      <div className="resumen-datos">
        <div>
          <span className="etiqueta">Salón</span>
          <span className="resumen-valor">{sucursal.nombre}</span>
        </div>
        <div>
          <span className="etiqueta">Cuándo</span>
          <span className="resumen-valor">
            {hora ? `${etiqueta.largo} ${etiqueta.numero} ${etiqueta.mes} · ${hora}` : 'Elige un horario'}
          </span>
        </div>
        <div>
          <span className="etiqueta">Te haces</span>
          <span className="resumen-valor">
            {servicio.nombre} · {forma.nombre} · {largo.nombre}
            {diseno.precio > 0 ? ` · ${diseno.nombre}` : ''}
          </span>
        </div>
        <div>
          <span className="etiqueta">Duración</span>
          <span className="resumen-valor">{duracionTexto(servicio.duracion)}</span>
        </div>
      </div>

      <div className="ticket-total">
        <span className="etiqueta">Total</span>
        <span className="ticket-total-cifra">{precio.total} Bs</span>
      </div>
      <div className="ticket-anticipo">
        <span className="etiqueta">Anticipo 50 % para reservar</span>
        <span className="ticket-anticipo-cifra">{precio.anticipo} Bs</span>
        <span className="ticket-saldo nota">
          Saldo de {precio.saldo} Bs en el salón.
        </span>
      </div>

      <div className="campos">
        <label className="campo-caja">
          <span className="etiqueta">Nombre y apellido</span>
          <input
            className="campo"
            value={datos.nombre}
            onChange={(e) => alDato('nombre', e.target.value)}
            placeholder="Ej. Daniela Ribera"
            required
          />
        </label>
        <label className="campo-caja">
          <span className="etiqueta">Teléfono o WhatsApp</span>
          <input
            className="campo"
            type="tel"
            inputMode="numeric"
            value={datos.telefono}
            onChange={(e) => alDato('telefono', e.target.value)}
            placeholder="700 00 000"
            required
          />
        </label>
      </div>

      <button className="btn btn-firme ticket-cta" type="submit" disabled={!hora}>
        {hora ? `Reservar y pagar ${precio.anticipo} Bs` : 'Elige un horario'}
      </button>
      <p className="nota">Te escribimos por WhatsApp para confirmar la hora.</p>
    </form>
  )
}

export default function Reserva({ seleccion, precio, sucursalId, alSucursal }) {
  const dias = useMemo(() => proximosDias(7), [])
  const [diaIdx, setDiaIdx] = useState(0)
  const [hora, setHora] = useState(null)
  const [enviado, setEnviado] = useState(false)
  const [datos, setDatos] = useState({ nombre: '', telefono: '' })

  const sucursal = SUCURSALES.find((s) => s.id === sucursalId) ?? SUCURSALES[0]
  const dia = dias[diaIdx]
  const { cupos, abierto } = cuposDe({
    sucursal,
    fecha: dia,
    duracion: seleccion.servicio.duracion,
  })

  const cambiarSucursal = (id) => {
    alSucursal(id)
    setHora(null)
    setEnviado(false)
  }

  /** cambiar la cita invalida el código ya emitido */
  const invalidar = (cambio) => {
    setEnviado(false)
    if (cambio) cambio()
  }

  return (
    <section className="seccion t-reserva" id="reserva">
      <div className="contenido">
        <header className="encabezado-seccion">
          <span className="numeral">04</span>
          <h2 className="titulo-seccion titular">Reserva tu hora</h2>
          <p className="rotulo-seccion">Salón, día y horario. Mitad ahora, mitad en el salón.</p>
        </header>

        <div className="reserva-rejilla">
          {/* ---------------- la agenda ---------------- */}
          <div className="agenda">
            <Revelar className="bloque">
              <div className="bloque-cab">
                <span className="numeral">1</span>
                <h3 className="bloque-titulo">Elige tu salón</h3>
              </div>
              <ExpandableCardDemo
                onSelect={(id) => {
                  cambiarSucursal(id)
                }}
              />
            </Revelar>

            <Revelar className="bloque" delay={70}>
              <div className="bloque-cab">
                <span className="numeral">2</span>
                <h3 className="bloque-titulo">Elige el día</h3>
              </div>
              <div className="dias" role="radiogroup" aria-label="Día">
                {dias.map((d, i) => {
                  const e = etiquetaDia(d)
                  const cerrado = !sucursal.horario[d.getDay()]
                  return (
                    <button
                      key={i}
                      role="radio"
                      aria-checked={i === diaIdx}
                      className="dia"
                      onClick={() =>
                        invalidar(() => {
                          setDiaIdx(i)
                          setHora(null)
                        })
                      }
                    >
                      <span className="dia-corto">{e.corto}</span>
                      <span className="dia-numero serif">{e.numero}</span>
                      <span className="dia-mes">{cerrado ? 'cerrado' : e.mes}</span>
                    </button>
                  )
                })}
              </div>
            </Revelar>

            <Revelar className="bloque" delay={140}>
              <div className="bloque-cab">
                <span className="numeral">3</span>
                <h3 className="bloque-titulo">Elige la hora</h3>
              </div>

              {!abierto ? (
                <p className="vacio">
                  {sucursal.nombre} no abre los {etiquetaDia(dia).largo.toLowerCase()}.
                  Prueba el salón de {SUCURSALES.filter((s) => s.horario[dia.getDay()])
                    .map((s) => s.nombre)
                    .join(' o ')}.
                </p>
              ) : (
                <>
                  <div className="cupos" role="radiogroup" aria-label="Hora">
                    {cupos.map((c) => (
                      <button
                        key={c.hora}
                        role="radio"
                        aria-checked={hora === c.hora}
                        className="cupo"
                        disabled={!c.disponible}
                        onClick={() => invalidar(() => setHora(c.hora))}
                        title={c.motivo ?? 'Disponible'}
                      >
                        {c.hora}
                      </button>
                    ))}
                  </div>
                  <p className="nota cupos-nota">
                    Los horarios tachados ya están tomados. Llegamos a <span className="serif">{cupos.filter((c) => c.disponible).length}</span>{' '}
                    libres para {seleccion.servicio.nombre.toLowerCase()} ese día.
                  </p>
                </>
              )}
            </Revelar>
          </div>

          <aside className="reserva-lateral">
            <Revelar delay={100}>
              <Resumen
                sucursal={sucursal}
                etiqueta={etiquetaDia(dia)}
                hora={hora}
                seleccion={seleccion}
                precio={precio}
                enviado={enviado}
                datos={datos}
                alDato={(campo, valor) => setDatos((d) => ({ ...d, [campo]: valor }))}
                onEnviar={() => setEnviado(true)}
              />
            </Revelar>
          </aside>
        </div>
      </div>
    </section>
  )
}
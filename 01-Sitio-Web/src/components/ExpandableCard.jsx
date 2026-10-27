'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOutsideClick } from '../hooks/use-outside-click.js'
import { SUCURSALES } from '../data.js'
import { cuposDe, etiquetaDia, proximosDias } from '../lib/agenda.js'
import { medir } from '../lib/analytics.js'
import { duracionTexto } from '../lib/precio.js'
import { whatsappUrl } from '../lib/sitio.js'

function MapaSucursal({ sucursal, modal = false }) {
  const nombre = sucursal.nombre || sucursal.title
  const consulta = encodeURIComponent(sucursal.mapaQuery)
  const mapa = `https://maps.google.com/maps?hl=es&q=${consulta}&z=16&output=embed`
  const enlace = `https://www.google.com/maps/search/?api=1&query=${consulta}`

  return (
    <div className={`mapa-sucursal${modal ? ' mapa-sucursal-modal' : ''}`}>
      <div className="mapa-sucursal-marca">
        <img src="/favicon.svg" alt="" width="28" height="28" />
        <span className="serif">Girlys</span>
        <span className="mapa-sucursal-ciudad">Sucre · Bolivia</span>
      </div>
      <iframe
        className="mapa-sucursal-iframe"
        src={mapa}
        title={`Mapa de ${nombre}, Sucre`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        tabIndex={modal ? 0 : -1}
      />
      {modal && (
        <a
          className="mapa-sucursal-enlace"
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en Google Maps <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}

function BookingFlow({ sucursal, seleccion, precio, onClose }) {
  const dias = useMemo(() => proximosDias(7), [])
  const [diaIdx, setDiaIdx] = useState(0)
  const [hora, setHora] = useState(null)
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [datos, setDatos] = useState({ nombre: '', telefono: '' })

  const dia = dias[diaIdx]
  const { cupos, abierto } = cuposDe({
    sucursal,
    fecha: dia,
    duracion: seleccion.servicio.duracion,
  })
  const etiqueta = etiquetaDia(dia)

  const invalidar = (cambio) => {
    setEnviado(false)
    if (cambio) cambio()
  }

  const telefonoValido = datos.telefono.replace(/\D/g, '').length >= 7
  const datosValidos = datos.nombre.trim().length >= 2 && telefonoValido
  const listo = Boolean(hora) && datosValidos

  if (enviado) {
    const codigo = `${sucursal.id.slice(0, 2).toUpperCase()}-${(etiqueta.numero * 7 + hora.replace(':', '')) % 1000}`
    const texto = [
      'Hola Girlys 👋, acabo de enviar una solicitud de reserva.',
      '',
      `• Código: ${codigo}`,
      `• Salón: ${sucursal.nombre}`,
      `• Fecha: ${etiqueta.largo} ${etiqueta.numero} de ${etiqueta.mes}, ${hora}`,
      `• Servicio: ${seleccion.servicio.nombre}`,
      `• Forma: ${seleccion.forma.nombre}`,
      `• Largo: ${seleccion.largo.nombre}`,
      `• Diseño: ${seleccion.diseno.nombre}`,
      ...(seleccion.retiro ? ['• Retiro de esmalte previo'] : []),
      '',
      `Total: ${precio.total} Bs · Anticipo: ${precio.anticipo} Bs`,
      `Mi nombre es ${datos.nombre}.`,
    ].join('\n')

    return (
      <div className="booking-confirm" role="status">
        <p className="etiqueta">Solicitud enviada</p>
        <p className="confirmacion-codigo">{codigo}</p>
        <p className="apunte">
          {sucursal.nombre} · {etiqueta.largo} {etiqueta.numero} {etiqueta.mes} · {hora}
        </p>
        <p className="apunte">
          {seleccion.servicio.nombre} · {seleccion.forma.nombre} · {seleccion.largo.nombre} ·{' '}
          {seleccion.diseno.nombre}
        </p>
        <div className="ticket-total">
          <span className="etiqueta">Anticipo a pagar</span>
          <span className="ticket-total-cifra">{precio.anticipo} Bs</span>
        </div>
        <p className="nota">
          Te escribimos por WhatsApp para confirmar el cupo. El saldo de {precio.saldo} Bs lo
          pagas al terminar.
        </p>
        <a
          className="btn btn-linea"
          href={whatsappUrl(texto)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            medir('clic_whatsapp', { origen: 'confirmacion_reserva', salon: sucursal.nombre })
          }
        >
          Confirmar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="booking-flow">
      <div className="booking-layout">
        <div className="booking-main">
          <div className="booking-step">
            <span className="booking-step-num">1</span>
            <span className="booking-step-label">Elige el día</span>
          </div>
          <div className="booking-dias" role="radiogroup" aria-label="Día">
            {dias.map((d, i) => {
              const e = etiquetaDia(d)
              const cerrado = !sucursal.horario[d.getDay()]
              return (
                <button
                  key={i}
                  role="radio"
                  aria-checked={i === diaIdx}
                  className="booking-dia"
                  onClick={() => invalidar(() => { setDiaIdx(i); setHora(null) })}
                >
                  <span className="booking-dia-corto">{e.corto}</span>
                  <span className="booking-dia-num serif">{e.numero}</span>
                  <span className="booking-dia-mes">{cerrado ? 'cerrado' : e.mes}</span>
                </button>
              )
            })}
          </div>

          <div className="booking-step">
            <span className="booking-step-num">2</span>
            <span className="booking-step-label">Elige la hora</span>
          </div>
          {!abierto ? (
            <p className="vacio">
              {sucursal.nombre} no abre los {etiqueta.largo.toLowerCase()}.
            </p>
          ) : (
            <div className="booking-cupos" role="radiogroup" aria-label="Hora">
              {cupos.map((c) => (
                <button
                  key={c.hora}
                  role="radio"
                  aria-checked={hora === c.hora}
                  className="booking-cupo"
                  disabled={!c.disponible}
                  onClick={() => invalidar(() => setHora(c.hora))}
                >
                  {c.hora}
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="booking-side">
          <div className="booking-step">
            <span className="booking-step-num">3</span>
            <span className="booking-step-label">Tus datos</span>
          </div>
          <div className="booking-form">
            <label className="booking-field">
              <span className="etiqueta">Nombre y apellido</span>
              <input
                className="campo"
                value={datos.nombre}
                onChange={(e) => setDatos((d) => ({ ...d, nombre: e.target.value }))}
                placeholder="Ej. Daniela Ribera"
                required
              />
            </label>
            <label className="booking-field">
              <span className="etiqueta">Teléfono o WhatsApp</span>
              <input
                className="campo"
                type="tel"
                inputMode="numeric"
                value={datos.telefono}
                onChange={(e) => setDatos((d) => ({ ...d, telefono: e.target.value }))}
                placeholder="700 00 000"
                required
              />
            </label>
          </div>

          <div className="booking-resumen">
            <div className="booking-resumen-row">
              <span className="etiqueta">Servicio</span>
              <span className="booking-resumen-valor">
                {seleccion.servicio.nombre} · {seleccion.forma.nombre} · {seleccion.largo.nombre}
              </span>
            </div>
            <div className="booking-resumen-row">
              <span className="etiqueta">Diseño</span>
              <span className="booking-resumen-valor">{seleccion.diseno.nombre}</span>
            </div>
            <div className="booking-resumen-row">
              <span className="etiqueta">Duración</span>
              <span className="booking-resumen-valor">{duracionTexto(seleccion.servicio.duracion)}</span>
            </div>
            <div className="booking-total">
              <span className="etiqueta">Total</span>
              <span className="ticket-total-cifra">{precio.total} Bs</span>
            </div>
            <div className="booking-anticipo">
              <span className="etiqueta">Anticipo 50 %</span>
              <span className="booking-anticipo-cifra">{precio.anticipo} Bs</span>
            </div>
          </div>

          {!datosValidos && (
            <p className="nota booking-hint">
              Escribe tu nombre y un WhatsApp de al menos 7 dígitos.
            </p>
          )}
          {datosValidos && !hora && (
            <p className="nota booking-hint">Elige una hora disponible.</p>
          )}

          <motion.button
            className="btn btn-firme booking-submit"
            disabled={!listo || cargando}
            onClick={() => {
              medir('reserva_solicitada', {
                salon: sucursal.nombre,
                servicio: seleccion.servicio.nombre,
                forma: seleccion.forma.nombre,
                largo: seleccion.largo.nombre,
                diseno: seleccion.diseno.nombre,
                total: precio.total,
                anticipo: precio.anticipo,
                hora,
              })
              setCargando(true)
              setTimeout(() => {
                setCargando(false)
                setEnviado(true)
              }, 1200)
            }}
            whileTap={{ scale: 0.97 }}
          >
            {cargando ? (
              <>
                <span className="stateful-spinner" aria-hidden="true" />
                Enviando…
              </>
            ) : listo ? (
              `Solicitar cita · anticipo ${precio.anticipo} Bs`
            ) : (
              'Completa tus datos'
            )}
          </motion.button>
          <p className="nota booking-hint">
            No se cobra nada en la web. Te confirmamos por WhatsApp.
          </p>
        </aside>
      </div>
    </div>
  )
}

const cards = SUCURSALES.map((s) => ({
  id: s.id,
  title: s.nombre,
  description: s.linea,
  mapaQuery: s.mapaQuery,
  ctaText: `Reservar en ${s.nombre}`,
}))

export function ExpandableCardDemo({ seleccion, precio, onReserve }) {
  const [active, setActive] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const ref = useRef(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setActive(null)
        setShowBooking(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [active])

  useOutsideClick(ref, () => {
    setActive(null)
    setShowBooking(false)
  })

  const sucursal = SUCURSALES.find((s) => s.id === active?.id)

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="expandable-overlay"
            onClick={() => { setActive(null); setShowBooking(false) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && sucursal && (
          <div className="expandable-modal-wrapper">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="expandable-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title}, reserva de cita`}
            >
              <motion.button
                layout
                className="expandable-close"
                onClick={() => { setActive(null); setShowBooking(false) }}
              >
                <CloseIcon />
              </motion.button>

              <motion.div layoutId={`image-${active.title}-${id}`}>
                <MapaSucursal sucursal={sucursal} modal />
              </motion.div>

              <div className="expandable-body">
                <div className="expandable-header">
                  <div>
                    <motion.h3 layoutId={`title-${active.title}-${id}`}>
                      {active.title}
                    </motion.h3>
                    <motion.p>{active.description}</motion.p>
                  </div>
                </div>

                {!showBooking ? (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="expandable-scroll"
                  >
                    <div className="expandable-content">
                      <p>{sucursal.linea}</p>
                      <div className="expandable-info">
                        <div className="expandable-row">
                          <span className="expandable-label">Teléfono</span>
                          <span className="expandable-value">{sucursal.telefono}</span>
                        </div>
                        <div className="expandable-row">
                          <span className="expandable-label">Horario</span>
                          <span className="expandable-value">{sucursal.horarioTexto}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="expandable-scroll expandable-scroll-reserva"
                  >
                    <BookingFlow
                      sucursal={sucursal}
                      seleccion={seleccion}
                      precio={precio}
                    />
                  </motion.div>
                )}

                {!showBooking && (
                  <button
                    className="expandable-reserve-btn"
                    onClick={() => {
                      medir('reserva_iniciada', { salon: sucursal.nombre })
                      setShowBooking(true)
                    }}
                  >
                    {active.ctaText}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="expandable-grid">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => {
              medir('ver_salon', { salon: card.title })
              setActive(card)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                medir('ver_salon', { salon: card.title })
                setActive(card)
              }
            }}
            className="expandable-card"
            role="button"
            tabIndex={0}
            aria-label={`Ver ${card.title}`}
          >
            <div className="expandable-card-inner">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <MapaSucursal sucursal={card} />
              </motion.div>
              <div className="expandable-card-text">
                <motion.h3 layoutId={`title-${card.title}-${id}`}>
                  {card.title}
                </motion.h3>
                <motion.p>{card.description}</motion.p>
              </div>
              <motion.div className="expandable-card-btn">
                {card.ctaText}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import Encabezado from '../components/Encabezado.jsx'
import Portada from '../components/Portada.jsx'
import Servicios from '../components/Servicios.jsx'
import Calculadora from '../components/Calculadora.jsx'
import { ExpandableCardDemo } from '../components/ExpandableCard.jsx'
import Preguntas from '../components/Preguntas.jsx'
import Legal from '../components/Legal.jsx'
import Pie from '../components/Pie.jsx'
import AccionesFlotantes from '../components/AccionesFlotantes.jsx'
import { DISENOS, FORMAS, SERVICIOS } from '../data.js'
import { medir } from '../lib/analytics.js'
import { useSEO } from '../lib/seo.js'
import { calcularPrecio, largoEnUnidades, posDesdeUnidades, tramoLargo } from '../lib/precio.js'

const INICIAL = {
  servicioId: 'manicura-classic',
  formaId: 'almendra',
  largoPos: posDesdeUnidades(9),
  disenoId: 'french',
  retiro: false,
}

const irA = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Inicio() {
  const [seleccion, setSeleccion] = useState(INICIAL)

  useSEO({
    titulo: 'Girlys · Manicura y pedicura en Sucre',
    descripcion:
      'Calcula el precio de tu manicura o pedicura, elige forma, largo y diseño, y reserva en nuestros tres salones de Sucre.',
    ruta: '/',
    imagen: '/og-girlys.jpg',
  })

  const derivada = useMemo(() => {
    const unidades = largoEnUnidades(seleccion.largoPos)
    return {
      servicioId: seleccion.servicioId,
      formaId: seleccion.formaId,
      largoPos: seleccion.largoPos,
      disenoId: seleccion.disenoId,
      retiro: seleccion.retiro,
      servicio: SERVICIOS.find((s) => s.id === seleccion.servicioId) ?? SERVICIOS[0],
      forma: FORMAS.find((f) => f.id === seleccion.formaId) ?? FORMAS[0],
      largo: tramoLargo(unidades),
      diseno: DISENOS.find((d) => d.id === seleccion.disenoId) ?? DISENOS[0],
      unidades,
    }
  }, [seleccion])

  const precio = useMemo(
    () =>
      calcularPrecio({
        servicio: derivada.servicio,
        forma: derivada.forma,
        largo: derivada.largo,
        diseno: derivada.diseno,
        retiro: seleccion.retiro,
      }),
    [derivada, seleccion.retiro],
  )

  // Una cotización se mide cuando la persona deja de mover los controles,
  // no en cada píxel del deslizador. Sin datos personales.
  useEffect(() => {
    const t = setTimeout(() => {
      medir('cotizacion', {
        servicio: derivada.servicio.nombre,
        forma: derivada.forma.nombre,
        largo: derivada.largo.nombre,
        diseno: derivada.diseno.nombre,
        total: precio.total,
      })
    }, 1000)
    return () => clearTimeout(t)
  }, [derivada, precio])

  const alCambiar = useCallback((cambio) => setSeleccion((s) => ({ ...s, ...cambio })), [])

  const elegirServicio = useCallback((id) => {
    medir('elegir_servicio', {
      servicio: SERVICIOS.find((s) => s.id === id)?.nombre ?? id,
      origen: 'lista_de_precios',
    })
    setSeleccion((s) => ({ ...s, servicioId: id }))
    irA('calculadora')
  }, [])

  const alReservar = useCallback(() => {
    medir('clic_reservar', {
      servicio: derivada.servicio.nombre,
      forma: derivada.forma.nombre,
      largo: derivada.largo.nombre,
      diseno: derivada.diseno.nombre,
      total: precio.total,
    })
    irA('sucursales')
  }, [derivada, precio])

  return (
    <>
      <Encabezado />
      <main id="site-content">
        <Portada />
        <Servicios onElegir={elegirServicio} />
        <Calculadora
          seleccion={derivada}
          alCambiar={alCambiar}
          precio={precio}
          alReservar={alReservar}
        />
        <section className="seccion t-sucursales" id="sucursales">
          <div className="contenido">
            <header className="encabezado-seccion">
              <span className="numeral">03</span>
              <h2 className="titulo-seccion titular">Dónde te atendemos</h2>
              <p className="rotulo-seccion">Elige el salón que te queda más cerca</p>
            </header>
            <ExpandableCardDemo
              seleccion={derivada}
              precio={precio}
            />
          </div>
        </section>
        <Preguntas />
        <Legal />
      </main>
      <Pie />
      <AccionesFlotantes seleccion={derivada} precio={precio} />
    </>
  )
}

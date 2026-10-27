import { useEffect, useState } from 'react'

const ENLACES = [
  { href: '#servicios', texto: 'Servicios' },
  { href: '#calculadora', texto: 'Calculadora' },
  { href: '#sucursales', texto: 'Salones' },
  { href: '#preguntas', texto: 'Preguntas' },
]

export default function Encabezado() {
  const [fijo, setFijo] = useState(false)

  useEffect(() => {
    const alScroll = () => setFijo(window.scrollY > 24)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  return (
    <header className={`barra ${fijo ? 'barra-fija' : ''}`}>
      <div className="contenido barra-int">
        <a href="#portada" className="marca">
          <span className="marca-nombre">Girlys</span>
          <span className="marca-sub">manicura y pedicura</span>
        </a>

        <nav className="nav" aria-label="Principal">
          {ENLACES.map((e) => (
            <a key={e.href} href={e.href} className="nav-enlace">
              {e.texto}
            </a>
          ))}
        </nav>

        <a href="#sucursales" className="btn btn-firme barra-cta">
          Reservar
        </a>
      </div>
    </header>
  )
}
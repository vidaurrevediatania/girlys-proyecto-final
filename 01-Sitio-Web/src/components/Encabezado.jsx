import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ENLACES = [
  { hash: '#servicios', texto: 'Servicios' },
  { hash: '#calculadora', texto: 'Calculadora' },
  { hash: '#sucursales', texto: 'Salones' },
  { hash: '#preguntas', texto: 'Preguntas' },
]

export default function Encabezado() {
  const [fijo, setFijo] = useState(false)
  const { pathname } = useLocation()
  const esInicio = pathname === '/'

  useEffect(() => {
    const alScroll = () => setFijo(window.scrollY > 24)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  return (
    <header className={`barra ${fijo ? 'barra-fija' : ''}`}>
      <div className="contenido barra-int">
        <Link to={esInicio ? '#portada' : '/'} className="marca">
          <span className="marca-nombre">Girlys</span>
          <span className="marca-sub">manicura</span>
        </Link>

        <nav className="nav" aria-label="Principal">
          {ENLACES.map((e) => (
            <Link
              key={e.hash}
              to={esInicio ? e.hash : `/${e.hash}`}
              className="nav-enlace"
            >
              {e.texto}
            </Link>
          ))}
          <Link to="/blog" className="nav-enlace nav-blog">
            Blog
          </Link>
        </nav>

        <Link to={esInicio ? '#sucursales' : '/#sucursales'} className="btn btn-firme barra-cta">
          Reservar
        </Link>
      </div>
    </header>
  )
}

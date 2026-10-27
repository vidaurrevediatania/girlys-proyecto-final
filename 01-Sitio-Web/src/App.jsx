import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AvisoAnalitica from './components/AvisoAnalitica.jsx'
import Inicio from './pages/Inicio.jsx'
import Blog from './pages/Blog.jsx'
import Entrada from './pages/Entrada.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

/** Al cambiar de ruta, vuelve arriba o salta al ancla pedida. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const temporizador = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
      return () => clearTimeout(temporizador)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Entrada />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <AvisoAnalitica />
    </>
  )
}

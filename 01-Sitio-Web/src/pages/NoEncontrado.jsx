import { Link } from 'react-router-dom'
import Encabezado from '../components/Encabezado.jsx'
import Pie from '../components/Pie.jsx'
import { ENTRADAS } from '../content/blog.js'
import { useSEO } from '../lib/seo.js'

export default function NoEncontrado() {
  useSEO({
    titulo: 'Página no encontrada · Girlys',
    descripcion: 'La página que buscas no existe o cambió de dirección.',
    ruta: '/404',
    noindex: true,
  })

  return (
    <div className="pagina-blog">
      <Encabezado />

      <main id="site-content">
        <section className="seccion t-portada pagina-404">
          <div className="contenido pagina-404-int">
            <p className="etiqueta">Error 404</p>
            <p className="titular pagina-404-numero">404</p>
            <h1 className="titular pagina-404-titulo">Esta página no existe.</h1>
            <p className="rotulo-seccion pagina-404-rotulo">
              Puede que el enlace esté mal escrito o que la entrada haya cambiado de
              dirección. Te dejamos los caminos que sí funcionan.
            </p>

            <div className="pagina-404-acciones">
              <Link to="/" className="btn btn-firme">
                Ir al sitio principal
              </Link>
              <Link to="/blog" className="btn btn-linea">
                Ver el blog
              </Link>
            </div>

            <div className="pagina-404-sugerencias">
              <p className="etiqueta">Entradas disponibles</p>
              <ul>
                {ENTRADAS.map((entrada) => (
                  <li key={entrada.slug}>
                    <Link to={`/blog/${entrada.slug}`} className="serif">
                      {entrada.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Pie />
    </div>
  )
}

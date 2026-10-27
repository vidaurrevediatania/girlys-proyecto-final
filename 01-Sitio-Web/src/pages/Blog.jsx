import { useState } from 'react'
import { Link } from 'react-router-dom'
import Encabezado from '../components/Encabezado.jsx'
import Pie from '../components/Pie.jsx'
import { CATEGORIAS, ENTRADAS } from '../content/blog.js'
import { useSEO, urlAbsoluta } from '../lib/seo.js'

const TODAS = 'Todas'

export default function Blog() {
  const [categoria, setCategoria] = useState(TODAS)
  const visibles =
    categoria === TODAS ? ENTRADAS : ENTRADAS.filter((e) => e.categoria === categoria)
  const [destacada, ...resto] = visibles

  useSEO({
    titulo: 'Blog de Girlys · Manicura y cuidado de uñas en Santa Cruz',
    descripcion:
      'Consejos de manicura, tendencias y precios claros. Lo que aprendemos en el salón, escrito para que tu esmaltado dure más.',
    ruta: '/blog',
    imagen: '/blog/portada-blog.webp',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog de Girlys',
      description:
        'Consejos de manicura, tendencias y precios claros en Santa Cruz de la Sierra.',
      url: urlAbsoluta('/blog'),
      inLanguage: 'es-BO',
      publisher: {
        '@type': 'Organization',
        name: 'Girlys',
        url: urlAbsoluta('/'),
      },
      blogPost: ENTRADAS.map((e) => ({
        '@type': 'BlogPosting',
        headline: e.titulo,
        description: e.descripcion,
        datePublished: e.fecha,
        url: urlAbsoluta(`/blog/${e.slug}`),
        image: urlAbsoluta(e.imagen),
      })),
    },
  })

  return (
    <div className="pagina-blog">
      <Encabezado />

      <main id="site-content">
        <section className="seccion t-portada blog-hero">
          <div className="contenido blog-hero-int">
            <div className="blog-hero-texto">
              <p className="etiqueta">Blog · Girlys</p>
              <h1 className="titular blog-h1">
                Consejos para tu manicura,
                <span className="blog-h1-linea">sin vueltas.</span>
              </h1>
              <p className="rotulo-seccion blog-hero-rotulo">
                Cuidado, tendencias y precios claros. Lo que aprendemos en el salón,
                escrito para que tu esmaltado dure más y no te sorprenda la cuenta.
              </p>
              <div className="blog-hero-acciones">
                <a href="#entradas" className="btn btn-firme">
                  Ver las entradas
                </a>
                <Link to="/#calculadora" className="btn btn-linea">
                  Calcular mi precio
                </Link>
              </div>
            </div>

            <figure className="blog-hero-foto">
              <img
                src="/blog/portada-blog.webp"
                alt="Detalle de una manicura con diseño nude"
                width="800"
                height="1000"
              />
              <figcaption className="nota">Trabajo real del salón · diseño nude</figcaption>
            </figure>
          </div>
        </section>

        <section className="seccion t-servicios blog-lista" id="entradas">
          <div className="contenido">
            <header className="encabezado-seccion blog-lista-cabecera">
              <span className="numeral">01</span>
              <h2 className="titulo-seccion titular">Últimas entradas</h2>
              <p className="rotulo-seccion">
                Tres lecturas cortas para llegar mejor preparada a tu cita
              </p>
            </header>

            <div className="blog-filtros" role="group" aria-label="Filtrar por categoría">
              {[TODAS, ...CATEGORIAS].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`blog-filtro ${categoria === c ? 'blog-filtro-activo' : ''}`}
                  aria-pressed={categoria === c}
                  onClick={() => setCategoria(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {destacada && (
              <article className="blog-destacada">
                <Link
                  to={`/blog/${destacada.slug}`}
                  className="blog-destacada-foto"
                  aria-label={`Leer ${destacada.titulo}`}
                >
                  <img
                    src={destacada.imagen}
                    alt={destacada.imagenAlt}
                    width="800"
                    height="800"
                    loading="lazy"
                  />
                </Link>

                <div className="blog-destacada-texto">
                  <p className="etiqueta">
                    {destacada.categoria} · {destacada.minutos} min de lectura
                  </p>
                  <h3 className="titular blog-destacada-titulo">
                    <Link to={`/blog/${destacada.slug}`}>{destacada.titulo}</Link>
                  </h3>
                  <p className="apunte blog-destacada-descripcion">
                    {destacada.descripcion}
                  </p>
                  <p className="nota">Publicado el {destacada.fechaLarga}</p>
                  <Link to={`/blog/${destacada.slug}`} className="btn btn-firme">
                    Leer la entrada
                  </Link>
                </div>
              </article>
            )}

            {resto.length > 0 ? (
              <div className="blog-rejilla">
                {resto.map((entrada) => (
                  <article className="blog-card" key={entrada.slug}>
                    <Link
                      to={`/blog/${entrada.slug}`}
                      className="blog-card-foto"
                      aria-label={`Leer ${entrada.titulo}`}
                    >
                      <img
                        src={entrada.imagen}
                        alt={entrada.imagenAlt}
                        width="800"
                        height="600"
                        loading="lazy"
                      />
                    </Link>
                    <p className="etiqueta">
                      {entrada.categoria} · {entrada.minutos} min
                    </p>
                    <h3 className="serif blog-card-titulo">
                      <Link to={`/blog/${entrada.slug}`}>{entrada.titulo}</Link>
                    </h3>
                    <p className="apunte">{entrada.descripcion}</p>
                    <p className="nota">{entrada.fechaLarga}</p>
                    <Link to={`/blog/${entrada.slug}`} className="blog-mas">
                      Leer la entrada <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="apunte blog-vacio">
                No hay entradas en esta categoría todavía. Prueba con «Todas».
              </p>
            )}

            <div className="blog-cta">
              <div>
                <p className="etiqueta">Antes de reservar</p>
                <p className="titular blog-cta-titulo">
                  ¿Cuánto sale tu combinación?
                </p>
                <p className="apunte">
                  Elige servicio, forma, largo y diseño. La calculadora muestra el total
                  y el anticipo del 50 % antes de escribirnos.
                </p>
              </div>
              <Link to="/#calculadora" className="btn btn-firme">
                Calcular mi precio
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Pie />
    </div>
  )
}

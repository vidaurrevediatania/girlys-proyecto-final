import { Link, useParams } from 'react-router-dom'
import Encabezado from '../components/Encabezado.jsx'
import Pie from '../components/Pie.jsx'
import NoEncontrado from './NoEncontrado.jsx'
import { buscarEntrada, relacionadas } from '../content/blog.js'
import { useSEO, urlAbsoluta } from '../lib/seo.js'

function VistaEntrada({ entrada }) {
  const otras = relacionadas(entrada)

  useSEO({
    titulo: `${entrada.titulo} · Blog de Girlys`,
    descripcion: entrada.descripcion,
    ruta: `/blog/${entrada.slug}`,
    imagen: entrada.imagen,
    tipo: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: entrada.titulo,
          description: entrada.descripcion,
          image: urlAbsoluta(entrada.imagen),
          datePublished: entrada.fecha,
          dateModified: entrada.fecha,
          inLanguage: 'es-BO',
          mainEntityOfPage: urlAbsoluta(`/blog/${entrada.slug}`),
          author: {
            '@type': 'Organization',
            name: 'Girlys',
            url: urlAbsoluta('/'),
          },
          publisher: {
            '@type': 'Organization',
            name: 'Girlys',
            url: urlAbsoluta('/'),
            logo: {
              '@type': 'ImageObject',
              url: urlAbsoluta('/favicon.svg'),
            },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: urlAbsoluta('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: urlAbsoluta('/blog'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: entrada.titulo,
              item: urlAbsoluta(`/blog/${entrada.slug}`),
            },
          ],
        },
      ],
    },
  })

  return (
    <div className="pagina-blog">
      <Encabezado />

      <main id="site-content">
        <article className="seccion t-portada blog-articulo">
          <div className="contenido blog-articulo-int">
            <nav className="blog-migas" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link to="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span>{entrada.categoria}</span>
            </nav>

            <header className="blog-articulo-cabecera">
              <p className="etiqueta">
                {entrada.categoria} · {entrada.fechaLarga} · {entrada.minutos} min de lectura
              </p>
              <h1 className="titular blog-articulo-h1">{entrada.titulo}</h1>
              <p className="rotulo-seccion blog-articulo-rotulo">{entrada.descripcion}</p>
            </header>

            <figure className="blog-articulo-figura">
              <img
                src={entrada.imagen}
                alt={entrada.imagenAlt}
                width="1200"
                height="800"
              />
              <figcaption className="nota">Girlys · Sucre</figcaption>
            </figure>

            {/* Contenido propio, versionado en el repositorio. No viene de usuarios. */}
            <div
              className="blog-cuerpo"
              dangerouslySetInnerHTML={{ __html: entrada.html }}
            />

            <div className="blog-firma">
              <p className="etiqueta">Escrito por</p>
              <p className="serif blog-firma-nombre">Equipo de Girlys</p>
              <p className="apunte">
                Manicura y pedicura con precio cerrado en Sucre.
                Escribimos lo que aplicamos en el salón, sin promesas que no podamos cumplir.
              </p>
            </div>

            <aside className="blog-caja-cta">
              <div>
                <p className="etiqueta">Tu próxima cita</p>
                <p className="titular blog-caja-titulo">Calcula el precio antes de reservar</p>
                <p className="apunte">
                  Elige servicio, forma, largo y diseño. Ves el total y el anticipo del
                  50 % sin dejar tus datos.
                </p>
              </div>
              <Link to="/#calculadora" className="btn btn-firme">
                Ir a la calculadora
              </Link>
            </aside>
          </div>
        </article>

        {otras.length > 0 && (
          <section className="seccion t-servicios blog-relacionadas">
            <div className="contenido">
              <header className="encabezado-seccion">
                <span className="numeral">02</span>
                <h2 className="titulo-seccion titular">Sigue leyendo</h2>
                <p className="rotulo-seccion">Otras dudas que resolvemos seguido</p>
              </header>

              <div className="blog-rejilla">
                {otras.map((entradaOtra) => (
                  <article className="blog-card" key={entradaOtra.slug}>
                    <Link
                      to={`/blog/${entradaOtra.slug}`}
                      className="blog-card-foto"
                      aria-label={`Leer ${entradaOtra.titulo}`}
                    >
                      <img
                        src={entradaOtra.imagen}
                        alt={entradaOtra.imagenAlt}
                        width="800"
                        height="600"
                        loading="lazy"
                      />
                    </Link>
                    <p className="etiqueta">
                      {entradaOtra.categoria} · {entradaOtra.minutos} min
                    </p>
                    <h3 className="serif blog-card-titulo">
                      <Link to={`/blog/${entradaOtra.slug}`}>{entradaOtra.titulo}</Link>
                    </h3>
                    <p className="apunte">{entradaOtra.descripcion}</p>
                    <Link to={`/blog/${entradaOtra.slug}`} className="blog-mas">
                      Leer la entrada <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Pie />
    </div>
  )
}

export default function Entrada() {
  const { slug } = useParams()
  const entrada = buscarEntrada(slug)

  if (!entrada) return <NoEncontrado />

  return <VistaEntrada entrada={entrada} key={entrada.slug} />
}

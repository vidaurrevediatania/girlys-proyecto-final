import { useMemo, useState } from 'react'
import { DISENOS, FORMAS, LARGOS, SERVICIOS, SUCURSALES } from '../data.js'

const SECCIONES = [
  { id: 'panel', etiqueta: 'Panel' },
  { id: 'servicios', etiqueta: 'Servicios' },
  { id: 'sucursales', etiqueta: 'Sucursales' },
  { id: 'blog', etiqueta: 'Blog' },
  { id: 'config', etiqueta: 'Configuración' },
]

export default function Admin() {
  const [seccion, setSeccion] = useState('panel')
  const [servicios, setServicios] = useState(SERVICIOS)
  const [sucursales, setSucursales] = useState(SUCURSALES)
  const [mensaje, setMensaje] = useState('')

  const totalServicios = servicios.length
  const totalSucursales = sucursales.length

  const guardarDemo = (texto) => {
    setMensaje(texto)
    window.setTimeout(() => setMensaje(''), 2400)
  }

  const cambiarServicio = (id, campo, valor) => {
    setServicios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [campo]: valor } : s)),
    )
  }

  const cambiarSucursal = (id, campo, valor) => {
    setSucursales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [campo]: valor } : s)),
    )
  }

  const htmlServicios = useMemo(
    () => servicios.map((s) => `${s.nombre} — ${s.precio} Bs`).join(', '),
    [servicios],
  )

  return (
    <div className="admin">
      <aside className="admin-lateral">
        <div className="admin-marca">
          <span className="serif admin-logo">Girlys</span>
          <span className="admin-sub">Panel de gestión (demo)</span>
        </div>
        <nav className="admin-nav">
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              className={`admin-nav-btn${seccion === s.id ? ' activo' : ''}`}
              onClick={() => setSeccion(s.id)}
            >
              {s.etiqueta}
            </button>
          ))}
        </nav>
        <p className="nota admin-aviso">
          Demostración: los cambios se guardan solo en memoria y no se publican.
        </p>
      </aside>

      <main className="admin-principal">
        <header className="admin-cabecera">
          <h1 className="titulo-seccion titular">
            {SECCIONES.find((s) => s.id === seccion)?.etiqueta}
          </h1>
          {mensaje && <span className="admin-mensaje">{mensaje}</span>}
        </header>

        {seccion === 'panel' && (
          <div className="admin-panel">
            <div className="admin-tarjetas">
              <article className="admin-tarjeta">
                <p className="etiqueta">Servicios</p>
                <p className="serif admin-cifra">{totalServicios}</p>
              </article>
              <article className="admin-tarjeta">
                <p className="etiqueta">Sucursales</p>
                <p className="serif admin-cifra">{totalSucursales}</p>
              </article>
              <article className="admin-tarjeta">
                <p className="etiqueta">Formas / largos / diseños</p>
                <p className="serif admin-cifra">
                  {FORMAS.length} / {LARGOS.length} / {DISENOS.length}
                </p>
              </article>
            </div>
            <p className="apunte">
              Este panel es una demostración gráfica de gestión de contenido. En producción,
              los datos se editan en <code>src/data.js</code> y los artículos en
              <code>src/content/blog/</code>, luego se suben a GitHub y Vercel publica.
            </p>
          </div>
        )}

        {seccion === 'servicios' && (
          <div className="admin-bloque">
            <div className="admin-lista">
              {servicios.map((s) => (
                <article key={s.id} className="admin-fila">
                  <label className="admin-campo">
                    <span className="etiqueta">Nombre</span>
                    <input
                      className="campo"
                      value={s.nombre}
                      onChange={(e) => cambiarServicio(s.id, 'nombre', e.target.value)}
                    />
                  </label>
                  <label className="admin-campo">
                    <span className="etiqueta">Zona</span>
                    <input
                      className="campo"
                      value={s.zona}
                      onChange={(e) => cambiarServicio(s.id, 'zona', e.target.value)}
                    />
                  </label>
                  <label className="admin-campo admin-campo-chico">
                    <span className="etiqueta">Precio (Bs)</span>
                    <input
                      className="campo"
                      type="number"
                      value={s.precio}
                      onChange={(e) =>
                        cambiarServicio(s.id, 'precio', Number(e.target.value) || 0)
                      }
                    />
                  </label>
                  <label className="admin-campo admin-campo-chico">
                    <span className="etiqueta">Duración (min)</span>
                    <input
                      className="campo"
                      type="number"
                      value={s.duracion}
                      onChange={(e) =>
                        cambiarServicio(s.id, 'duracion', Number(e.target.value) || 0)
                      }
                    />
                  </label>
                  <label className="admin-campo admin-campo-ancho">
                    <span className="etiqueta">Resumen</span>
                    <input
                      className="campo"
                      value={s.resumen}
                      onChange={(e) => cambiarServicio(s.id, 'resumen', e.target.value)}
                    />
                  </label>
                </article>
              ))}
            </div>
            <div className="admin-acciones">
              <button
                className="btn btn-firme"
                onClick={() => guardarDemo('Cambios guardados (demo)')}
              >
                Guardar
              </button>
              <p className="nota">{htmlServicios}</p>
            </div>
          </div>
        )}

        {seccion === 'sucursales' && (
          <div className="admin-bloque">
            <div className="admin-lista">
              {sucursales.map((s) => (
                <article key={s.id} className="admin-fila">
                  <label className="admin-campo">
                    <span className="etiqueta">Nombre</span>
                    <input
                      className="campo"
                      value={s.nombre}
                      onChange={(e) => cambiarSucursal(s.id, 'nombre', e.target.value)}
                    />
                  </label>
                  <label className="admin-campo">
                    <span className="etiqueta">Dirección</span>
                    <input
                      className="campo"
                      value={s.calle}
                      onChange={(e) => cambiarSucursal(s.id, 'calle', e.target.value)}
                    />
                  </label>
                  <label className="admin-campo">
                    <span className="etiqueta">Zona</span>
                    <input
                      className="campo"
                      value={s.zona}
                      onChange={(e) => cambiarSucursal(s.id, 'zona', e.target.value)}
                    />
                  </label>
                  <label className="admin-campo">
                    <span className="etiqueta">Teléfono</span>
                    <input
                      className="campo"
                      value={s.telefono}
                      onChange={(e) => cambiarSucursal(s.id, 'telefono', e.target.value)}
                    />
                  </label>
                  <label className="admin-campo admin-campo-ancho">
                    <span className="etiqueta">Nota</span>
                    <input
                      className="campo"
                      value={s.nota}
                      onChange={(e) => cambiarSucursal(s.id, 'nota', e.target.value)}
                    />
                  </label>
                </article>
              ))}
            </div>
            <div className="admin-acciones">
              <button
                className="btn btn-firme"
                onClick={() => guardarDemo('Cambios guardados (demo)')}
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {seccion === 'blog' && (
          <div className="admin-bloque">
            <p className="apunte">
              Los artículos se escriben en Markdown en <code>src/content/blog/</code>. Acá se
              listan los disponibles en el sitio:
            </p>
            <ul className="admin-lista-simple">
              <li>precio-manicura-esculpida.md</li>
              <li>cuidado-semipermanente.md</li>
              <li>francesa-clasica.md</li>
            </ul>
            <p className="nota">
              Editor visual no incluido: se edita el archivo Markdown y se vuelve a publicar.
            </p>
          </div>
        )}

        {seccion === 'config' && (
          <div className="admin-bloque">
            <div className="admin-lista">
              <article className="admin-fila">
                <label className="admin-campo admin-campo-ancho">
                  <span className="etiqueta">Nombre del negocio</span>
                  <input className="campo" defaultValue="Girlys" />
                </label>
                <label className="admin-campo admin-campo-ancho">
                  <span className="etiqueta">Eslogan</span>
                  <input className="campo" defaultValue="Manicura con precio cerrado" />
                </label>
                <label className="admin-campo admin-campo-ancho">
                  <span className="etiqueta">WhatsApp (internacional, solo números)</span>
                  <input className="campo" defaultValue="59163396452" />
                </label>
                <label className="admin-campo admin-campo-ancho">
                  <span className="etiqueta">ID de Google Analytics</span>
                  <input className="campo" defaultValue="G-ZMHXH6EH9Y" />
                </label>
              </article>
            </div>
            <div className="admin-acciones">
              <button
                className="btn btn-firme"
                onClick={() => guardarDemo('Configuración guardada (demo)')}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

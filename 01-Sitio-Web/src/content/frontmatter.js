/**
 * Lector mínimo de frontmatter (el bloque entre --- del inicio del archivo).
 * No usa dependencias: así el mismo archivo sirve en Vite y en los scripts
 * de Node que generan el sitemap.
 */
export function parsearFrontmatter(texto) {
  const limpio = String(texto || '')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')

  const coincidencia = limpio.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!coincidencia) return { datos: {}, cuerpo: limpio.trim() }

  const datos = {}
  for (const linea of coincidencia[1].split('\n')) {
    const corte = linea.indexOf(':')
    if (corte <= 0) continue
    const clave = linea.slice(0, corte).trim()
    let valor = linea.slice(corte + 1).trim()
    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1)
    }
    datos[clave] = valor
  }

  return { datos, cuerpo: coincidencia[2].trim() }
}

import { useEffect, useRef } from 'react'

/**
 * Entrada suave al montar, con escalonado.
 * A propósito NO usa IntersectionObserver: con scroll rápido el observer
 * puede perder el evento y dejar bloques invisibles para siempre, que es
 * peor que no animar. Aquí el bloque siempre aparece.
 */
export default function Revelar({ delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return
    nodo.style.transitionDelay = `${delay}ms`
    const t = requestAnimationFrame(() => nodo.classList.add('visible'))
    return () => cancelAnimationFrame(t)
  }, [delay])

  return (
    <div ref={ref} className={`revelar ${className}`} {...rest}>
      {children}
    </div>
  )
}
import { useEffect, useState } from 'react'
import {
  analiticaDisponible,
  guardarPreferenciaAnalitica,
  preferenciaAnalitica,
} from '../lib/analytics.js'

/**
 * Aviso discreto de analítica. Solo aparece si hay un ID de GA configurado
 * y la persona todavía no eligió. Si dice que no, no se carga Google
 * Analytics en absoluto.
 */
export default function AvisoAnalitica() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (analiticaDisponible() && preferenciaAnalitica() === null) setVisible(true)
  }, [])

  if (!visible) return null

  const elegir = (valor) => {
    guardarPreferenciaAnalitica(valor)
    setVisible(false)
  }

  return (
    <aside className="aviso-analitica" role="region" aria-label="Aviso de analítica">
      <p className="apunte">
        Usamos Google Analytics para saber qué partes de la página sirven. No
        guardamos tu nombre ni tu teléfono.
      </p>
      <div className="aviso-analitica-acciones">
        <button className="btn btn-firme" onClick={() => elegir('si')}>
          Aceptar
        </button>
        <button className="btn btn-linea" onClick={() => elegir('no')}>
          No, gracias
        </button>
      </div>
    </aside>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { iniciarSiAcepto } from './lib/analytics.js'
import './styles/app.css'
import './styles/piezas.css'

// si la persona ya aceptó la analítica en una visita anterior, se carga ahora
iniciarSiAcepto()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { iniciarSiAcepto } from './lib/analytics.js'
import './styles/app.css'
import './styles/piezas.css'
import './styles/blog.css'

// si la persona ya aceptó la analítica en una visita anterior, se carga ahora
iniciarSiAcepto()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BuscarProyecto } from './Modules/BucarProyecto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BuscarProyecto/>
  </StrictMode>,
)

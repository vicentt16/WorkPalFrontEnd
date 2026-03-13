import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectUpperBar } from './Modules/ProjectUpperBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectUpperBar />
    <App />
  </StrictMode>,
)

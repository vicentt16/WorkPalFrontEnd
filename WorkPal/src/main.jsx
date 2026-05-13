/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectUpperBar } from './Modules/ProjectUpperBar.jsx';
import { RegisterModule } from './Modules/RegisterModule.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectUpperBar />
    
    <RegisterModule/>
    <App />
  </StrictMode>,
)*/
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterUser from "./Pages/RegisterUser";
import "./index.css";
import { RegisterModule } from "./Modules/RegisterModule";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RegisterModule/>
  </React.StrictMode>
);
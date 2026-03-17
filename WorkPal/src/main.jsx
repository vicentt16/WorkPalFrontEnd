/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectUpperBar } from './Modules/ProjectUpperBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectUpperBar />
    <App />
  </StrictMode>,
)*/
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterUser from "./Pages/RegisterUser";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RegisterUser />
  </React.StrictMode>
);
import React from "react";
import "./ProjectUpperBar.css";

export function ProjectUpperBar() {
  return (
    <header className="upper-bar">
      <img src="\src\Images\logoWorkPal.png" alt="WorkPal Logo" className="logoWorkPal"/>

      <div className="upper-bar-buttons">
        <button>
          <img src="\src\Images\searchIcon.png" alt="Search Icon" />
          <h2>Buscar</h2>
        </button>

        <button>
          <img src="\src\Images\createIcon.png" alt="Create Icon" />
          <h2>Crear Proyecto</h2>
        </button>

        <button className="register-button">
          <img src="\src\Images\registerIcon.png" alt="Register Icon" />
          <h2>Registrarse</h2>
        </button>
      </div>
    </header>
  );
}

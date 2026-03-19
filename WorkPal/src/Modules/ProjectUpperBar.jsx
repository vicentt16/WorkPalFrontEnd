import React from "react";
import "./ProjectUpperBar.css";

import logoWorkPal from "/src/Images/logoWorkPal.png";
import searchIcon from "/src/Images/searchIcon.png";
import createIcon from "/src/Images/createIcon.png";
import registerIcon from "/src/Images/registerIcon.png";

export function ProjectUpperBar() {
  return (
    <header className="upper-bar">
      <img src={logoWorkPal} alt="WorkPal Logo" className="logoWorkPal"/>

      <div className="upper-bar-buttons">
        <button>
          <img src={searchIcon} alt="Search Icon" />
          <h2>Buscar</h2>
        </button>

        <button>
          <img src={createIcon} alt="Create Icon" />
          <h2>Crear Proyecto</h2>
        </button>

        <button className="register-button">
          <img src={registerIcon} alt="Register Icon" />
          <h2>Registrarse</h2>
        </button>
      </div>
    </header>
  );
}

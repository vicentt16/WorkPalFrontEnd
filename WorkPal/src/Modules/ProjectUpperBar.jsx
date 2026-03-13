import React from "react";
import "./ProjectUpperBar.css";

export function ProjectUpperBar() {
  return (
    <header className="upper-bar">
      <img src="" alt="WorkPal Logo" />

      <>
        <button>
          <img src="" alt="Search Icon" />
          <h2>Buscar</h2>
        </button>

        <button>
          <img src="" alt="Create Icon" />
          <h2>Crear Proyecto</h2>
        </button>

        <button>
          <img src="" alt="Register Icon" />
          <h2>Registrarse</h2>
        </button>
      </>
    </header>
  );
}

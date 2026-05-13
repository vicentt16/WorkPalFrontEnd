import { useNavigate, useLocation } from "react-router-dom";

import "./Navbar.css";

// IMPORTA AQUÍ TU LOGO
// import logoWorkPal from "../../Images/logoWorkPal.png";

export default function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const currentUser = JSON.parse(
    localStorage.getItem("workpal_user")
  );

  const handleLogout = () => {
    localStorage.removeItem("workpal_user");

    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      {/* LOGO */}
      <div
        className="navbar-logo-container"
        onClick={() => navigate("/home")}
      >
        {/* 
        <img
          src={logoWorkPal}
          alt="WorkPal"
          className="navbar-logo"
        /> 
        */}

        <h1 className="navbar-title">WorkPal</h1>
      </div>

      {/* NAVIGATION */}
      <nav className="navbar-links">
        <button
          className={`navbar-link ${
            isActive("/home") ? "active" : ""
          }`}
          onClick={() => navigate("/home")}
        >
          Inicio
        </button>

        <button
          className={`navbar-link ${
            isActive("/search") ? "active" : ""
          }`}
          onClick={() => navigate("/search")}
        >
          Buscar Proyectos
        </button>

        <button
          className={`navbar-link ${
            isActive("/create-project")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/create-project")
          }
        >
          Crear Proyecto
        </button>
      </nav>

      {/* USER SECTION */}
      <div className="navbar-user-section">
        {currentUser ? (
          <>
            <div className="navbar-user-info">
              <div className="navbar-user-avatar">
                {currentUser.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <span>
                {currentUser.name}
              </span>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <button
            className="login-button-navbar"
            onClick={() => navigate("/")}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
}
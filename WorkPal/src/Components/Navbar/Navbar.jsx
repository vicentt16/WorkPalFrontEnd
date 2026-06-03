import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navbar.css";
import Logo1 from "../../Images/Logo1.png";

export default function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

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
        <img src={Logo1} alt="WorkPal Logo" className="navbar-logo-img" />
      </div>

      {/* NAV LINKS */}
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

        <button
          className={`navbar-link ${
            isActive("/manage-projects")
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/manage-projects")
          }
        >
          Proyectos
        </button>
      </nav>

      {/* USER */}
      <div className="navbar-user-section">
        {user ? (
          <>
            <div className="navbar-user-info">
              <div className="navbar-user-avatar">
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <span>{user.name}</span>
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
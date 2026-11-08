import { useNavigate } from "react-router-dom";
import logoWorkPal from "/src/Images/logoWorkPal.png";
import searchIcon from "/src/Images/searchIcon.png";
import createIcon from "/src/Images/createIcon.png";
import registerIcon from "/src/Images/registerIcon.png";
import "./ProjectUpperBar.css";

export function ProjectUpperBar() {
  const navigate = useNavigate();

  return (
    <header className="upper-bar-header">
      <div className="upper-bar">
        {/* LOGO */}
        <img
          src={logoWorkPal}
          alt="WorkPal Logo"
          className="logoWorkPal"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />

        {/* NAV BUTTONS */}
        <div className="upper-bar-buttons">
          <button
            className="upper-bar-button"
            onClick={() => navigate("/search")}
            type="button"
          >
            <img
              src={searchIcon}
              alt="Search Icon"
              className="upper-bar-icon"
            />

            <h2 className="upper-bar-title">
              Buscar
            </h2>
          </button>

          <button
            className="upper-bar-button"
            onClick={() =>
              navigate("/create-project")
            }
            type="button"
          >
            <img
              src={createIcon}
              alt="Create Icon"
              className="upper-bar-icon"
            />

            <h2 className="upper-bar-title">
              Crear Proyecto
            </h2>
          </button>

          <button
            className="upper-bar-button register-button"
            onClick={() =>
              navigate("/register")
            }
            type="button"
          >
            <img
              src={registerIcon}
              alt="Register Icon"
              className="upper-bar-icon"
            />

            <h2 className="upper-bar-title">
              Registrarse
            </h2>
          </button>
        </div>
      </div>
    </header>
  );
}
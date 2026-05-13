import { useNavigate } from "react-router-dom";

export function ProjectUpperBar() {
  const navigate = useNavigate();

  return (
    <header className="upper-bar">
      <img
        src={logoWorkPal}
        alt="logo"
        className="logoWorkPal"
        onClick={() => navigate("/home")}
      />

      <div className="upper-bar-buttons">
        <button onClick={() => navigate("/search")}>
          <img src={searchIcon} alt="search" />
          <h2>Buscar</h2>
        </button>

        <button onClick={() => navigate("/create-project")}>
          <img src={createIcon} alt="create" />
          <h2>Crear Proyecto</h2>
        </button>

        <button onClick={() => navigate("/")}>
          <img src={registerIcon} alt="login" />
          <h2>Login</h2>
        </button>
      </div>
    </header>
  );
}
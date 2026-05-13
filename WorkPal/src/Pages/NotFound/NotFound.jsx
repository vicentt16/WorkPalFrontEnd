import { useNavigate } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>

        <h2>Página no encontrada</h2>

        <p>
          La página que intentas visitar no existe o fue
          movida.
        </p>

        <button onClick={() => navigate("/home")}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
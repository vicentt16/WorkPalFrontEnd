import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { loginUser } from "../../Services/authService";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const response = await loginUser(formData.email, formData.password);

    if (response.success) {
      login(response.user);
      navigate("/home");
    } else {
      setErrorMessage(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Bienvenido a WorkPal</h1>

            <p>
              Inicia sesión para continuar
              colaborando en proyectos.
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <label>
                Correo Electrónico
              </label>

              <input
                type="email"
                name="email"
                placeholder="ejemplo@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>

              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Iniciar Sesión
            </button>

            <div className="register-link">
              <p>
                ¿No tienes cuenta?
                <Link to="/register">
                  {" "}
                  Crear Cuenta
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
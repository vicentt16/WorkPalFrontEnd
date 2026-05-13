import { useState } from "react";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("workpal_users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (!foundUser) {
      alert("Cuenta no encontrada");
      return;
    }

    login(foundUser);

    navigate("/home");
  };

  return (
    <div>
      <ProjectUpperBar />

      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Entrar</button>

          <p>
            ¿No tienes cuenta?
            <Link to="/register"> Registrarse</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
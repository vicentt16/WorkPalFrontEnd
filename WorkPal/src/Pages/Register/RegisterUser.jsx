import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { registerUser, loginUser, createAlumnoProfile } from "../../Services/authService";
import "./RegisterUser.css";

export default function RegisterUser() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    career: "",
    skills: "",
  });

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.career
    ) {
      setErrorMessage(
        "Todos los campos son obligatorios"
      );

      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setErrorMessage(
        "Las contraseñas no coinciden"
      );

      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage(
        "La contraseña debe tener mínimo 6 caracteres"
      );

      return;
    }

    const formattedSkills =
      formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

    try {
      // 1. Register basic user
      const regResponse = await registerUser({
        email: formData.email,
        password: formData.password,
      });

      if (!regResponse.success) {
        setErrorMessage(regResponse.message);
        return;
      }

      // 2. Login to get token for profile creation
      const loginResponse = await loginUser(formData.email, formData.password);
      if (!loginResponse.success) {
        setErrorMessage("Usuario creado, pero hubo un error al iniciar sesión automáticamente.");
        return;
      }

      // 3. Create alumno profile
      const profileResponse = await createAlumnoProfile({
        name: formData.name,
        lastName: formData.lastName,
        career: formData.career,
        skills: formattedSkills,
      });

      if (!profileResponse.success) {
        setErrorMessage("Usuario creado, pero hubo un error al crear el perfil: " + profileResponse.message);
        return;
      }

      // Update context with the full user + profile info
      const fullUser = { ...loginResponse.user, ...profileResponse.profile, skills: formattedSkills };
      login(fullUser);

      setSuccessMessage(
        "¡Cuenta y perfil creados correctamente! Redirigiendo..."
      );

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error inesperado durante el registro.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          {/* HEADER */}
          <div className="register-header">
            <h1>Crear Cuenta</h1>

            <p>
              Únete a WorkPal y comienza a
              colaborar en proyectos increíbles.
            </p>
          </div>

          {/* FORM */}
          <form
            className="register-form"
            onSubmit={handleSubmit}
          >
            {/* ROW */}
            <div className="form-row">
              <div className="input-group">
                <label>Nombre(s)</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Ángel Efrén"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Apellidos</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Rosado Santiago"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* EMAIL */}
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
              />
            </div>

            {/* CAREER */}
            <div className="input-group">
              <label>Carrera</label>

              <input
                type="text"
                name="career"
                placeholder="DTS"
                value={formData.career}
                onChange={handleChange}
              />
            </div>

            {/* SKILLS */}
            <div className="input-group">
              <label>
                Habilidades
              </label>

              <input
                type="text"
                name="skills"
                placeholder="React, UI/UX, Python..."
                value={formData.skills}
                onChange={handleChange}
              />

              <small>
                Separa las habilidades por
                comas.
              </small>
            </div>

            {/* PASSWORDS */}
            <div className="form-row">
              <div className="input-group">
                <label>Contraseña</label>

                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Confirmar Contraseña
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="******"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="register-button"
            >
              Crear Cuenta
            </button>

            {/* LOGIN */}
            <div className="login-link">
              <p>
                ¿Ya tienes cuenta?
                <Link to="/">
                  {" "}
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
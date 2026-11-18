import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import { registerUser, loginUser, createAlumnoProfile, createProfesorProfile, } from "../../Services/authService";
import "./RegisterUser.css";

export default function RegisterUser() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState("alumno");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    career: "",
    skills: "",
    department: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    setErrorMessage("");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setErrorMessage("");
    setSuccessMessage("");

    const {
      name,
      lastName,
      email,
      password,
      confirmPassword,
      career,
      department,
      image,
    } = formData;

    if (
      !name.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !image
    ) {
      setErrorMessage("Completa todos los campos obligatorios.");
      return;
    }

    if (selectedRole === "alumno" && !career.trim()) {
      setErrorMessage("Ingresa tu carrera.");
      return;
    }

    if (selectedRole === "profesor" && !department.trim()) {
      setErrorMessage("Ingresa tu departamento académico.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    setSubmitting(true);

    try {
      const registerResponse = await registerUser({
        email,
        password,
        role: selectedRole,
      });

      if (!registerResponse.success) {
        setErrorMessage(registerResponse.message);
        return;
      }

      const loginResponse = await loginUser(email, password);

      if (!loginResponse.success) {
        setErrorMessage(
          "Cuenta creada, pero no se pudo iniciar sesión: " +
          loginResponse.message
        );
        return;
      }

      const commonProfile = {
        name,
        lastName,
        image,
      };

      let profileResponse;

      if (selectedRole === "alumno") {
        profileResponse = await createAlumnoProfile({
          ...commonProfile,
          career,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        });
      } else {
        profileResponse = await createProfesorProfile({
          ...commonProfile,
          department,
        });
      }

      if (!profileResponse.success) {
        setErrorMessage(
          "Cuenta creada, pero hubo un error al crear el perfil: " +
          profileResponse.message
        );
        return;
      }

      const fullUser = {
        ...loginResponse.user,
        ...profileResponse.profile,
        role: selectedRole,
        id: loginResponse.user.id,
      };

      login(fullUser);

      setSuccessMessage("¡Cuenta creada correctamente!");

      navigate(
        selectedRole === "profesor"
          ? "/profesor/dashboard"
          : "/home",
        { replace: true }
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error durante el registro.");
    } finally {
      setSubmitting(false);
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

          <div className="role-selection">
            <h3>¿Cómo deseas registrarte?</h3>

            <div className="role-options">
              <button
                type="button"
                className={`role-option ${
                  selectedRole === "alumno" ? "selected" : ""
                }`}
                onClick={() => setSelectedRole("alumno")}
                aria-pressed={selectedRole === "alumno"}
              >
                <span className="role-icon">🎓</span>
                <strong>Alumno</strong>
                <small>Crear y colaborar en proyectos</small>
              </button>

              <button
                type="button"
                className={`role-option ${
                  selectedRole === "profesor" ? "selected" : ""
                }`}
                onClick={() => setSelectedRole("profesor")}
                aria-pressed={selectedRole === "profesor"}
              >
                <span className="role-icon">📚</span>
                <strong>Profesor</strong>
                <small>Supervisar proyectos y avances</small>
              </button>
            </div>
          </div>

            {/* PHOTO UPLOAD */}
            <div className="photo-upload-section">
              <div className="photo-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <div className="photo-placeholder">
                    <span>Foto</span>
                  </div>
                )}
              </div>
              <div className="photo-input">
                <label htmlFor="image-input" className="photo-label">
                  Seleccionar Foto de Perfil*
                </label>
                <input
                  id="image-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

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
            
            {selectedRole === "alumno" ? (
              <>
                <div className="input-group">
                  <label>Carrera</label>
                  <input
                    type="text"
                    name="career"
                    placeholder="DTS"
                    value={formData.career}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Habilidades</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Python, UI/UX..."
                    value={formData.skills}
                    onChange={handleChange}
                  />
                  <small>Separa las habilidades por comas.</small>
                </div>
              </>
            ) : (
              <div className="input-group">
                <label>Departamento o área académica</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Ingeniería y Tecnología"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

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

            <button
              type="submit"
              className="register-button"
              disabled={submitting}
            >
              {submitting ? "Creando cuenta..." : "Crear Cuenta"}
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
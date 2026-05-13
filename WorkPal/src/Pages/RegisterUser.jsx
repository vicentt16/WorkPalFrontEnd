import React, { useState } from "react";
import { ProjectUpperBar } from "../Modules/ProjectUpperBar";
import "./RegisterUser.css";

export default function RegisterUser() {

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    universidad: "",
    carrera: "",
    habilidades: "",
    foto: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      const file = files[0];
      setFormData({ ...formData, foto: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

    }
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Registro completo:", formData);
  };

  return (
    <div>
      <ProjectUpperBar />
      <div className="register-page">
        <div className="upper-panel">
          <div className="upper-panel-button">
            <p>Volver</p>
          </div>
          <div className="upper-panel-text">
            <h1>Crear Cuenta</h1>
            <p>Completa tu perfil para comenzar</p>
          </div>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Información Personal</h2>

          <label>Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <div className="row">
            <div className="input-group">
              <label>Correo electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Teléfono *</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h2>Seguridad</h2>

          <label>Contraseña *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirmar contraseña *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <h2>Información académica</h2>

          <label>Universidad</label>
          <input
            type="text"
            name="universidad"
            value={formData.universidad}
            onChange={handleChange}
          />

          <label>Carrera</label>
          <input
            type="text"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
          />

          <h2>Habilidades</h2>

          <label>Describe tus habilidades</label>
          <textarea
            name="habilidades"
            value={formData.habilidades}
            onChange={handleChange}
            rows="3"
          />

          <h2>Foto de perfil</h2>

          <div className="photo-section">
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
            />

            {preview && (
              <img src={preview} alt="preview" className="preview-img" />
            )}
          </div>

          <button className="submit-button" type="submit">
            Registrarse
          </button>

        </form>
      </div>
    </div>
  );
}
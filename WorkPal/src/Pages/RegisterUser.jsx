import React, { useState } from "react";
import "./RegisterUser.css";

export default function RegisterUser() {

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos del registro:", formData);
  };

  return (
    <div className="register-wrapper">

      <div className="register-card">

        <h1>Crear Cuenta</h1>
        <p>Únete a nuestra comunidad de estudiantes colaborativos</p>

        <div className="steps">
          <div className="step active">
            <span>1</span>
            <p>Información Básica</p>
          </div>

          <div className="step">
            <span>2</span>
            <p>Información Académica</p>
          </div>

          <div className="step">
            <span>3</span>
            <p>Perfil y Habilidades</p>
          </div>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>

          <h2>Paso 1: Información Básica</h2>

          <label>Nombre Completo *</label>
          <input
            type="text"
            name="nombre"
            placeholder="Juan Pérez García"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <div className="row">
            <div className="input-group">
              <label>Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
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
                placeholder="+52 999 123 4567"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Contraseña *</label>
          <input
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirmar Contraseña *</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className="next-button" type="submit">
            Continuar
          </button>

        </form>

      </div>

    </div>
  );
}
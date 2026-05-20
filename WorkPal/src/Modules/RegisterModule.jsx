import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar";

import { createProject } from "../Services/projectService";

import "./RegisterModule.css";

export default function RegisterModule() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      nombre: "",
      descripcion: "",
    });

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response =
      await createProject({
        nombre: formData.nombre,
        descripcion:
          formData.descripcion,
      });

    if (!response.success) {
      setMessage(response.message);

      return;
    }

    setMessage(
      "Proyecto creado correctamente"
    );

    setTimeout(() => {
      navigate("/search");
    }, 1200);
  };

  return (
    <div>
      <Navbar />

      <div className="register-module-page">
        <form
          className="register-module-card"
          onSubmit={handleSubmit}
        >
          <h1>Registrar Proyecto</h1>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre del proyecto"
            value={formData.nombre}
            onChange={handleChange}
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
          />

          <button type="submit">
            Crear Proyecto
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}
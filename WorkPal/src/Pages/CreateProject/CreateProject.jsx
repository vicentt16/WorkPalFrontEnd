import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { createProject } from "../../Services/projectService";
import "./CreateProject.css";

export default function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: "",
    vacancies: 1,
    finishDate: "",
    image: "",
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
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.skills ||
      !formData.finishDate
    ) {
      setErrorMessage(
        "Todos los campos son obligatorios"
      );

      return;
    }

    const formattedSkills =
      formData.skills
        .split(",")
        .map((skill) => skill.trim());

    const projectData = {
      ...formData,
      skills: formattedSkills,
    };

    const response =
      createProject(projectData);

    if (!response.success) {
      setErrorMessage(response.message);

      return;
    }

    setSuccessMessage(
      "Proyecto creado correctamente"
    );

    setFormData({
      title: "",
      category: "",
      description: "",
      skills: "",
      vacancies: 1,
      finishDate: "",
      image: "",
    });

    setTimeout(() => {
      navigate("/search");
    }, 1500);
  };

  return (
    <div className="create-project-page">
      <Navbar />

      <div className="create-project-container">
        <div className="create-project-card">
          <div className="create-project-header">
            <h1>Crear Proyecto</h1>

            <p>
              Publica tu idea y encuentra
              colaboradores para trabajar juntos.
            </p>
          </div>

          <form
            className="create-project-form"
            onSubmit={handleSubmit}
          >
            {/* TITLE */}
            <div className="input-group">
              <label>
                Nombre del Proyecto
              </label>

              <input
                type="text"
                name="title"
                placeholder="WorkPal"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* CATEGORY */}
            <div className="input-group">
              <label>Categoría</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Selecciona una categoría
                </option>

                <option value="Web">
                  Web
                </option>

                <option value="Mobile">
                  Mobile
                </option>

                <option value="IA">
                  IA
                </option>

                <option value="Diseño">
                  Diseño
                </option>

                <option value="Gaming">
                  Gaming
                </option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="input-group">
              <label>Descripción</label>

              <textarea
                name="description"
                placeholder="Describe tu proyecto..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* SKILLS */}
            <div className="input-group">
              <label>
                Habilidades Requeridas
              </label>

              <input
                type="text"
                name="skills"
                placeholder="React, JavaScript, UI/UX..."
                value={formData.skills}
                onChange={handleChange}
              />

              <small>
                Separa cada habilidad con coma.
              </small>
            </div>

            {/* ROW */}
            <div className="form-row">
              {/* VACANCIES */}
              <div className="input-group">
                <label>Vacantes</label>

                <input
                  type="number"
                  name="vacancies"
                  min="1"
                  value={formData.vacancies}
                  onChange={handleChange}
                />
              </div>

              {/* DATE */}
              <div className="input-group">
                <label>
                  Fecha de Finalización
                </label>

                <input
                  type="date"
                  name="finishDate"
                  value={formData.finishDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* IMAGE */}
            <div className="input-group">
              <label>
                URL de Imagen (Opcional)
              </label>

              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={formData.image}
                onChange={handleChange}
              />
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
              className="create-project-button"
            >
              Publicar Proyecto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { getProjectById } from "../../Services/projectService";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const data =
        await getProjectById(id);

      setProject(data);

      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="project-loading">
        <h1>Cargando proyecto...</h1>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Proyecto no encontrado</h1>

        <button
          onClick={() =>
            navigate("/search")
          }
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="project-details-container">
      <Navbar />

      <div className="project-details-content">
        {/* BANNER */}
        <div className="project-banner">
          <div className="project-banner-overlay">
            <span className="project-category">
              {project.categoria ||
                "Proyecto"}
            </span>

            <h1>
              {project.nombre}
            </h1>

            <p>
              {project.descripcion}
            </p>
          </div>
        </div>

        {/* INFO */}
        <div className="project-main-info">
          <div className="project-description-card">
            <h2>
              Descripción Completa
            </h2>

            <p>
              {project.descripcion}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="apply-section">
          <button
            className="apply-button"
          >
            Aplicar al Proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
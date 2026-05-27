import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { getProjectById, applyToProject } from "../../Services/projectService";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id);
      setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando proyecto...</div>;
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Proyecto no encontrado.</h1>

        <button
          onClick={() => navigate("/search")}
        >
          Volver
        </button>
      </div>
    );
  }

  const handleApply = async () => {
    const response = await applyToProject(id);
    alert(response.message);
  };

  return (
    <div className="project-details-container">
      <Navbar />

      <div className="project-details-content">
        {/* BANNER */}
        <div className="project-banner">
          <img
            src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
            alt={project.name}
            className="project-banner-image"
          />

          <div className="project-banner-overlay">
            <span className="project-category">
              Proyecto
            </span>

            <h1>{project.name}</h1>

            <p>{project.description}</p>
          </div>
        </div>

        {/* MAIN INFO */}
        <div className="project-main-info">
          <div className="project-description-card">
            <h2>Descripción Completa</h2>

            <p>
              {project.description}
            </p>
          </div>

          <div className="project-side-panel">
            <div className="side-card">
              <h3>
                Estado
              </h3>

              <p>Activo</p>
            </div>

            <div className="side-card">
              <h3>
                Fecha de Finalización
              </h3>

              <p>{new Date(project.end).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="skills-section">
          <h2>
            Habilidades Requeridas
          </h2>

          <div className="skills-container">
            {project.skill.split(",").map((skill) => (
              <span
                className="skill-tag"
                key={skill}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* APPLY */}
        <div className="apply-section">
          <button
            className="apply-button"
            onClick={handleApply}
          >
            Aplicar al Proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { getProjectById, applyToProject } from "../../Services/projectService";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Proyecto no encontrado</h1>

        <button
          onClick={() => navigate("/search")}
        >
          Volver
        </button>
      </div>
    );
  }

  const handleApply = () => {
    const response = applyToProject(id);

    alert(response.message);
  };

  return (
    <div className="project-details-container">
      <Navbar />

      <div className="project-details-content">
        {/* BANNER */}
        <div className="project-banner">
          <img
            src={project.image}
            alt={project.title}
            className="project-banner-image"
          />

          <div className="project-banner-overlay">
            <span className="project-category">
              {project.category}
            </span>

            <h1>{project.title}</h1>

            <p>{project.description}</p>
          </div>
        </div>

        {/* MAIN INFO */}
        <div className="project-main-info">
          <div className="project-description-card">
            <h2>Descripción Completa</h2>

            <p>
              {project.fullDescription}
            </p>
          </div>

          <div className="project-side-panel">
            <div className="side-card">
              <h3>
                Vacantes Disponibles
              </h3>

              <p>{project.vacancies}</p>
            </div>

            <div className="side-card">
              <h3>
                Fecha de Finalización
              </h3>

              <p>{project.finishDate}</p>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="skills-section">
          <h2>
            Habilidades Requeridas
          </h2>

          <div className="skills-container">
            {project.skills.map((skill) => (
              <span
                className="skill-tag"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MEMBERS */}
        <div className="members-section">
          <h2>
            Colaboradores Actuales
          </h2>

          <div className="members-list">
            {project.members.map(
              (member) => (
                <div
                  className="member-card"
                  key={member}
                >
                  <div className="member-avatar">
                    {member
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <p>{member}</p>
                </div>
              )
            )}
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
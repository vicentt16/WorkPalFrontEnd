import { useNavigate } from "react-router-dom";

import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleViewProject = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className="project-card"
      onClick={handleViewProject}
    >
      {/* Imagen */}
      <div className="project-card-image-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-card-image"
        />

        <span className="project-card-category">
          {project.category}
        </span>
      </div>

      {/* Contenido */}
      <div className="project-card-content">
        <h2>{project.title}</h2>

        <p>{project.description}</p>

        {/* Skills */}
        <div className="project-card-skills">
          {project.skills.map((skill) => (
            <span
              className="project-skill-tag"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Info */}
        <div className="project-card-footer">
          <div className="project-info">
            <span>
              👥 {project.members.length} miembros
            </span>

            <span>
              📌 {project.vacancies} vacantes
            </span>
          </div>

          <button className="project-view-button">
            Ver Proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
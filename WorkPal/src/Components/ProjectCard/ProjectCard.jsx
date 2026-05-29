import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleViewProject = () => {
    navigate(`/project/${project.id}`);
  };

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000${path}`;
  };

  return (
    <div
      className="project-card"
      onClick={handleViewProject}
    >
      {/* Imagen */}
      <div className="project-card-image-container">
        <img
          src={getImageUrl(project.image)}
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
          <button className="project-view-button">
            Ver Proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
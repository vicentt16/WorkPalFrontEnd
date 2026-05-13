import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProjectUpperBar } from "../../Modules/ProjectUpperBar";

import "./SearchProjects.css";

// Datos temporales mientras backend no está listo
const projects = [
  {
    id: 1,
    title: "Sistema de Gestión Escolar",
    category: "Web",
    description:
      "Plataforma web para administrar alumnos, maestros y materias.",
    fullDescription:
      "Proyecto enfocado en desarrollar un sistema completo para instituciones educativas utilizando React y FastAPI.",
    skills: ["React", "FastAPI", "PostgreSQL"],
    members: ["Carlos", "Andrea"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 2,
    title: "Aplicación Fitness",
    category: "Mobile",
    description:
      "Aplicación móvil para rutinas y seguimiento de ejercicios.",
    fullDescription:
      "Aplicación multiplataforma para seguimiento de actividad física y nutrición.",
    skills: ["Flutter", "Firebase"],
    members: ["Luis", "Fernanda"],
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
  {
    id: 3,
    title: "Asistente IA",
    category: "IA",
    description:
      "Sistema inteligente para automatización de tareas.",
    fullDescription:
      "Proyecto basado en inteligencia artificial utilizando modelos NLP.",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    members: ["Miguel"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
];

export default function SearchProjects() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "Todas" || project.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="search-container">
      <ProjectUpperBar />

      <div className="search-content">
        <div className="search-header">
          <h1>Buscar Proyectos</h1>

          <p>
            Encuentra proyectos que coincidan con tus habilidades e intereses.
          </p>
        </div>

        <div className="search-filters">
          <input
            type="text"
            placeholder="Buscar proyecto o habilidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="Todas">Todas las categorías</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="IA">IA</option>
          </select>
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                className="project-card"
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />

                <div className="project-card-content">
                  <div className="project-category">
                    {project.category}
                  </div>

                  <h2>{project.title}</h2>

                  <p>{project.description}</p>

                  <div className="skills-container">
                    {project.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button className="view-project-button">
                    Ver Proyecto
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h2>Sin resultados</h2>

              <p>
                No encontramos proyectos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
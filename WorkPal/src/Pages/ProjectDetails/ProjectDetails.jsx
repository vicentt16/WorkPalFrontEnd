import { useParams, useNavigate } from "react-router-dom";

import { ProjectUpperBar } from "../../Modules/ProjectUpperBar";

import "./ProjectDetails.css";

// Datos temporales mientras backend no está conectado
const projects = [
  {
    id: 1,
    title: "Sistema de Gestión Escolar",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

    description:
      "Plataforma web para administrar alumnos, maestros y materias.",

    fullDescription:
      "Este proyecto tiene como objetivo desarrollar una plataforma completa para instituciones educativas. El sistema permitirá gestionar alumnos, maestros, materias, horarios y reportes académicos utilizando tecnologías modernas como React, FastAPI y PostgreSQL.",

    skills: ["React", "FastAPI", "PostgreSQL"],

    members: [
      "Carlos Mendoza",
      "Andrea Torres",
      "Luis Martínez",
    ],

    vacancies: 2,

    finishDate: "2026-08-20",
  },

  {
    id: 2,
    title: "Aplicación Fitness",
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",

    description:
      "Aplicación móvil para rutinas y seguimiento de ejercicios.",

    fullDescription:
      "Aplicación enfocada en ayudar a los usuarios a mejorar su condición física mediante rutinas personalizadas, seguimiento de calorías y progreso físico.",

    skills: ["Flutter", "Firebase"],

    members: ["Fernanda López", "Miguel Ruiz"],

    vacancies: 3,

    finishDate: "2026-11-15",
  },

  {
    id: 3,
    title: "Asistente IA",
    category: "IA",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",

    description:
      "Sistema inteligente para automatización de tareas.",

    fullDescription:
      "Proyecto basado en inteligencia artificial y procesamiento de lenguaje natural para automatizar tareas administrativas y consultas inteligentes.",

    skills: ["Python", "TensorFlow", "Machine Learning"],

    members: ["Sofía Ramírez"],

    vacancies: 1,

    finishDate: "2026-12-30",
  },
];

export default function ProjectDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const project = projects.find(
    (project) => project.id === Number(id)
  );

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Proyecto no encontrado</h1>

        <button onClick={() => navigate("/search")}>
          Volver
        </button>
      </div>
    );
  }

  const handleApply = () => {
    alert("Solicitud enviada correctamente");
  };

  return (
    <div className="project-details-container">
      <ProjectUpperBar />

      <div className="project-details-content">
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

        <div className="project-main-info">
          <div className="project-description-card">
            <h2>Descripción Completa</h2>

            <p>{project.fullDescription}</p>
          </div>

          <div className="project-side-panel">
            <div className="side-card">
              <h3>Vacantes Disponibles</h3>

              <p>{project.vacancies}</p>
            </div>

            <div className="side-card">
              <h3>Fecha de Finalización</h3>

              <p>{project.finishDate}</p>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2>Habilidades Requeridas</h2>

          <div className="skills-container">
            {project.skills.map((skill) => (
              <span className="skill-tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="members-section">
          <h2>Colaboradores Actuales</h2>

          <div className="members-list">
            {project.members.map((member) => (
              <div className="member-card" key={member}>
                <div className="member-avatar">
                  {member.charAt(0)}
                </div>

                <p>{member}</p>
              </div>
            ))}
          </div>
        </div>

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
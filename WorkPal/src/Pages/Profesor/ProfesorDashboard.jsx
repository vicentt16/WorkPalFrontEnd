
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import {
  getSupervisedProjects,
  unsubscribeFromProject,
} from "../../Services/profesorService";
import "./ProfesorDashboard.css";

export default function ProfesorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getSupervisedProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleUnsubscribe = async (projectId) => {
    const confirmed = window.confirm(
      "¿Deseas dejar de supervisar este proyecto?"
    );

    if (!confirmed) return;

    const response = await unsubscribeFromProject(projectId);

    if (response.success) {
      await loadProjects();
    } else {
      setError(response.message);
    }
  };

  const getProgress = (project) => {
    const tasks = project.tasks || [];
    if (tasks.length === 0) return 0;

    const completed = tasks.filter(
      (task) =>
        task.status === "Completada" ||
        task.status === "Confirmada"
    ).length;

    return Math.round((completed / tasks.length) * 100);
  };

  const allStudents = new Set(
    projects.flatMap((project) =>
      (project.collaborators || []).map(
        (student) => student.alumno_id ?? student.id
      )
    )
  );

  const averageProgress = projects.length
    ? Math.round(
        projects.reduce(
          (sum, project) => sum + getProgress(project),
          0
        ) / projects.length
      )
    : 0;

  return (
    <div className="profesor-page">

      <main className="profesor-container">
        <header className="profesor-header">
          <div>
            <h1>Bienvenido, {user?.name || "Profesor"}</h1>
            <p>
              Consulta y supervisa los proyectos de tus
              estudiantes.
            </p>
          </div>

          <button onClick={() => navigate("/search")}>
            Buscar proyectos
          </button>
        </header>

        <section className="profesor-stats">
          <div className="stat-card">
            <h3>Proyectos supervisados</h3>
            <strong>{projects.length}</strong>
          </div>

          <div className="stat-card">
            <h3>Estudiantes</h3>
            <strong>{allStudents.size}</strong>
          </div>

          <div className="stat-card">
            <h3>Avance promedio</h3>
            <strong>{averageProgress}%</strong>
          </div>
        </section>

        <section className="profesor-projects">
          <h2>Mis proyectos supervisados</h2>

          {loading && <p>Cargando proyectos...</p>}

          {error && <p role="alert" className="profesor-error">{error}</p>}

          {!loading && !error && projects.length === 0 && (
            <div className="profesor-empty">
              <h3>Aún no supervisas proyectos</h3>
              <p>
                Busca un proyecto y suscríbete para
                consultar sus avances.
              </p>
              <button onClick={() => navigate("/search")}>
                Explorar proyectos
              </button>
            </div>
          )}

          <div className="profesor-project-grid">
            {projects.map((project) => {
              const progress = getProgress(project);
              const tasks = project.tasks || [];
              const completed = tasks.filter(
                (task) =>
                  task.status === "Completada" ||
                  task.status === "Confirmada"
              ).length;

              return (
                <article
                  className="profesor-project-card"
                  key={project.id}
                >
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="progress-heading">
                    <span>Avance del proyecto</span>
                    <strong>{progress}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="task-summary">
                    {completed} de {tasks.length} tareas
                    completadas
                  </p>

                  <div className="profesor-card-actions">
                    <button
                      onClick={() =>
                        navigate(`/project/${project.id}`)
                      }
                    >
                      Ver avances
                    </button>

                    <button
                      className="unsubscribe-button"
                      onClick={() =>
                        handleUnsubscribe(project.id)
                      }
                    >
                      Dejar de seguir
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

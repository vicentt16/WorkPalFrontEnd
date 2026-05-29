import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { 
  getProjectById, 
  applyToProject, 
  getProjectCollaborators, 
  getTasks, 
  createProjectTask, 
  updateTaskStatus,
  leaveProject 
} from "../../Services/projectService";
import { useAuth } from "../../Context/AuthContext";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Only show tasks if we came from manage projects
  const isFromManage = location.state?.fromManage || false;

  const [project, setProject] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isColab, setIsColab] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Task creation state
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    end_date: "",
    assigned_to: ""
  });

  useEffect(() => {
    fetchProjectData();
  }, [id, user]);

  const fetchProjectData = async () => {
    setLoading(true);
    const projData = await getProjectById(id);
    if (projData) {
      setProject(projData);
      
      const admin = user && projData.owner_id && Number(projData.owner_id) === Number(user.id);
      setIsAdmin(!!admin);

      // Always fetch collaborators to show the team
      try {
        const [colabs, projectTasks] = await Promise.all([
          getProjectCollaborators(id),
          isFromManage ? getTasks(id) : Promise.resolve([])
        ]);
        
        setCollaborators(colabs || []);
        setTasks(projectTasks || []);
        
        const colab = user && colabs && colabs.some(c => c.alumno_id && Number(c.alumno_id) === Number(user.id));
        setIsColab(!!colab);
      } catch (err) {
        console.error("Error fetching project sub-data:", err);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Cargando proyecto...</div>;
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Proyecto no encontrado.</h1>
        <button onClick={() => navigate("/search")}>Volver</button>
      </div>
    );
  }

  const handleApply = async () => {
    const response = await applyToProject(id);
    alert(response.message);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskData.assigned_to) {
      alert("Selecciona un colaborador");
      return;
    }
    const res = await createProjectTask(id, {
      ...taskData,
      end_date: new Date(taskData.end_date).toISOString()
    });
    if (res.success) {
      alert("Tarea creada");
      setShowTaskForm(false);
      setTaskData({ title: "", description: "", end_date: "", assigned_to: "" });
      fetchProjectData();
    } else {
      alert(res.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    if (newStatus === "") return;
    
    const confirmMsg = "Solo una vez se podrá seleccionar esta opción y una vez confirmada se mantendrá en ese estado hasta que lo hayas puesto como Completada. ¿Deseas continuar?";
    if (!isAdmin && (newStatus === "En Proceso" || newStatus === "Completada")) {
      if (!window.confirm(confirmMsg)) return;
    }

    const res = await updateTaskStatus(taskId, newStatus);
    if (res.success) {
      fetchProjectData();
    } else {
      alert(res.message);
    }
  };

  const handleLeaveProject = async () => {
    const res = await leaveProject(id);
    alert(res.message);
  };

  const getStatusOptions = (task) => {
    const options = ["Pendiente", "En Proceso", "Completada", "Confirmada"];
    const currentIdx = options.indexOf(task.status);
    
    if (isAdmin) {
      if (Number(task.assigned_to) === Number(user.id)) {
        return options.filter((_, idx) => idx >= currentIdx);
      } else {
        return task.status === "Completada" ? ["Completada", "Confirmada"] : [task.status];
      }
    } else {
      // Collaborator
      if (task.status === "Pendiente") return ["Pendiente", "En Proceso"];
      if (task.status === "En Proceso") return ["En Proceso", "Completada"];
      return [task.status];
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000${path}`;
  };

  return (
    <div className="project-details-container">
      <Navbar />

      <div className="project-details-content">
        {/* BANNER */}
        <div className="project-banner">
          <img
            src={getImageUrl(project.image)}
            alt={project.name}
            className="project-banner-image"
          />

          <div className="project-banner-overlay">
            <span className="project-category">Proyecto</span>
            <h1>{project.name}</h1>
          </div>
        </div>

        {/* MAIN INFO */}
        <div className="project-main-info">
          <div className="project-description-card">
            <h2>Descripción</h2>
            <p>{project.description}</p>
          </div>

          <div className="project-side-panel">
            <div className="side-card">
              <h3>Estado</h3>
              <p>Activo</p>
            </div>

            <div className="side-card">
              <h3>Fecha de Finalización</h3>
              <p>{project.end ? new Date(project.end).toLocaleDateString() : "No definida"}</p>
            </div>

            {isFromManage && isColab && (
              <button className="leave-project-btn" onClick={handleLeaveProject}>
                Abandonar Proyecto
              </button>
            )}
          </div>
        </div>

        {/* SKILLS */}
        <div className="skills-section">
          <h2>Habilidades Requeridas</h2>
          <div className="skills-container">
            {project.skill ? project.skill.split(",").map((skill) => (
              <span className="skill-tag" key={skill}>{skill.trim()}</span>
            )) : <span>No especificadas</span>}
          </div>
        </div>

        {/* COLLABORATORS */}
        <div className="members-section">
          <h2>Equipo del Proyecto</h2>
          <div className="members-list">
            {collaborators.map((member) => (
              <div className="member-card" key={member.alumno_id}>
                <div className="member-avatar">
                  {member.imagen_url ? (
                    <img src={getImageUrl(member.imagen_url)} alt={member.alumno_name} className="member-photo" />
                  ) : (
                    member.alumno_name?.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="member-info">
                  <p className="member-name">{member.alumno_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TASKS SECTION - Only if coming from Manage Projects */}
        {isFromManage && (isAdmin || isColab) && (
          <div className="tasks-section">
            <div className="tasks-header">
              <h2>Tareas del Proyecto</h2>
              {isAdmin && (
                <button className="add-task-btn" onClick={() => setShowTaskForm(!showTaskForm)}>
                  {showTaskForm ? "Cancelar" : "Crear Tarea"}
                </button>
              )}
            </div>

            {showTaskForm && (
              <form className="task-form" onSubmit={handleCreateTask}>
                <input 
                  type="text" 
                  placeholder="Título" 
                  value={taskData.title} 
                  onChange={e => setTaskData({...taskData, title: e.target.value})} 
                  required 
                />
                <textarea 
                  placeholder="Descripción" 
                  value={taskData.description} 
                  onChange={e => setTaskData({...taskData, description: e.target.value})} 
                  required 
                />
                <div className="form-group">
                  <label>Fecha de Finalización:</label>
                  <input 
                    type="date" 
                    value={taskData.end_date} 
                    onChange={e => setTaskData({...taskData, end_date: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Asignar a:</label>
                  <select 
                    value={taskData.assigned_to} 
                    onChange={e => setTaskData({...taskData, assigned_to: e.target.value})} 
                    required
                  >
                    <option value="">Selecciona un colaborador</option>
                    <option value={user.id}>Yo (Administrador)</option>
                    {collaborators.map(c => (
                      <option key={c.alumno_id} value={c.alumno_id}>{c.alumno_name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="submit-task-btn">Guardar Tarea</button>
              </form>
            )}

            <div className="tasks-list">
              {tasks.length === 0 ? <p>No hay tareas asignadas.</p> : (
                tasks.map(task => (
                  <div key={task.id} className={`task-card status-${task.status.toLowerCase().replace(" ", "-")}`}>
                    <div className="task-info">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <span className="task-meta">Para: {task.responsable_name}</span>
                      <span className="task-meta">Vence: {new Date(task.end_date).toLocaleDateString()}</span>
                    </div>
                    <div className="task-status-control">
                      <label>Estado:</label>
                      <select 
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        disabled={task.status === "Confirmada" && !isAdmin}
                      >
                        {getStatusOptions(task).map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* APPLY - Only if NOT from Manage Projects and not member/admin */}
        {!isFromManage && !isAdmin && !isColab && (
          <div className="apply-section">
            <button className="apply-button" onClick={handleApply}>
              Aplicar al Proyecto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
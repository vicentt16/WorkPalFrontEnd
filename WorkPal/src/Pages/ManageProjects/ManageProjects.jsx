import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { 
  getUserProjects, 
  getJoinedProjects,
  getProjectApplications, 
  getProjectCollaborators, 
  acceptApplication, 
  rejectApplication,
  getExitRequests,
  processExitRequest
} from "../../Services/projectService";
import { useNavigate } from "react-router-dom";
import "./ManageProjects.css";

// Simple Profile Modal Component
function UserProfileModal({ user, onClose }) {
  if (!user) return null;
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://localhost:8000${path}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="modal-avatar-container">
            {user.imagen_url ? (
              <img src={getImageUrl(user.imagen_url)} alt={user.alumno_name} className="modal-avatar" />
            ) : (
              <div className="modal-avatar-placeholder">{user.alumno_name?.charAt(0).toUpperCase()}</div>
            )}
          </div>
          <h2>{user.alumno_name}</h2>
          <p className="modal-career">{user.alumno_carrera}</p>
        </div>
        <div className="modal-body">
          <h3>Habilidades</h3>
          <div className="modal-skills">
            {user.skills ? (typeof user.skills === 'string' ? user.skills : user.skills.join(",")).split(",").map(s => (
              <span key={s} className="modal-skill-tag">{s.trim()}</span>
            )) : <p>No hay habilidades listadas.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ManageProjects() {
  const [activeTab, setActiveTab] = useState("mis-proyectos"); // "mis-proyectos" or "proyectos-unidos"
  const [myProjects, setMyProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [exitRequests, setExitRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // For profile modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "mis-proyectos") {
      const data = await getUserProjects();
      setMyProjects(data);
    } else {
      const data = await getJoinedProjects();
      setJoinedProjects(data);
    }
    setSelectedProject(null);
    setLoading(false);
  };

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
    if (activeTab === "mis-proyectos") {
      const [apps, colabs, exits] = await Promise.all([
        getProjectApplications(project.id),
        getProjectCollaborators(project.id),
        getExitRequests(project.id)
      ]);
      setApplications(apps);
      setCollaborators(colabs);
      setExitRequests(exits);
    }
  };

  const handleAccept = async (appId) => {
    const res = await acceptApplication(appId);
    if (res.success) {
      alert("Aplicación aceptada");
      handleSelectProject(selectedProject);
    } else {
      alert(res.message);
    }
  };

  const handleReject = async (appId) => {
    const res = await rejectApplication(appId);
    if (res.success) {
      alert("Aplicación rechazada");
      handleSelectProject(selectedProject);
    } else {
      alert(res.message);
    }
  };

  const handleProcessExit = async (requestId, accept) => {
    const res = await processExitRequest(requestId, accept);
    if (res.success) {
      alert(res.message);
      handleSelectProject(selectedProject);
    } else {
      alert(res.message);
    }
  };

  const handleShowProfile = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="manage-projects-page">
      <Navbar />
      <div className="manage-projects-container">
        <h1>Proyectos</h1>
        
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === "mis-proyectos" ? "active" : ""}`}
            onClick={() => setActiveTab("mis-proyectos")}
          >
            Mis Proyectos
          </button>
          <button 
            className={`tab-btn ${activeTab === "proyectos-unidos" ? "active" : ""}`}
            onClick={() => setActiveTab("proyectos-unidos")}
          >
            Proyectos Unidos
          </button>
        </div>

        <div className="manage-content">
          <div className="projects-list">
            <h2>{activeTab === "mis-proyectos" ? "Proyectos Creados" : "Proyectos que sigo"}</h2>
            {loading ? <p>Cargando...</p> : (
              (activeTab === "mis-proyectos" ? myProjects : joinedProjects).length === 0 ? 
                <p>No hay proyectos en esta sección.</p> : (
                (activeTab === "mis-proyectos" ? myProjects : joinedProjects).map(p => (
                  <div 
                    key={p.id} 
                    className={`project-item ${selectedProject?.id === p.id ? 'active' : ''}`} 
                    onClick={() => activeTab === "mis-proyectos" ? handleSelectProject(p) : navigate(`/project/${p.id}`, { state: { fromManage: true } })}
                  >
                    <h3>{p.name}</h3>
                    {activeTab === "proyectos-unidos" && <span className="view-link">Ver Perfil</span>}
                  </div>
                ))
              )
            )}
          </div>

          <div className="applications-panel">
            {activeTab === "mis-proyectos" ? (
              selectedProject ? (
                <>
                  <div className="project-actions-bar">
                     <button className="view-profile-btn" onClick={() => navigate(`/project/${selectedProject.id}`, { state: { fromManage: true } })}>
                        Ver Proyecto
                     </button>
                  </div>
                  <div className="section">
                    <h2>Aplicaciones Pendientes</h2>
                    {applications.length === 0 ? <p>No hay aplicaciones pendientes.</p> : (
                      <div className="applications-list">
                        {applications.map(app => (
                          <div key={app.id} className="application-card">
                            <div className="app-info">
                              <h3 className="clickable-name" onClick={() => handleShowProfile(app)}>{app.alumno_name}</h3>
                              <p>{app.alumno_carrera}</p>
                            </div>
                            <div className="app-actions">
                              <button className="accept-btn" onClick={() => handleAccept(app.id)}>Aceptar</button>
                              <button className="reject-btn" onClick={() => handleReject(app.id)}>Rechazar</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="section">
                    <h2>Solicitudes de Salida</h2>
                    {exitRequests.length === 0 ? <p>No hay solicitudes de salida.</p> : (
                      <div className="applications-list">
                        {exitRequests.map(req => (
                          <div key={req.id} className="application-card exit-card">
                            <div className="app-info">
                              <h3 className="clickable-name" onClick={() => handleShowProfile(req)}>{req.alumno_name}</h3>
                              <p>Solicita abandonar el proyecto</p>
                            </div>
                            <div className="app-actions">
                              <button className="accept-btn" onClick={() => handleProcessExit(req.id, true)}>Aceptar</button>
                              <button className="reject-btn" onClick={() => handleProcessExit(req.id, false)}>Rechazar</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="section collaborators-section">
                    <h2>Colaboradores</h2>
                    {collaborators.length === 0 ? <p>Aún no hay colaboradores.</p> : (
                      <div className="collaborators-list">
                        {collaborators.map(col => (
                          <div key={col.id} className="collaborator-card">
                            <h3 className="clickable-name" onClick={() => handleShowProfile(col)}>{col.alumno_name}</h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p>Selecciona un proyecto para ver sus detalles.</p>
              )
            ) : (
              <div className="joined-info">
                <p>En esta sección puedes ver los proyectos en los que participas o has solicitado unirte.</p>
                <p>Haz clic en un proyecto a la izquierda para ir a su perfil y ver tus tareas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}

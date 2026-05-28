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

export default function ManageProjects() {
  const [activeTab, setActiveTab] = useState("mis-proyectos"); // "mis-proyectos" or "proyectos-unidos"
  const [myProjects, setMyProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [exitRequests, setExitRequests] = useState([]);
  const [loading, setLoading] = useState(true);
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
                    onClick={() => activeTab === "mis-proyectos" ? handleSelectProject(p) : navigate(`/project/${p.id}`)}
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
                  <div className="section">
                    <h2>Aplicaciones Pendientes</h2>
                    {applications.length === 0 ? <p>No hay aplicaciones pendientes.</p> : (
                      <div className="applications-list">
                        {applications.map(app => (
                          <div key={app.id} className="application-card">
                            <div className="app-info">
                              <h3>{app.alumno_name}</h3>
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
                              <h3>{req.alumno_name}</h3>
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
                            <h3>{col.alumno_name}</h3>
                            <p>{col.alumno_carrera}</p>
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
    </div>
  );
}

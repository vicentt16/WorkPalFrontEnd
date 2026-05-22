import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { getUserProjects, getProjectApplications, getProjectCollaborators, acceptApplication, rejectApplication } from "../../Services/projectService";
import "./ManageProjects.css";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProjects = async () => {
      const data = await getUserProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchUserProjects();
  }, []);

  const handleSelectProject = async (project) => {
    setSelectedProject(project);
    const [apps, colabs] = await Promise.all([
      getProjectApplications(project.id),
      getProjectCollaborators(project.id)
    ]);
    setApplications(apps);
    setCollaborators(colabs);
  };

  const handleAccept = async (appId) => {
    const res = await acceptApplication(appId);
    if (res.success) {
      alert("Aplicación aceptada");
      handleSelectProject(selectedProject); // Refresh both lists
    } else {
      alert(res.message);
    }
  };

  const handleReject = async (appId) => {
    const res = await rejectApplication(appId);
    if (res.success) {
      alert("Aplicación rechazada");
      handleSelectProject(selectedProject); // Refresh both lists
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="manage-projects-page">
      <Navbar />
      <div className="manage-projects-container">
        <h1>Gestionar mis Proyectos</h1>
        
        <div className="manage-content">
          <div className="projects-list">
            <h2>Mis Proyectos</h2>
            {loading ? <p>Cargando...</p> : (
              projects.length === 0 ? <p>No has creado proyectos aún.</p> : (
                projects.map(p => (
                  <div key={p.id} className={`project-item ${selectedProject?.id === p.id ? 'active' : ''}`} onClick={() => handleSelectProject(p)}>
                    <h3>{p.name}</h3>
                  </div>
                ))
              )
            )}
          </div>

          <div className="applications-panel">
            {selectedProject ? (
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

                <div className="section collaborators-section">
                  <h2>Colaboradores del Proyecto</h2>
                  {collaborators.length === 0 ? <p>Aún no hay colaboradores aceptados.</p> : (
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
              <p>Selecciona un proyecto para ver sus aplicaciones y colaboradores.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

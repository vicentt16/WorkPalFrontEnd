import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { getUserProjects, getProjectApplications, acceptApplication, rejectApplication } from "../../Services/projectService";
import "./ManageProjects.css";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [applications, setApplications] = useState([]);
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
    const apps = await getProjectApplications(project.id);
    setApplications(apps);
  };

  const handleAccept = async (appId) => {
    const res = await acceptApplication(appId);
    if (res.success) {
      alert("Aplicación aceptada");
      // Refresh applications
      const apps = await getProjectApplications(selectedProject.id);
      setApplications(apps);
    } else {
      alert(res.message);
    }
  };

  const handleReject = async (appId) => {
    const res = await rejectApplication(appId);
    if (res.success) {
      alert("Aplicación rechazada");
      // Refresh applications
      const apps = await getProjectApplications(selectedProject.id);
      setApplications(apps);
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
                <h2>Aplicaciones para {selectedProject.name}</h2>
                {applications.length === 0 ? <p>No hay aplicaciones pendientes.</p> : (
                  <div className="applications-list">
                    {applications.map(app => (
                      <div key={app.id} className="application-card">
                        <p>Alumno ID: {app.alumno_id}</p>
                        <p>Estado: {app.status}</p>
                        {app.status === 'pending' && (
                          <div className="app-actions">
                            <button className="accept-btn" onClick={() => handleAccept(app.id)}>Aceptar</button>
                            <button className="reject-btn" onClick={() => handleReject(app.id)}>Rechazar</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p>Selecciona un proyecto para ver sus aplicaciones.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

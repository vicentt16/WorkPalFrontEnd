import api from "./api";

export const createProject = async (projectData) => {
  try {
    const response = await api.post("/proyectos/", {
      name: projectData.title,
      skill: projectData.skills.join(", "),
      description: projectData.description,
      start: new Date().toISOString(),
      end: projectData.finishDate ? new Date(projectData.finishDate).toISOString() : new Date().toISOString(),
      image: projectData.image || "",
    });
    return {
      success: true,
      project: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Error al crear el proyecto",
    };
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get("/proyectos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

export const searchProjects = async (searchText, category) => {
  try {
    const response = await api.get("/proyectos/");
    let projects = response.data;

    if (searchText) {
      projects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchText.toLowerCase()) ||
        project.skill.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Category filtering can be added here if the backend supports it or filter locally
    return projects;
  } catch (error) {
    console.error("Error searching projects:", error);
    return [];
  }
};

export const applyToProject = async (projectId) => {
  try {
    const response = await api.post(`/proyectos/${projectId}/aplicar`);
    return {
      success: true,
      message: "Solicitud enviada correctamente",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Error al aplicar al proyecto",
    };
  }
};

export const getUserProjects = async () => {
  try {
    const response = await api.get("/proyectos/mis-proyectos");
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return [];
  }
};

export const getProjectApplications = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${projectId}/aplicaciones`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

export const acceptApplication = async (applicationId) => {
  try {
    const response = await api.post(`/proyectos/aplicaciones/${applicationId}/aceptar`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Error al aceptar la aplicación",
    };
  }
};

export const rejectApplication = async (applicationId) => {
  try {
    const response = await api.post(`/proyectos/aplicaciones/${applicationId}/rechazar`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Error al rechazar la aplicación",
    };
  }
};

export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/proyectos/${projectId}`);
    return {
      success: true,
      message: "Proyecto eliminado",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar el proyecto",
    };
  }
};
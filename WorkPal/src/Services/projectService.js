import api from "./api";

export const createProject = async (projectData) => {
  try {
    const formData = new FormData();
    formData.append("name", projectData.title);
    formData.append("skill", Array.isArray(projectData.skills) ? projectData.skills.join(", ") : projectData.skills);
    formData.append("description", projectData.description);
    formData.append("start", new Date().toISOString());
    formData.append("end", projectData.finishDate ? new Date(projectData.finishDate).toISOString() : new Date().toISOString());
    
    if (projectData.image) {
      formData.append("imagen", projectData.image);
    }

    const response = await api.post("/proyectos/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export const getJoinedProjects = async () => {
  try {
    const response = await api.get("/proyectos/unidos");
    return response.data;
  } catch (error) {
    console.error("Error fetching joined projects:", error);
    return [];
  }
};

export const leaveProject = async (projectId) => {
  try {
    const response = await api.post(`/proyectos/${projectId}/abandonar`);
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Error al solicitar salida" };
  }
};

export const getExitRequests = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${projectId}/solicitudes-salida`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exit requests:", error);
    return [];
  }
};

export const processExitRequest = async (applicationId, accept) => {
  try {
    const response = await api.post(`/proyectos/solicitudes-salida/${applicationId}/procesar?accept=${accept}`);
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Error al procesar salida" };
  }
};

// TASKS
export const createProjectTask = async (projectId, taskData) => {
  try {
    const response = await api.post(`/proyectos/${projectId}/tareas`, taskData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Error al crear tarea" };
  }
};

export const getProjectTasks = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${proyectoId}/tareas`);
    return response.data;
  } catch (error) {
    // If projetoId is undefined, check if it's because of a typo in my code or if I should use projectId
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Re-writing getProjectTasks with correct variable name
export const getTasks = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${projectId}/tareas`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await api.put(`/proyectos/tareas/${taskId}/status`, { status });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Error al actualizar estado" };
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

export const getProjectCollaborators = async (projectId) => {
  try {
    const response = await api.get(`/proyectos/${projectId}/colaboradores`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collaborators:", error);
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
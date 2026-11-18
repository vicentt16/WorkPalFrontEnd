
import api from "./api";

const errorMessage = (error, fallback) =>
  error.response?.data?.detail || fallback;

export const getSupervisedProjects = async () => {
  try {
    const response = await api.get(
      "/profesores/me/proyectos"
    );
    return response.data;
  } catch (error) {
    throw new Error(
      errorMessage(error, "No se pudieron cargar los proyectos")
    );
  }
};

export const subscribeToProject = async (projectId) => {
  try {
    const response = await api.post(
      `/profesores/me/proyectos/${projectId}`
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: errorMessage(
        error,
        "No se pudo seguir el proyecto"
      ),
    };
  }
};

export const unsubscribeFromProject = async (projectId) => {
  try {
    await api.delete(
      `/profesores/me/proyectos/${projectId}`
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: errorMessage(
        error,
        "No se pudo dejar de seguir el proyecto"
      ),
    };
  }
};

export const getSupervisedProjectDetails = async (projectId) => {
  const response = await api.get(
    `/profesores/me/proyectos/${projectId}`
  );
  return response.data;
};

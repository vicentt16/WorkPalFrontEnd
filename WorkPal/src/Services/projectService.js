import api from "./api";

export const getAllProjects =
  async () => {
    try {
      const response = await api.get(
        "/proyectos"
      );

      return response.data;
    } catch (error) {
      console.error(error);

      return [];
    }
  };

export const getProjectById =
  async (id) => {
    try {
      const response = await api.get(
        `/proyectos/${id}`
      );

      return response.data;
    } catch {
      return null;
    }
  };

export const createProject =
  async (projectData) => {
    try {
      const response = await api.post(
        "/proyectos",
        projectData
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.detail ||
          "Error al crear proyecto",
      };
    }
  };
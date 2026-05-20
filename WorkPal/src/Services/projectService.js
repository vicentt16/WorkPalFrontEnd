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
      const token =
        localStorage.getItem(
          "workpal_token"
        );

      const response = await api.post(
        "/proyectos",
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.log(
        error.response?.data
      );

      return {
        success: false,
        message:
          error.response?.data
            ?.detail ||
          "Error al crear proyecto",
      };
    }
  };
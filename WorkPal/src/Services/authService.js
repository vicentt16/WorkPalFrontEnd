import api from "./api";

export const registerUser = async (
  userData
) => {
  try {
    const response = await api.post(
      "/auth/register",
      {
        username: userData.email,
        password: userData.password,
      }
    );

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        "Error al registrar usuario",
    };
  }
};

export const loginUser = async (
  email,
  password
) => {
  try {
    const formData = new FormData();

    formData.append("username", email);

    formData.append("password", password);

    const response = await api.post(
      "/auth/token",
      formData
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
        "Credenciales inválidas",
    };
  }
};

export const getCurrentUser =
  async () => {
    try {
      const response = await api.get(
        "/auth/me"
      );

      return response.data;
    } catch {
      return null;
    }
  };
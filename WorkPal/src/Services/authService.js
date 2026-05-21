import api from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      username: userData.email, // Using email as username for now
      password: userData.password,
    });
    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Error en el registro",
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post("/auth/token", formData);
    
    // The backend sets a cookie, but let's also store the token if returned
    if (response.data.access_token) {
      localStorage.setItem("workpal_token", response.data.access_token);
    }

    // Get user info
    const meResponse = await api.get("/auth/me");
    const user = meResponse.data;

    localStorage.setItem("workpal_user", JSON.stringify(user));

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Credenciales incorrectas",
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("workpal_user");
  localStorage.removeItem("workpal_token");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("workpal_user"));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("workpal_token");
};
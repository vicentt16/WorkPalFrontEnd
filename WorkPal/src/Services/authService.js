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

export const createAlumnoProfile = async (profileData) => {
  try {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("last_name", profileData.lastName);
    formData.append("carrera", profileData.career);
    formData.append("skills", Array.isArray(profileData.skills) ? profileData.skills.join(", ") : profileData.skills);
    
    if (profileData.image) {
      formData.append("imagen", profileData.image);
    }
    
    const response = await api.post("/alumnos/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      profile: {
        ...response.data,
        skills: response.data.skills ? response.data.skills.split(",").map(s => s.trim()) : []
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Error al crear el perfil de alumno",
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
      sessionStorage.setItem("workpal_token", response.data.access_token);
    }

    // Get user info
    const meResponse = await api.get("/auth/me");
    let user = meResponse.data;

    // Try to get alumno info
    try {
      const alumnoResponse = await api.get("/alumnos/me");
      const alumnoData = alumnoResponse.data;
      // Parse skills string to array
      if (alumnoData.skills && typeof alumnoData.skills === "string") {
        alumnoData.skills = alumnoData.skills.split(",").map(s => s.trim());
      } else if (!alumnoData.skills) {
        alumnoData.skills = [];
      }
      user = { ...user, ...alumnoData };
    } catch (e) {
      console.log("No alumno profile found yet");
    }

    sessionStorage.setItem("workpal_user", JSON.stringify(user));

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
  sessionStorage.removeItem("workpal_user");
  sessionStorage.removeItem("workpal_token");
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("workpal_user"));
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("workpal_token");
};
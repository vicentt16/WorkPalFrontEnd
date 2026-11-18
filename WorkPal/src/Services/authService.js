import api from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      username: userData.email,
      password: userData.password,
      role: userData.role,
    });

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

export const createProfesorProfile = async (profileData) => {
  try {
    const formData = new FormData();

    formData.append("name", profileData.name);
    formData.append("last_name", profileData.lastName);
    formData.append("departamento", profileData.department || "");

    if (profileData.image) {
      formData.append("imagen", profileData.image);
    }

    const response = await api.post("/profesores/", formData);

    return {
      success: true,
      profile: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        "Error al crear el perfil de profesor",
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post("/auth/token", formData);

    if (response.data.access_token) {
      sessionStorage.setItem(
        "workpal_token",
        response.data.access_token
      );
    }

    const meResponse = await api.get("/auth/me");
    const account = meResponse.data;

    // El rol debe venir del backend.
    const role = account.role;

    if (!["alumno", "profesor"].includes(role)) {
      throw new Error("La cuenta no tiene un rol válido");
    }

    let profile = {};

    try {
      if (role === "profesor") {
        const result = await api.get("/profesores/me");
        profile = result.data;
      } else {
        const result = await api.get("/alumnos/me");
        profile = result.data;

        if (typeof profile.skills === "string") {
          profile.skills = profile.skills
            .split(",")
            .map((skill) => skill.trim());
        }
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        throw error;
      }
    }

    const user = {
      ...account,
      ...profile,
      role,
      // Preservamos el ID de autenticación.
      id: account.id,
    };

    sessionStorage.setItem(
      "workpal_user",
      JSON.stringify(user)
    );

    return {
      success: true,
      user,
    };
  } catch (error) {
    sessionStorage.removeItem("workpal_token");
    sessionStorage.removeItem("workpal_user");

    return {
      success: false,
      message:
        error.response?.data?.detail ||
        error.message ||
        "Credenciales incorrectas",
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
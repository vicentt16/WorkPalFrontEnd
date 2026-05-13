// =========================================
// AUTH SERVICE
// =========================================

// Obtener usuarios registrados
const getUsers = () => {
  return (
    JSON.parse(localStorage.getItem("workpal_users")) || []
  );
};

// Guardar usuarios
const saveUsers = (users) => {
  localStorage.setItem(
    "workpal_users",
    JSON.stringify(users)
  );
};

// =========================================
// REGISTER
// =========================================

export const registerUser = (userData) => {
  const users = getUsers();

  // Verificar si el correo ya existe
  const existingUser = users.find(
    (user) => user.email === userData.email
  );

  if (existingUser) {
    return {
      success: false,
      message: "El correo ya está registrado",
    };
  }

  // Crear nuevo usuario
  const newUser = {
    id: Date.now(),
    name: userData.name,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    career: userData.career,
    skills: userData.skills || [],
    createdAt: new Date(),
  };

  users.push(newUser);

  saveUsers(users);

  return {
    success: true,
    message: "Usuario registrado correctamente",
    user: newUser,
  };
};

// =========================================
// LOGIN
// =========================================

export const loginUser = (email, password) => {
  const users = getUsers();

  const foundUser = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!foundUser) {
    return {
      success: false,
      message: "Correo o contraseña incorrectos",
    };
  }

  // Guardar sesión
  localStorage.setItem(
    "workpal_user",
    JSON.stringify(foundUser)
  );

  return {
    success: true,
    message: "Inicio de sesión exitoso",
    user: foundUser,
  };
};

// =========================================
// LOGOUT
// =========================================

export const logoutUser = () => {
  localStorage.removeItem("workpal_user");
};

// =========================================
// GET CURRENT USER
// =========================================

export const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem("workpal_user")
  );
};

// =========================================
// CHECK AUTH
// =========================================

export const isAuthenticated = () => {
  return !!localStorage.getItem("workpal_user");
};
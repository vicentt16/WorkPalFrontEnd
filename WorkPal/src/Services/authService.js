const getUsers = () => {
  return (
    JSON.parse(localStorage.getItem("workpal_users")) || []
  );
};

const saveUsers = (users) => {
  localStorage.setItem(
    "workpal_users",
    JSON.stringify(users)
  );
};

export const registerUser = (userData) => {
  const users = getUsers();

  const existingUser = users.find(
    (user) => user.email === userData.email
  );

  if (existingUser) {
    return {
      success: false,
      message: "El correo ya está registrado",
    };
  }

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

export const logoutUser = () => {
  localStorage.removeItem("workpal_user");
};

export const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem("workpal_user")
  );
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("workpal_user");
};
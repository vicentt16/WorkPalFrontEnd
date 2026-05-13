const getProjects = () => {
  return (
    JSON.parse(localStorage.getItem("workpal_projects")) ||
    []
  );
};

const saveProjects = (projects) => {
  localStorage.setItem(
    "workpal_projects",
    JSON.stringify(projects)
  );
};

export const createProject = (projectData) => {
  const currentUser = JSON.parse(
    localStorage.getItem("workpal_user")
  );

  if (!currentUser) {
    return {
      success: false,
      message: "Usuario no autenticado",
    };
  }

  const projects = getProjects();

  const newProject = {
    id: Date.now(),

    title: projectData.title,

    category: projectData.category,

    description: projectData.description,

    fullDescription:
      projectData.fullDescription ||
      projectData.description,

    skills: projectData.skills || [],

    vacancies: projectData.vacancies || 1,

    finishDate: projectData.finishDate,

    image:
      projectData.image ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

    ownerId: currentUser.id,

    ownerName:
      currentUser.name +
      " " +
      currentUser.lastName,

    members: [
      currentUser.name +
        " " +
        currentUser.lastName,
    ],

    applicants: [],

    createdAt: new Date(),

    status: "Activo",
  };

  projects.push(newProject);

  saveProjects(projects);

  return {
    success: true,
    message: "Proyecto creado correctamente",
    project: newProject,
  };
};

export const getAllProjects = () => {
  return getProjects();
};

export const getProjectById = (projectId) => {
  const projects = getProjects();

  return projects.find(
    (project) => project.id === Number(projectId)
  );
};

export const searchProjects = (
  searchText,
  category
) => {
  const projects = getProjects();

  return projects.filter((project) => {
    const matchesSearch =
      project.title
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      project.skills.some((skill) =>
        skill
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );

    const matchesCategory =
      category === "Todas" ||
      project.category === category;

    return matchesSearch && matchesCategory;
  });
};

export const applyToProject = (projectId) => {
  const currentUser = JSON.parse(
    localStorage.getItem("workpal_user")
  );

  if (!currentUser) {
    return {
      success: false,
      message: "Debes iniciar sesión",
    };
  }

  const projects = getProjects();

  const projectIndex = projects.findIndex(
    (project) => project.id === Number(projectId)
  );

  if (projectIndex === -1) {
    return {
      success: false,
      message: "Proyecto no encontrado",
    };
  }

  const project = projects[projectIndex];

  if (project.vacancies <= 0) {
    return {
      success: false,
      message: "No hay vacantes disponibles",
    };
  }

  const alreadyApplied =
    project.applicants.includes(currentUser.id);

  if (alreadyApplied) {
    return {
      success: false,
      message:
        "Ya has aplicado a este proyecto",
    };
  }

  project.applicants.push(currentUser.id);

  saveProjects(projects);

  return {
    success: true,
    message: "Solicitud enviada correctamente",
  };
};

export const getUserProjects = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("workpal_user")
  );

  if (!currentUser) return [];

  const projects = getProjects();

  return projects.filter(
    (project) =>
      project.ownerId === currentUser.id
  );
};

export const deleteProject = (projectId) => {
  const projects = getProjects();

  const filteredProjects = projects.filter(
    (project) => project.id !== Number(projectId)
  );

  saveProjects(filteredProjects);

  return {
    success: true,
    message: "Proyecto eliminado",
  };
};
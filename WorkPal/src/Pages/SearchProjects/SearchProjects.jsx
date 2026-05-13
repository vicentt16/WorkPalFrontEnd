import { useEffect, useState } from "react";

import Navbar from "../../Components/Navbar/Navbar";

import SearchBar from "../../Components/SearchBar/SearchBar";

import ProjectCard from "../../Components/ProjectCard/ProjectCard";

import fakeProjects from "../../Data/fakeProjects";

import { getAllProjects, } from "../../Services/projectService";

import "./SearchProjects.css";

export default function SearchProjects() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("Todas");

  const [projects, setProjects] =
    useState([]);

  // Inicializar fake projects
  useEffect(() => {
    const existingProjects =
      localStorage.getItem(
        "workpal_projects"
      );

    if (!existingProjects) {
      localStorage.setItem(
        "workpal_projects",
        JSON.stringify(fakeProjects)
      );
    }

    const loadedProjects =
      getAllProjects();

    setProjects(loadedProjects);
  }, []);

  // Filtrar proyectos
  const filteredProjects =
    projects.filter((project) => {
      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        project.skills.some((skill) =>
          skill
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      const matchesCategory =
        category === "Todas" ||
        project.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="search-projects-page">
      <Navbar />

      <div className="search-projects-container">
        {/* HEADER */}
        <div className="search-projects-header">
          <h1>Buscar Proyectos</h1>

          <p>
            Explora proyectos y encuentra
            uno en el que quieras colaborar.
          </p>
        </div>

        {/* SEARCHBAR */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {/* PROJECTS */}
        <div className="projects-grid">
          {filteredProjects.length >
          0 ? (
            filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              )
            )
          ) : (
            <div className="no-projects">
              <h2>
                No se encontraron
                proyectos
              </h2>

              <p>
                Intenta cambiar los
                filtros de búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
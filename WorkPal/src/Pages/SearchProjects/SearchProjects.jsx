import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { getAllProjects } from "../../Services/projectService";
import "./SearchProjects.css";

export default function SearchProjects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.skill.toLowerCase().includes(search.toLowerCase());

    // backend currently doesn't have explicit category field, but we can add it or ignore for now
    const matchesCategory = category === "Todas"; 

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="search-projects-page">
      <Navbar />

      <div className="search-projects-container">
        {/* HEADER */}
        <div className="search-projects-header">
          <h1>Buscar Proyectos</h1>

          <p>
            Explora proyectos y encuentra uno en el que quieras colaborar.
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
          {loading ? (
            <p>Cargando proyectos...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  title: project.name, // Adapting backend fields to component expectations
                  skills: project.skill.split(",").map(s => s.trim())
                }}
              />
            ))
          ) : (
            <div className="no-projects">
              <h2>No se encontraron proyectos.</h2>
              <p>Intenta cambiar los filtros de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
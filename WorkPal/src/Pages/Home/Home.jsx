import { useNavigate } from "react-router-dom";

import { ProjectUpperBar } from "../../Modules/ProjectUpperBar";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <ProjectUpperBar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Construye proyectos increíbles junto a
            personas con tus mismos intereses
          </h1>

          <p>
            WorkPal conecta estudiantes, desarrolladores
            y creadores para colaborar en proyectos reales
            y ganar experiencia.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() => navigate("/search")}
            >
              Buscar Proyectos
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                navigate("/create-project")
              }
            >
              Crear Proyecto
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>¿Qué puedes hacer en WorkPal?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Explorar Proyectos</h3>

            <p>
              Encuentra proyectos según tus habilidades,
              intereses y tecnologías favoritas.
            </p>
          </div>

          <div className="feature-card">
            <h3>Crear Equipos</h3>

            <p>
              Publica tus ideas y recluta colaboradores
              para trabajar juntos.
            </p>
          </div>

          <div className="feature-card">
            <h3>Ganar Experiencia</h3>

            <p>
              Participa en proyectos reales y fortalece
              tu portafolio profesional.
            </p>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="categories-section">
        <h2>Categorías Populares</h2>

        <div className="categories-grid">
          <div className="category-card">
            <h3>Desarrollo Web</h3>
          </div>

          <div className="category-card">
            <h3>Aplicaciones Móviles</h3>
          </div>

          <div className="category-card">
            <h3>Inteligencia Artificial</h3>
          </div>

          <div className="category-card">
            <h3>Diseño UI/UX</h3>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>¿Listo para colaborar?</h2>

          <p>
            Únete a proyectos innovadores y conecta con
            otros desarrolladores.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/search")}
          >
            Comenzar Ahora
          </button>
        </div>
      </section>
    </div>
  );
}
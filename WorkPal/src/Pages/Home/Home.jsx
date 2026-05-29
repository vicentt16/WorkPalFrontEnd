import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../Context/AuthContext";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://localhost:8000${path}`;
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">

          <h1>
            Bienvenido a{" "}
            <span>WorkPal</span>
          </h1>

          <p>
            Conecta con personas, crea
            proyectos increíbles y colabora
            en equipo para transformar ideas
            en realidad.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() =>
                navigate("/search")
              }
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

        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="WorkPal Team"
            className="hero-image"
          />
        </div>
      </section>

      {/* USER SECTION */}
      <section className="user-section">
        <div className="user-card">
          <div className="user-avatar">
            {currentUser?.imagen_url ? (
              <img src={getImageUrl(currentUser.imagen_url)} alt={currentUser.name} className="user-photo" />
            ) : (
              currentUser?.name?.charAt(0).toUpperCase()
            )}
          </div>

          <div className="user-info">
            <h2>
              {currentUser?.name}{" "}
              {currentUser?.last_name || currentUser?.lastName}
            </h2>

            <p>
              {currentUser?.carrera || currentUser?.career}
            </p>

            <div className="skills-container">
              {currentUser?.skills?.map(
                (skill) => (
                  <span
                    className="skill-badge"
                    key={skill}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>
          ¿Qué puedes hacer en WorkPal?
        </h2>

        <div className="features-grid">
          {/* FEATURE 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              🔍
            </div>

            <h3>Buscar Proyectos</h3>

            <p>
              Encuentra proyectos alineados
              con tus intereses y habilidades.
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              🤝
            </div>

            <h3>Colaborar</h3>

            <p>
              Trabaja en equipo con personas
              apasionadas por crear.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              💡
            </div>

            <h3>Crear Ideas</h3>

            <p>
              Publica tus propios proyectos y
              encuentra colaboradores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
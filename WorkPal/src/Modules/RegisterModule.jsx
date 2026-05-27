import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddImage } from "./addImage";
import { HabilitiesModule } from "./HabilitiesModule";
import { ProjectUpperBar } from "./ProjectUpperBar";
import { HabilitiesPopUp } from "./HabilitiesPopUp";
import { createProject } from "../Services/projectService";
import "./RegisterModule.css";

import returnIcon from "/src/Images/returnIcon.png";
import createIcon from "/src/Images/createIcon.png";
import addIcon from "/src/Images/addIcon.png";
import okIcon from "/src/Images/okIcon.png";

export function RegisterModule() {
  const navigate = useNavigate();
  const [projectHabilities, setProjectHabilities] = useState([]);
  const [projectImage, setProjectImage] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [showHabilitiesPopup, setShowHabilitiesPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const guardarDatos = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!projectTitle || !projectDescription || projectHabilities.length === 0) {
      setErrorMessage("Por favor rellena los campos obligatorios (*)");
      return;
    }

    try {
      const result = await createProject({
        title: projectTitle,
        description: projectDescription,
        skills: projectHabilities,
        image: projectImage[0] || "", // Using first image if available
        finishDate: finishDate,
      });

      if (result.success) {
        alert("Proyecto creado con éxito");
        navigate("/search");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al conectar con el servidor");
    }
  };

  return (
    <form className="total" onSubmit={guardarDatos}>
      <div className="upper-panel">
        <button className="upper-panel-button" type="button" onClick={() => navigate(-1)}>
          <img src={returnIcon} alt="returnIcon" />
          <h2>Volver</h2>
        </button>

        <div className="upper-panel-text">
          <h1>Crear Proyecto</h1>
          <h2>Publica tu proyecto y encuentra colaboradores</h2>
        </div>
      </div>

      <div className="register-module">
        <section className="register-section">
          <img
            src={createIcon}
            alt="Create Image"
            className="create-icon-info"
          />
          <h2>Detalles del Proyecto</h2>
        </section>

        {errorMessage && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{errorMessage}</div>}

        <section className="info-section">
          <h2>Titulo del Proyecto*</h2>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Titulo del Proyecto"
          />
        </section>

        <section className="info-section">
          <h2>Descripción del Proyecto*</h2>

          <input
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Descripción del Proyecto"
            className="description-input"
          />
        </section>

        <section className="info-section">
          <h2>Imagenes del Proyecto</h2>

          <div className="add-image-scroll">
            <AddImage projectImage={projectImage} />
          </div>

          <button type="button" onClick={() => document.getElementById("file-input").click()}>
            <img src={addIcon} alt="" />
            <h2>Agregar Imagen</h2>
          </button>

          <input
            id="file-input"
            type="file"
            className="file-input"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // In a real app, you'd upload this to a server
                setProjectImage((prev) => [...prev, URL.createObjectURL(file)]);
              }
            }}
          />
        </section>

        <section className="date-input">
          <div className="date-section">
            <h2>Fecha de Inicio</h2>
            <input type="date" disabled value={new Date().toISOString().split('T')[0]} />
          </div>

          <div className="date-section">
            <h2>Fecha de Entrega*</h2>
            <input 
              type="date" 
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
            />
          </div>
        </section>

        <section>
          <h2>Habilidades Necesarias*</h2>

          <section className="habilities">
            {projectHabilities.map((habilidad, index) => (
              <HabilitiesModule key={index} habilidad={habilidad} />
            ))}
          </section>

          <button type="button" onClick={() => setShowHabilitiesPopup(true)}>
            <img src={addIcon} alt="" />
            <h2>Agregar Habilidad</h2>
          </button>
        </section>

        <button className="ok-button" type="submit">
          <img src={okIcon} alt="Ok Icon" />
          <h2>Registrar Proyecto</h2>
        </button>

        {showHabilitiesPopup && (
          <HabilitiesPopUp
            onSubmit={(newHabilidad) => {
              if (!projectHabilities.includes(newHabilidad)) {
                setProjectHabilities((prev) => [...prev, newHabilidad]);
              }
              setShowHabilitiesPopup(false);
            }}
            onClose={() => setShowHabilitiesPopup(false)}
          />
        )}
      </div>
    </form>
  );
}

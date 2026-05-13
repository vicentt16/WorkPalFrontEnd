import "./RegisterModule.css";
import { AddImage } from "./addImage";
import { useState } from "react";
import { HabilitiesModule } from "./HabilitiesModule";
import { ProjectUpperBar } from "./ProjectUpperBar";
import { HabilitiesPopUp } from "./HabilitiesPopUp";
import axios from "axios";

import returnIcon from "/src/Images/returnIcon.png";
import createIcon from "/src/Images/createIcon.png";
import addIcon from "/src/Images/addIcon.png";
import okIcon from "/src/Images/okIcon.png";

export function RegisterModule() {
  const [projectHabilities, setProjectHabilities] = useState([]);
  const [projectImage, setProjectImage] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [showHabilitiesPopup, setShowHabilitiesPopup] = useState(false);

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api", {
        projectTitle,
        projectDescription,
        projectImage,
        projectHabilities,
      });
      alert("Datos guardados");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="total" onSubmit={guardarDatos}>
      <textarea/>

      <div className="upper-panel">
        <button className="upper-panel-button">
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
          <h2>Imagenes del Proyecto*</h2>

          <div className="add-image-scroll">
            <AddImage projectImage={projectImage} />
          </div>

          <button onClick={() => document.getElementById("file-input").click()}>
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
                setProjectImage((prev) => [...prev, URL.createObjectURL(file)]);
              }
            }}
          />
        </section>

        <section className="date-input">
          <div className="date-section">
            <h2>Fecha de Inicio*</h2>
            <input type="date" />
          </div>

          <div className="date-section">
            <h2>Fecha de Entrega*</h2>
            <input type="date" />
          </div>
        </section>

        <section>
          <h2>Habilidades Necesarias*</h2>

          <section className="habilities">
            {projectHabilities.map((habilidad, index) => (
              <HabilitiesModule key={index} habilidad={habilidad} />
            ))}
          </section>

          <button onClick={() => setShowHabilitiesPopup(true)}>
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
              setProjectHabilities((prev) => [...prev, newHabilidad]);
              setShowHabilitiesPopup(false);
            }}
            onClose={() => setShowHabilitiesPopup(false)}
          />
        )}
      </div>
    </form>
  );
}

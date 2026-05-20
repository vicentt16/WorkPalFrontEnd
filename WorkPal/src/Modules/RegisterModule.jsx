import "./RegisterModule.css";

import { AddImage } from "./addImage";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { HabilitiesModule } from "./HabilitiesModule";

import { ProjectUpperBar } from "./ProjectUpperBar";

import { HabilitiesPopUp } from "./HabilitiesPopUp";

import { createProject } from "../Services/projectService";

import returnIcon from "/src/Images/returnIcon.png";
import createIcon from "/src/Images/createIcon.png";
import addIcon from "/src/Images/addIcon.png";
import okIcon from "/src/Images/okIcon.png";

export function RegisterModule() {
  const navigate = useNavigate();

  const [projectHabilities, setProjectHabilities] =
    useState([]);

  const [projectImage, setProjectImage] =
    useState([]);

  const [projectTitle, setProjectTitle] =
    useState("");

  const [
    projectDescription,
    setProjectDescription,
  ] = useState("");

  const [
    showHabilitiesPopup,
    setShowHabilitiesPopup,
  ] = useState(false);

  const [fechaInicio, setFechaInicio] =
    useState("");

  const [fechaEntrega, setFechaEntrega] =
    useState("");

  const guardarDatos = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (
      !projectTitle ||
      !projectDescription
    ) {
      alert(
        "Completa todos los campos obligatorios"
      );

      return;
    }

    try {
      const proyecto = {
        nombre: projectTitle,

        descripcion:
          projectDescription,

        habilidades:
          projectHabilities,

        imagen:
          projectImage[0] || "",

        fecha_inicio: fechaInicio,

        fecha_entrega:
          fechaEntrega,
      };

      console.log(proyecto);

      const response =
        await createProject(proyecto);

      if (!response.success) {
        alert(response.message);

        return;
      }

      alert(
        "Proyecto registrado correctamente"
      );

      navigate("/search");
    } catch (error) {
      console.log(error);

      alert(
        "Error al registrar proyecto"
      );
    }
  };

  return (
    <form
      className="total"
      onSubmit={guardarDatos}
    >
      <ProjectUpperBar />

      <div className="upper-panel">
        <button
          type="button"
          className="upper-panel-button"
          onClick={() =>
            navigate("/home")
          }
        >
          <img
            src={returnIcon}
            alt="returnIcon"
          />

          <h2>Volver</h2>
        </button>

        <div className="upper-panel-text">
          <h1>Crear Proyecto</h1>

          <h2>
            Publica tu proyecto y encuentra
            colaboradores
          </h2>
        </div>
      </div>

      <div className="register-module">
        {/* DETAILS */}
        <section className="register-section">
          <img
            src={createIcon}
            alt="Create Image"
            className="create-icon-info"
          />

          <h2>
            Detalles del Proyecto
          </h2>
        </section>

        {/* TITLE */}
        <section className="info-section">
          <h2>
            Título del Proyecto*
          </h2>

          <input
            type="text"
            value={projectTitle}
            onChange={(e) =>
              setProjectTitle(
                e.target.value
              )
            }
            placeholder="Título del Proyecto"
          />
        </section>

        {/* DESCRIPTION */}
        <section className="info-section">
          <h2>
            Descripción del Proyecto*
          </h2>

          <input
            type="text"
            value={projectDescription}
            onChange={(e) =>
              setProjectDescription(
                e.target.value
              )
            }
            placeholder="Descripción del Proyecto"
            className="description-input"
          />
        </section>

        {/* IMAGES */}
        <section className="info-section">
          <h2>
            Imágenes del Proyecto*
          </h2>

          <div className="add-image-scroll">
            <AddImage
              projectImage={
                projectImage
              }
            />
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById(
                  "file-input"
                )
                .click()
            }
          >
            <img
              src={addIcon}
              alt=""
            />

            <h2>
              Agregar Imagen
            </h2>
          </button>

          <input
            id="file-input"
            type="file"
            className="file-input"
            onChange={(e) => {
              const file =
                e.target.files[0];

              if (file) {
                setProjectImage(
                  (prev) => [
                    ...prev,
                    URL.createObjectURL(
                      file
                    ),
                  ]
                );
              }
            }}
          />
        </section>

        {/* DATES */}
        <section className="date-input">
          <div className="date-section">
            <h2>
              Fecha de Inicio*
            </h2>

            <input
              type="date"
              value={fechaInicio}
              onChange={(e) =>
                setFechaInicio(
                  e.target.value
                )
              }
            />
          </div>

          <div className="date-section">
            <h2>
              Fecha de Entrega*
            </h2>

            <input
              type="date"
              value={fechaEntrega}
              onChange={(e) =>
                setFechaEntrega(
                  e.target.value
                )
              }
            />
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <h2>
            Habilidades Necesarias*
          </h2>

          <section className="habilities">
            {projectHabilities.map(
              (
                habilidad,
                index
              ) => (
                <HabilitiesModule
                  key={index}
                  habilidad={
                    habilidad
                  }
                />
              )
            )}
          </section>

          <button
            type="button"
            onClick={() =>
              setShowHabilitiesPopup(
                true
              )
            }
          >
            <img
              src={addIcon}
              alt=""
            />

            <h2>
              Agregar Habilidad
            </h2>
          </button>
        </section>

        {/* SUBMIT */}
        <button
          className="ok-button"
          type="submit"
        >
          <img
            src={okIcon}
            alt="Ok Icon"
          />

          <h2>
            Registrar Proyecto
          </h2>
        </button>

        {/* POPUP */}
        {showHabilitiesPopup && (
          <HabilitiesPopUp
            onSubmit={(
              newHabilidad
            ) => {
              setProjectHabilities(
                (prev) => [
                  ...prev,
                  newHabilidad,
                ]
              );

              setShowHabilitiesPopup(
                false
              );
            }}
            onClose={() =>
              setShowHabilitiesPopup(
                false
              )
            }
          />
        )}
      </div>
    </form>
  );
}
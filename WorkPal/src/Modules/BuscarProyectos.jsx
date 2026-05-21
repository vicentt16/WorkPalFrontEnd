import { ProjectUpperBar } from "./ProjectUpperBar";
import "./BuscarProyectos.css";

import returnIcon from "/src/Images/returnIcon.png";

export function BuscarProyectos() {
  return (
    <div className="total">
      <ProjectUpperBar />
      <textarea />

      <section className="upper-panel">
        <button className="upper-panel-button">
          <img src={returnIcon} alt="returnIcon" />
          <h2>Volver</h2>
        </button>

        <div className="upper-panel-text">
          <h1>Buscar Proyecto</h1>
          <h2>
            Busca algún proyecto interesante al que puedas ayudar con tu
            talento!!
          </h2>
        </div>
      </section>

        <section className="ProjectBarSection">
            <input type="text" className="ProjectSeachBar"/>
        </section>
    </div>
  );
}

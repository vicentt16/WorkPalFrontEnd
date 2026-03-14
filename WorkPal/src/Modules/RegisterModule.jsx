import "./RegisterModule.css";
import { AddImage } from "./addImage";
import {useState} from "react";

export function RegisterModule() {
    
    const [projectImage, setProjectImage] = useState([]);
    const [projectTitle, setProjectTitle] = useState();
    const [projectDescription, setProjectDescription] = useState();

   return(
    <div className="register-module">
        <section className="register-section">
            <img src="\src\Images\createIcon.png" alt="Create Image" className="create-icon-info"/>
            <h2>Detalles del Proyecto</h2>
        </section>
        
        <section className="info-section">
            <h2>Titulo del Proyecto*</h2>
            <input type="text" 
            value={projectTitle} 
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Titulo del Proyecto"/>
        </section>
        
        <section className="info-section">
            <h2>Descripción del Proyecto*</h2>

            <input type="text" 
            value={projectDescription} 
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Descripción del Proyecto"
            className="description-input"/>
        </section>

        
        <section className="info-section">
            <h2>Imagenes del Proyecto*</h2>
            
            <AddImage projectImage={projectImage} />

            <button onClick={() => document.getElementById('file-input').click()}>
                <img src="\src\Images\addIcon.png" alt="" />
                <h2>Agregar Imagen</h2>
            </button>
            <input id="file-input" type="file" className="file-input" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    setProjectImage(prev => [...prev, URL.createObjectURL(file)]);
                }
            }} />

        </section>

        <button className="ok-button">
            <img src="\src\Images\okIcon.png" alt="Ok Icon"/>
            <h2>Registrar Proyecto</h2>
        </button>

    </div>
   ); 
}
import "./RegisterModule.css";
import {useState} from "react";

export function RegisterModule() {
    const [projectTitle, setProjectTitle] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [projectImage, setProjectImage] = useState();

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
            <img src={projectImage} alt="ImagenProyecto" className="project-image"/>

            <button className="image-button">
                <input type="file" onChange={(e) => setProjectImage(URL.createObjectURL(e.target.files[0]))} />
            </button>
        </section>

    </div>
   ); 
}
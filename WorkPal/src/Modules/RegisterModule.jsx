import "./RegisterModule.css";

export function RegisterModule() {
   return(
    <div className="register-module">
        <section className="register-section">
            <img src="" alt="Create Image" />
            <h2>Detalles del Proyecto</h2>
        </section>
        
        <section className="info-section">
            <h2>Titulo del Proyecto*</h2>
            <input/>
        </section>
        
        <section className="info-section">
            <h2>Descripción del Proyecto*</h2>
            <input/>
        </section>

    </div>
   ); 
}
import { useState } from "react";
import "./PersonalizePage.css";

export default function PersonalizePage() {

    const [colorPrincipal, setColorPrincipal] = useState("#ffffff");
    const [colorSecundario, setColorSecundario] = useState("#ffffff");
    const [colorFondo, setColorFondo] = useState("#ffffff");

    const ColorPrincipalDinamico = {
        backgroundColor: colorPrincipal,
    };

    return(
        <>
        <div style={ColorPrincipalDinamico}>
            <p1>Personaliza tu experiencia en WorkPal</p1>
            <div className="color-principal-picker">
                <label htmlFor="color">Selecciona un color Principal:</label>
                <input
                    type="color"
                    id="color"
                    value={colorPrincipal}
                    onChange={(e) => setColorPrincipal(e.target.value)}
                />
            </div>
            <div className="color-secundario-picker">
                <label htmlFor="color">Selecciona un color Secundario:</label>
                <input
                    type="color"
                    id="color"
                    value={colorSecundario}
                    onChange={(e) => setColorSecundario(e.target.value)}
                />
            </div>
            <div className="color-fondo-picker">
                <label htmlFor="color">Selecciona un color de fondo:</label>
                <input
                    type="color"
                    id="color"
                    value={colorFondo}
                    onChange={(e) => setColorFondo(e.target.value)}
                />
            </div>
            <div className="logo-picker">
                <label htmlFor="logo">Selecciona un logo:</label>
                <input
                    type="file"
                    id="logo"
                    accept="image/*"
                />
            </div>
            <button className="save-button"
            onClick={() => {
                document.documentElement.style.setProperty('--color-principal-dinamico', colorPrincipal);
                document.documentElement.style.setProperty('--color-secundario-dinamico', colorSecundario);
                document.documentElement.style.setProperty('--color-fondo-dinamico', colorFondo);
            }}
            >Guardar cambios</button>    
        </div>
        </>
    );
}
import { useState } from "react";
import { getInstitutionalColors, updateInstitutionalColors } from "../../Services/projectService";
import "./PersonalizePage.css";

export default function PersonalizePage() {

    const [institucionalColors, setInstitutionalColors] = useState({
    image: null,
    colorPrincipal: "",
    colorSecundario: "",
    colorFondo: "",
 });

    const fetchInstitutionalColors = async () => {
        const colors = await getInstitutionalColors();
        setInstitutionalColors(colors);
    };

    const handleSaveChanges = async () => {

        const updatedColors = fetchInstitutionalColors();
        updatedColors.colorPrincipal = institucionalColors.colorPrincipal;
        updatedColors.colorSecundario = institucionalColors.colorSecundario;
        updatedColors.colorFondo = institucionalColors.colorFondo;

        await updateInstitutionalColors(updatedColors);
    }

    // const ColorPrincipalDinamico = {
    //     backgroundColor: colorPrincipal,
    // };

    return(
        <>
        <div>
            <p1>Personaliza tu experiencia en WorkPal</p1>
            <div className="color-principal-picker">
                <label htmlFor="color">Selecciona un color Principal:</label>
                <input
                    type="color"
                    id="color"
                    value={institucionalColors.colorPrincipal}
                    onChange={(e) => setInstitutionalColors({...institucionalColors, colorPrincipal: e.target.value})}
                />
            </div>
            <div className="color-secundario-picker">
                <label htmlFor="color">Selecciona un color Secundario:</label>
                <input
                    type="color"
                    id="color"
                    value={institucionalColors.colorSecundario}
                    onChange={(e) => setInstitutionalColors({...institucionalColors, colorSecundario: e.target.value})}
                />
            </div>
            <div className="color-fondo-picker">
                <label htmlFor="color">Selecciona un color de fondo:</label>
                <input
                    type="color"
                    id="color"
                    value={institucionalColors.colorFondo}
                    onChange={(e) => setInstitutionalColors({...institucionalColors, colorFondo: e.target.value})}
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
                handleSaveChanges();
                document.documentElement.style.setProperty('--color-principal-dinamico', institucionalColors.colorPrincipal);
                document.documentElement.style.setProperty('--color-secundario-dinamico', institucionalColors.colorSecundario);
                document.documentElement.style.setProperty('--color-fondo-dinamico', institucionalColors.colorFondo);
            }}
            >Guardar cambios</button>    
        </div>
        </>
    );
}
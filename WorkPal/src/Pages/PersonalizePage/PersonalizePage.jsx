import { useState } from "react";
import "./PersonalizePage.css";

export default function PersonalizePage() {

    const [color, setColor] = useState("#ffffff");

    return(
        <>
        <div>
            <p1>Personaliza tu experiencia en WorkPal</p1>
            <div className="color-picker">
                <label htmlFor="color">Selecciona un color de fondo:</label>
                <input
                    type="color"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
        </div>
        </>
    );
}
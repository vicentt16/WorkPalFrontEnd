
import { useState } from "react";
import "./HabilitiesPopUp.css";

export function HabilitiesPopUp({ onSubmit, onClose }) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = () => {
        if (inputValue.trim()) {
            onSubmit(inputValue.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="habilities-popup-overlay">
            <div className="habilities-popup">
                <section className="popup-title">
                    <h2>Agregue su habilidad</h2>
                </section>

                <section className="popup-input">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ingresa la habilidad necesaria"
                    />
                </section>

                <section className="popup-buttons">
                    <button onClick={handleSubmit}>Agregar</button>
                    <button onClick={onClose}>Cancelar</button>
                </section>
            </div>
        </div>
    );
}
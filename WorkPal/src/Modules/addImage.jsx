

export function AddImage({ projectImage }) {
    // Maneja si projectImage es un array o una sola imagen
    const imageList = Array.isArray(projectImage) ? projectImage : (projectImage ? [projectImage] : []);

    return (
        <div>
            {imageList.map((img, index) => (
                <img key={index} src={img} alt={`ImagenProyecto ${index + 1}`} className="project-image" />
            ))}
        </div>
    );
}
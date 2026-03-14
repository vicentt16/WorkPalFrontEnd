

export function AddImage({projectImage}) {
    const ImageList = [];
    
    ImageList.push(projectImage);

    return (
        <div>
            {ImageList.map((img, index) => (
                <img key={index} src={img} alt="ImagenProyecto" className="project-image" />
            ))}
        </div>
    )
}
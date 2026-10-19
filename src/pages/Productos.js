import { useParams } from 'react-router-dom';
import "./Productos.css"


function Productos() {
    const { categoria } = useParams();

    const nombres = {
        mouse: "Mouse",
        mousepad: "Mousepad",
        teclado: "Teclado",
        skate: "Skate",
        audifonos: "Audífonos",
        mangas: "Mangas"
    }

    const nombre = nombres[categoria] || "Productos"

    return (
        <section className="productos">
            <h1>{nombre}</h1>

            <p>
                Aquí puedes encontrar una variedad de productos relacionados con {nombre}. Explora nuestra selección y encuentra lo que necesitas para mejorar tu experiencia.
            </p>

        </section>

    )
}

export default Productos;
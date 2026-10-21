
import { Link, useParams } from "react-router-dom";
import { BLOGS } from "../../data/blog";
import "../../styles/Blog.css";

function BlogDetalle() {
    const { id } = useParams();

    const blog = BLOGS.find(
        (articulo) => articulo.id === Number(id)
    );

    if (!blog) {
        return (
            <main className="blog-detalle-pagina">
                <div className="volver-cont">
                    <Link className="volver" to="/blogs">
                        ← Volver a Blogs
                    </Link>
                </div>

                <h2>Artículo no encontrado</h2>
                <p>El artículo que buscas no existe.</p>
            </main>
        );
    }

    return (
        <main className="blog-detalle-pagina">
            <div className="volver-cont">
                <Link className="volver" to="/blogs">
                    <span aria-hidden="true">←</span>
                    Volver a Blogs
                </Link>
            </div>

            <article className="blog-detalle">
                <img
                    src={blog.imagen}
                    alt={blog.titulo}
                    className="blog-detalle-imagen"
                />

                <div className="blog-detalle-texto">
                    <span className="fecha-blog">
                        {blog.fecha}
                    </span>

                    <h1>{blog.titulo}</h1>

                    <span className="blog-categoria">
                        {blog.categoria}
                    </span>

                    <p className="blog-resumen">
                        {blog.resumen}
                    </p>

                    <div className="blog-articulo-contenido">
                        {blog.contenido.map((parrafo, index) => (
                            <p key={index}>{parrafo}</p>
                        ))}
                    </div>

                    <Link className="volver-final" to="/blogs">
                        ← Volver a todos los artículos
                    </Link>
                </div>
            </article>
        </main>
    );
}

export default BlogDetalle;

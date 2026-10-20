
import { useState } from "react";
import { Link } from "react-router-dom";
import { BLOGS } from "../data/blog";
import "./Blog.css";

function Blogs() {
    const [busqueda, setBusqueda] = useState("");

    const blogsFiltrados = BLOGS.filter((blog) =>
        `${blog.titulo} ${blog.resumen} ${blog.categoria}`
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase())
    );

    return (
        <main className="pagina-blogs">
            <section className="hero-blogs">
                <img
                    src="/images/banners/banner2.jpg"
                    alt="Periféricos y accesorios tecnológicos"
                />

                <div className="hero-content">
                    <h2>Noticias y consejos tecnológicos</h2>
                    <p>
                        Descubre consejos para elegir y cuidar
                        tus periféricos.
                    </p>
                </div>
            </section>

            <section className="lista-blogs" id="lista-blogs">
                <div className="blogs-encabezado">
                    <h2>Nuestro blog</h2>

                    <input
                        type="search"
                        placeholder="Buscar artículos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        aria-label="Buscar artículos del blog"
                    />
                </div>

                {blogsFiltrados.length > 0 ? (
                    blogsFiltrados.map((blog) => (
                        <article className="blog-card" key={blog.id}>
                            <img
                                src={blog.imagen}
                                alt={blog.titulo}
                                loading="lazy"
                            />

                            <div className="blog-card-contenido">
                                <span className="fecha-blog">
                                    {blog.fecha}
                                </span>

                                <h3>{blog.titulo}</h3>

                                <p>{blog.resumen}</p>

                                <Link to={`/blogs/${blog.id}`}>
                                    Leer artículo
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="blogs-vacio">
                        No se encontraron artículos.
                    </p>
                )}
            </section>
        </main>
    );
}

export default Blogs;

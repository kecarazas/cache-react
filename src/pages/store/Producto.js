import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { todosLosProductos } from "../../data/productos";
import "../../styles/Producto.css";

function Producto() {
    const { slug } = useParams();

    const producto = todosLosProductos.find(
    (item) => item.slug === slug
    );

    const [imagenPrincipal, setImagenPrincipal] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [tabActiva, setTabActiva] = useState("descripcion");

    if (!producto) {
        return (
            <section className="producto-seccion">
                <h1>Producto no encontrado</h1>
                <Link to="/">Volver al inicio</Link>
            </section>
        );
    }

    const imagenes = producto.imagenes || [producto.imagen];

    const imagenActual = imagenPrincipal || imagenes[0];

    const nombresCategorias = {
        mouse: "Mouse",
        audifonos: "Audífonos",
        teclado: "Teclados",
        mousepad: "Mousepads",
        skate: "Skates",
        mangas: "Mangas"
    };

    const formatoPrecio = (precio) =>
        Number(precio).toLocaleString("es-CL");

    const descripcion =
        producto.descripcion || "Descripción próximamente disponible.";

    const opiniones = producto.opiniones || 0;

    return (
        <section className="producto-seccion">

            <div className="breadcrumb">
                <Link to="/">Inicio</Link> /{" "}
                <Link to={`/categoria/${producto.categoria}`}>
                    {nombresCategorias[producto.categoria] || producto.categoria}
                </Link>{" "}
                / <span>{producto.nombre}</span>
            </div>

            <div className="producto-contenedor">

                <div className="producto-galeria">

                    <div className="galeria-principal">
                        <img
                            src={`/images/${imagenActual}`}
                            alt={producto.nombre}
                            id="imagen-principal"
                        />
                    </div>

                    <div className="galeria-miniaturas">
                        {imagenes.map((imagen, index) => (
                            <img
                                key={imagen}
                                src={`/images/${imagen}`}
                                alt={`Vista ${index + 1}`}
                                className={`miniatura ${
                                    imagenActual === imagen ? "activa" : ""
                                }`}
                                onClick={() => setImagenPrincipal(imagen)}
                            />
                        ))}
                    </div>

                </div>

                <div className="producto-info">

                    <span className="producto-marca">
                        {producto.marca || "Marca"}
                    </span>

                    <h1 className="producto-nombre">
                        {producto.nombre}
                    </h1>

                    <div className="producto-valoracion">
                        <span className="estrellas">★★★★☆</span>
                        <span className="valoracion-texto">
                            ({opiniones} opiniones)
                        </span>
                    </div>

                    <div className="producto-precio">

                        <span className="precio-actual">
                            ${formatoPrecio(producto.precio)}
                        </span>

                        {producto.precioAnterior && (
                            <span className="precio-anterior">
                                ${formatoPrecio(producto.precioAnterior)}
                            </span>
                        )}

                        {producto.descuento && (
                            <span className="precio-descuento">
                                -{producto.descuento}%
                            </span>
                        )}

                    </div>

                    <p className="producto-descripcion">
                        {descripcion}
                    </p>

                    <div className="producto-stock">
                        <span className="stock-punto"></span>
                        {producto.stock === false
                            ? "Sin stock"
                            : "En stock — despacho en 24-48 horas"}
                    </div>

                    <div className="producto-cantidad">

                        <label htmlFor="cantidad">Cantidad</label>

                        <div className="selector-cantidad">

                            <button
                                type="button"
                                id="restar"
                                onClick={() =>
                                    setCantidad((actual) =>
                                        Math.max(1, actual - 1)
                                    )
                                }
                            >
                                −
                            </button>

                            <input
                                type="number"
                                id="cantidad"
                                min="1"
                                value={cantidad}
                                onChange={(e) =>
                                    setCantidad(
                                        Math.max(
                                            1,
                                            Number(e.target.value) || 1
                                        )
                                    )
                                }
                            />

                            <button
                                type="button"
                                id="sumar"
                                onClick={() =>
                                    setCantidad((actual) => actual + 1)
                                }
                            >
                                +
                            </button>

                        </div>
                    </div>

                    <div className="producto-acciones">

                        <button
                            type="button"
                            className="btn-agregar-carrito"
                            id="btn-agregar"
                            disabled={producto.stock === false}
                        >
                            Agregar al carrito
                        </button>

                        <button
                            type="button"
                            className="btn-comprar-ahora"
                            disabled={producto.stock === false}
                        >
                            Comprar ahora
                        </button>

                    </div>

                    <ul className="producto-beneficios">
                        <li>Envío gratis en compras sobre $50.000</li>
                        <li>Garantía oficial de 12 meses</li>
                        <li>Retiro en tienda disponible</li>
                    </ul>

                </div>
            </div>

            <div className="producto-tabs">

                <div className="tabs-header">

                    <button
                        type="button"
                        className={`tab-btn ${
                            tabActiva === "descripcion" ? "activa" : ""
                        }`}
                        data-tab="descripcion"
                        onClick={() => setTabActiva("descripcion")}
                    >
                        Descripción
                    </button>

                    <button
                        type="button"
                        className={`tab-btn ${
                            tabActiva === "specs" ? "activa" : ""
                        }`}
                        data-tab="specs"
                        onClick={() => setTabActiva("specs")}
                    >
                        Especificaciones
                    </button>

                    <button
                        type="button"
                        className={`tab-btn ${
                            tabActiva === "opiniones" ? "activa" : ""
                        }`}
                        data-tab="opiniones"
                        onClick={() => setTabActiva("opiniones")}
                    >
                        Opiniones ({opiniones})
                    </button>

                </div>

                <div
                    className={`tab-contenido ${
                        tabActiva === "descripcion" ? "activa" : ""
                    }`}
                    id="descripcion"
                >
                    <p>{descripcion}</p>
                </div>

                <div
                    className={`tab-contenido ${
                        tabActiva === "specs" ? "activa" : ""
                    }`}
                    id="specs"
                >
                    {producto.especificaciones?.length > 0 ? (
                        <table className="specs-tabla">
                            <tbody>
                                {producto.especificaciones.map((spec, index) => {
                                    const [nombre, ...resto] =
                                        typeof spec === "string"
                                            ? spec.split(":")
                                            : [spec.nombre, spec.valor];

                                    return (
                                        <tr key={`${nombre}-${index}`}>
                                            <td>{nombre?.trim()}</td>
                                            <td>{resto.join(":").trim()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay especificaciones disponibles para este producto.</p>
                    )}
                </div>

                <div
                    className={`tab-contenido ${
                        tabActiva === "opiniones" ? "activa" : ""
                    }`}
                    id="opiniones"
                >
                    <p>
                        Aquí puedes conectar tu sistema de reseñas más adelante.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default Producto;
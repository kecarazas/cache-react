import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "./ProductoCard.css";

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  function agregarProducto(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    const resultado = agregarAlCarrito(producto.slug);
    setMensajeCarrito(resultado.mensaje);
  }

  return (
    <article className="producto-card">
      <div className="producto-card-imagen">
        <Link
          to={`/producto/${producto.slug}`}
          className="producto-card-enlace"
          aria-label={`Ver ${producto.nombre}`}
        >
          <img
            src={`/images/${producto.imagen}`}
            alt={producto.nombre}
          />

          {/* Etiqueta de producto nuevo */}
          {producto.etiqueta === "Nuevo!" && (
            <span className="badge badge-nuevo">
              Nuevo!
            </span>
          )}

          {/* Etiqueta de descuento */}
          {producto.descuento && (
            <span className="badge badge-descuento">
              {producto.descuento}
            </span>
          )}
        </Link>
        <button
          type="button"
          className="btn-cart-flotante"
          aria-label={`Agregar ${producto.nombre} al carrito`}
          disabled={producto.stock === false}
          onClick={agregarProducto}
        >
          🛒
        </button>
      </div>

      <Link
        to={`/producto/${producto.slug}`}
        className="producto-card-enlace"
      >
        {/* Marca del producto */}
        {producto.marca && (
          <p className="producto-card-marca">
            {producto.marca}
          </p>
        )}

        {/* Nombre del producto */}
        <h3 className="producto-card-nombre">
          {producto.nombre}
        </h3>

        {/* Precio */}
        <p className="producto-card-precio">
          {producto.precioDesde && "Desde "}

          {producto.precioOriginal && (
            <span className="precio-tachado">
              ${producto.precioOriginal.toLocaleString("es-CL")}
            </span>
          )}

          ${producto.precio.toLocaleString("es-CL")} CLP
        </p>
      </Link>
      {mensajeCarrito && (
        <p className="producto-card-mensaje" role="status">
          {mensajeCarrito}
        </p>
      )}
    </article>
  );
}

export default ProductoCard;

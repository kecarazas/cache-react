import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "./ProductoCard.css";

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  const sinStock = producto.stock === false || producto.stock === 0;
  const precioActual = producto.precioFinal ?? producto.precio;
  const precioTachado = producto.enOferta ? producto.precio : producto.precioOriginal;
  const textoDescuento =
    producto.descuento ||
    (producto.etiqueta && producto.etiqueta !== "Nuevo!" ? producto.etiqueta : null);

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
          {textoDescuento && (
            <span className="badge badge-descuento">
              {textoDescuento}
            </span>
          )}
        </Link>
        <button
          type="button"
          className="btn-cart-flotante"
          aria-label={`Agregar ${producto.nombre} al carrito`}
          disabled={sinStock}
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

          {precioTachado && (
            <span className="precio-tachado">
              ${precioTachado.toLocaleString("es-CL")}
            </span>
          )}

          ${precioActual.toLocaleString("es-CL")} CLP
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

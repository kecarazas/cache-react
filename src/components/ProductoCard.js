import { Link } from "react-router-dom";
import "./ProductoCard.css";

function ProductoCard({ producto }) {
  return (
    <article className="producto-card">
      <Link
        to={`/producto/${producto.slug}`}
        className="producto-card-enlace"
      >
        <div className="producto-card-imagen">
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

          <button
            type="button"
            className="btn-cart-flotante"
            aria-label={`Agregar ${producto.nombre} al carrito`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Agregar al carrito:", producto.nombre);
            }}
          >
            🛒
          </button>
        </div>

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
    </article>
  );
}

export default ProductoCard;

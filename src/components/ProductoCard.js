
import "./ProductoCard.css";

function ProductoCard({ producto }) {
  return (
    <article className="producto-card">
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

        {/* Botón flotante del carrito */}
        <button
          type="button"
          className="btn-cart-flotante"
          aria-label={`Agregar ${producto.nombre} al carrito`}
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
    </article>
  );
}

export default ProductoCard;

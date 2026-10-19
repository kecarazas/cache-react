import ProductoCard from "./ProductoCard";
import "./ProductoGrid.css";

function ProductoGrid({ productos }) {
  return (
    <div className="categoria-grid">
      {productos.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  );
}

export default ProductoGrid;
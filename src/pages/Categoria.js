import { useParams } from "react-router-dom";
import FiltroSidebar from "../components/FiltroSidebar";
import ProductoGrid from "../components/ProductoGrid";
import { productosPorCategoria } from "../data/productos";
import "./Categoria.css";

function Categoria() {
  const { producto } = useParams();

  const nombres = {
    mouse: "Mouse",
    mousepad: "Mousepads",
    teclado: "Teclados",
    skate: "Skates",
    audifonos: "Audífonos",
    mangas: "Mangas"
  };

  const nombre = nombres[producto] || "Productos";

  const productos = productosPorCategoria[producto] || [];

  return (
    <section className="categoria-seccion">
      <FiltroSidebar />

      <main className="categoria-contenido">
        <h1>{nombre}</h1>

        {productos.length > 0 ? (
          <ProductoGrid productos={productos} />
        ) : (
          <p>
            Próximamente encontrarás productos de {nombre}.
          </p>
        )}
      </main>
    </section>
  );
}

export default Categoria;
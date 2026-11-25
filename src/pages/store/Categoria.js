import { useParams } from "react-router-dom";
import FiltroSidebar from "../../components/FiltroSidebar";
import ProductoGrid from "../../components/ProductoGrid";
import { useProductos } from "../../context/ProductosContext";
import "../../styles/Categoria.css";

function Categoria() {
  const { producto } = useParams();
  const { productos: todosLosProductos, cargando, error } = useProductos();

  const nombres = {
    mouse: "Mouse",
    mousepad: "Mousepads",
    teclado: "Teclados",
    skate: "Skates",
    audifonos: "Audífonos",
    mangas: "Mangas",
  };

  const nombre = nombres[producto] || "Productos";

  // Obtener los productos con su slug correspondiente
  const productos = todosLosProductos.filter(
    (item) => item.categoria === producto
  );

  return (
    <section className="categoria-seccion">
      <FiltroSidebar />

      <main className="categoria-contenido">
        <h1>{nombre}</h1>

        {cargando ? (
          <p>Cargando productos…</p>
        ) : error ? (
          <p className="mensaje-error" role="alert">{error}</p>
        ) : productos.length > 0 ? (
          <ProductoGrid productos={productos} />
        ) : (
          <p>Próximamente encontrarás productos de {nombre}.</p>
        )}
      </main>
    </section>
  );
}

export default Categoria;
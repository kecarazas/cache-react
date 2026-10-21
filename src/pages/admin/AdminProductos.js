
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  obtenerProductos,
  eliminarProducto,
  nombreCategoria,
  formatCLP,
} from "../../data/admin";

import "../../styles/admin/Admin.css";

const IMAGEN_PLACEHOLDER = "/images/producto-placeholder.svg";

function MiniaturaProducto({ producto }) {
  const imagenOriginal = producto.imagen
    ? producto.imagen.startsWith("http") || producto.imagen.startsWith("/")
      ? producto.imagen
      : `/${producto.imagen.replace(/^\.?\//, "")}`
    : IMAGEN_PLACEHOLDER;

  const [imagen, setImagen] = useState(imagenOriginal);
  const [sinImagen, setSinImagen] = useState(false);

  function manejarError() {
    if (imagen === IMAGEN_PLACEHOLDER) {
      setSinImagen(true);
      return;
    }

    setImagen(IMAGEN_PLACEHOLDER);
  }

  if (sinImagen) {
    return (
      <span
        className="miniatura miniatura-vacia"
        role="img"
        aria-label={`Imagen no disponible: ${producto.nombre}`}
      >
        Sin imagen
      </span>
    );
  }

  return (
    <img
      className="miniatura"
      src={imagen}
      alt={producto.nombre}
      onError={manejarError}
    />
  );
}

export default function AdminProductos() {
  const { sesion } = useAuth();

  const [productos, setProductos] = useState(() => obtenerProductos());
  const [busqueda, setBusqueda] = useState("");

  const esAdmin = sesion?.tipoUsuario === "administrador";

  const filtrados = useMemo(() => {
    const filtro = busqueda.toLowerCase().trim();

    return productos.filter(
      (p) =>
        String(p.nombre ?? "").toLowerCase().includes(filtro) ||
        String(p.codigo ?? "").toLowerCase().includes(filtro)
    );
  }, [productos, busqueda]);

  function eliminar(codigo) {
    if (!esAdmin) return;

    const confirmar = window.confirm(
      "¿Eliminar este producto? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    eliminarProducto(codigo);
    setProductos(obtenerProductos());
  }

  return (
    <main className="admin-main">
      <div className="admin-topbar">
        <h1>Productos</h1>
        <span className="rol-badge">{sesion?.tipoUsuario}</span>
      </div>

      <section className="admin-panel" id="panel-productos">
        <div className="admin-acciones-top">
          <input
            type="text"
            className="admin-buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o código..."
          />

          {esAdmin && (
            <Link
              className="btn-primario"
              to="/admin/productos/nuevo"
            >
              + Nuevo producto
            </Link>
          )}
        </div>

        <div className="tabla-scroll">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="tabla-vacia">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filtrados.map((p) => {
                  const stockBajo =
                    p.stockCritico != null &&
                    Number(p.stock) <= Number(p.stockCritico);

                  return (
                    <tr key={p.codigo}>
                      <td>
                        <MiniaturaProducto producto={p} />
                      </td>

                      <td>{p.codigo}</td>
                      <td>{p.nombre}</td>
                      <td>{nombreCategoria(p.categoria)}</td>
                      <td>{formatCLP(p.precio)}</td>

                      <td className={stockBajo ? "stock-bajo" : ""}>
                        {p.stock}
                        {stockBajo ? " ⚠" : ""}
                      </td>

                      <td>
                        {esAdmin ? (
                          <div className="fila-acciones">
                            <Link
                              className="accion-editar"
                              to={`/admin/productos/editar/${encodeURIComponent(
                                p.codigo
                              )}`}
                            >
                              Editar
                            </Link>

                            <button
                              type="button"
                              className="accion-eliminar"
                              onClick={() => eliminar(p.codigo)}
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: "#999" }}>
                            Solo lectura
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

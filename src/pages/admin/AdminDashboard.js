import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  obtenerProductos,
  obtenerUsuarios,
} from "../../data/admin";

import "../../styles/admin/Admin.css";

export default function AdminDashboard() {
  const { sesion } = useAuth();

  const productos = useMemo(() => obtenerProductos(), []);
  const usuarios = useMemo(() => obtenerUsuarios(), []);

  const stockCritico = productos.filter(
    (p) =>
      p.stockCritico != null &&
      Number(p.stock) <= Number(p.stockCritico)
  );

  return (
    <main className="admin-main">
      <div className="admin-topbar">
        <h2>¡Hola, {sesion?.nombre}!</h2>

        <span className="rol-badge">
          {sesion?.tipoUsuario}
        </span>
      </div>

      <section className="admin-cards">
        <article className="admin-card">
          <div className="valor">{productos.length}</div>
          <div className="etiqueta">Productos en catálogo</div>
        </article>

        <article className="admin-card alerta">
          <div className="valor">{stockCritico.length}</div>
          <div className="etiqueta">
            Productos con stock crítico
          </div>
        </article>

        {sesion?.tipoUsuario === "administrador" && (
          <article className="admin-card">
            <div className="valor">{usuarios.length}</div>
            <div className="etiqueta">Usuarios registrados</div>
          </article>
        )}
      </section>

      <section className="admin-panel">
        <h3>Alertas de stock crítico</h3>

        {stockCritico.length === 0 ? (
          <p>
            No hay productos con stock crítico por el momento.
          </p>
        ) : (
          <ul>
            {stockCritico.map((p) => (
              <li key={p.codigo}>
                {p.nombre} — quedan{" "}
                <strong>{p.stock}</strong> unidades
                {" "}(código {p.codigo})
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
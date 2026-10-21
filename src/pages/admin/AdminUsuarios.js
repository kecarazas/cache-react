import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  obtenerUsuarios,
  eliminarUsuario,
} from "../../data/admin";

import "../../styles/admin/Admin.css";

export default function AdminUsuarios() {
  const { sesion } = useAuth();

  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());
  const [busqueda, setBusqueda] = useState("");

  const filtrados = useMemo(() => {
    const filtro = busqueda.toLowerCase().trim();

    return usuarios.filter((u) =>
      `${u.nombre} ${u.apellidos}`
        .toLowerCase()
        .includes(filtro) ||
      u.correo.toLowerCase().includes(filtro) ||
      String(u.run).toLowerCase().includes(filtro)
    );
  }, [usuarios, busqueda]);

  function eliminar(correo) {
    if (correo === sesion?.correo) {
      window.alert("No puedes eliminar tu propia cuenta.");
      return;
    }

    const confirmar = window.confirm(
      "¿Eliminar usuario? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    eliminarUsuario(correo);
    setUsuarios(obtenerUsuarios());
  }

  return (
    <main className="admin-main">
      <div className="admin-topbar">
        <h1>Usuarios</h1>

        <span className="rol-badge">
          {sesion?.tipoUsuario}
        </span>
      </div>

      <section className="admin-panel">
        <div className="admin-acciones-top">
          <input
            type="text"
            className="admin-buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, correo o RUN..."
          />

          <Link
            className="btn-primario"
            to="/admin/usuarios/nuevo"
          >
            + Nuevo usuario
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo de usuario</th>
                <th>Región</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="tabla-vacia">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                filtrados.map((u) => (
                  <tr key={u.run}>
                    <td>{u.run}</td>

                    <td>
                      {u.nombre} {u.apellidos}
                    </td>

                    <td>{u.correo}</td>

                    <td>
                      <span
                        className={`badge-rol ${u.tipoUsuario}`}
                      >
                        {u.tipoUsuario}
                      </span>
                    </td>

                    <td>{u.region || "-"}</td>

                    <td>
                      <div className="fila-acciones">
                        <Link
                          className="accion-editar"
                          to={`/admin/usuarios/editar/${encodeURIComponent(
                            u.correo
                          )}`}
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          className="accion-eliminar"
                          disabled={u.correo === sesion?.correo}
                          title={
                            u.correo === sesion?.correo
                              ? "No puedes eliminar tu propia cuenta"
                              : "Eliminar usuario"
                          }
                          onClick={() => eliminar(u.correo)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

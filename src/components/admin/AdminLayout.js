import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin/Admin.css";

export default function AdminLayout() {
  const { sesion, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  if (!sesion) return null;

  const esAdmin = sesion.tipoUsuario === "administrador";
  const esVendedor = sesion.tipoUsuario === "vendedor";

  if (!esAdmin && !esVendedor) return null;

  function salir() {
    cerrarSesion();
    navigate("/login", { replace: true });
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Art Tools</h2>
          <span>Panel administrativo</span>
        </div>

        <nav className="admin-menu">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>

          <NavLink to="/admin/productos">
            Productos
          </NavLink>

          {esAdmin && (
            <NavLink to="/admin/usuarios">
              Usuarios
            </NavLink>
          )}
        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={salir}
        >
          Cerrar sesión
        </button>
      </aside>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
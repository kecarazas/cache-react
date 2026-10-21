import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/store/Home";
import Categoria from "./pages/store/Categoria";
import Nosotros from "./pages/store/Nosotros";
import Login from "./pages/store/Login";
import Contacto from "./pages/store/Contacto";
import Producto from "./pages/store/Producto";
import Registro from "./pages/store/Registro";
import Blog from "./pages/store/Blog";
import BlogDetalle from "./pages/store/BlogDetalle";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminProductoForm from "./pages/admin/AdminProductoForm";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminUsuarioForm from "./pages/admin/AdminUsuarioForm";

export default function App() {
  const location = useLocation();
  const esAdmin = location.pathname.startsWith("/admin");

  return (
    <div className={`app ${esAdmin ? "app-admin" : ""}`}>
      {!esAdmin && <Navbar />}

      <div className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:producto" element={<Categoria />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:slug" element={<Producto />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetalle />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            <Route
              path="productos"
              element={<AdminProductos />}
            />

            <Route
              path="productos/nuevo"
              element={<AdminProductoForm />}
            />

            <Route
              path="productos/editar/:codigo"
              element={<AdminProductoForm />}
            />

            <Route
              path="usuarios"
              element={<AdminUsuarios />}
            />

            <Route
              path="usuarios/nuevo"
              element={<AdminUsuarioForm />}
            />

            <Route
              path="usuarios/editar/:correo"
              element={<AdminUsuarioForm />}
            />
          </Route>
        </Routes>
      </div>

      {!esAdmin && <Footer />}
    </div>
  );
}
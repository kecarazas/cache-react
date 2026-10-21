
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CATEGORIAS,
  obtenerProductoPorCodigo,
  crearProducto,
  actualizarProducto,
} from "../../data/admin";
import "../../styles/admin/Admin.css";

export default function AdminProductoForm() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const original = codigo
    ? obtenerProductoPorCodigo(decodeURIComponent(codigo))
    : null;

  const [form, setForm] = useState(() => ({
    codigo: original?.codigo || "",
    nombre: original?.nombre || "",
    descripcion: original?.descripcion || "",
    precio: original?.precio ?? "",
    stock: original?.stock ?? "",
    stockCritico: original?.stockCritico ?? "",
    categoria: original?.categoria || "",
    imagen: original?.imagen || "",
  }));

  const [error, setError] = useState("");
  const [errores, setErrores] = useState({});

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function guardar(e) {
    e.preventDefault();
    const nuevosErrores = {};

    if (!form.codigo.trim()) nuevosErrores.codigo = "El código es obligatorio.";
    else if (form.codigo.trim().length < 3) nuevosErrores.codigo = "Mínimo 3 caracteres.";

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (form.nombre.length > 100) nuevosErrores.nombre = "Máximo 100 caracteres.";
    if (form.descripcion.length > 500) nuevosErrores.descripcion = "Máximo 500 caracteres.";

    if (form.precio === "" || !Number.isFinite(Number(form.precio)) || Number(form.precio) < 0) {
      nuevosErrores.precio = "Ingresa un precio válido, igual o mayor a cero.";
    }

    if (!/^\d+$/.test(String(form.stock))) {
      nuevosErrores.stock = "El stock debe ser un entero igual o mayor a cero.";
    }

    if (form.stockCritico !== "" && !/^\d+$/.test(String(form.stockCritico))) {
      nuevosErrores.stockCritico = "El stock crítico debe ser un entero igual o mayor a cero.";
    }

    if (!form.categoria) nuevosErrores.categoria = "Selecciona una categoría.";

    const codigoFinal = form.codigo.trim();
    const codigoExistente = obtenerProductoPorCodigo(codigoFinal);

    if (
      !original &&
      codigoExistente
    ) {
      nuevosErrores.codigo = "Ya existe un producto con ese código.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setError("Revisa los campos marcados.");
      return;
    }

    const producto = {
      codigo: original ? original.codigo : codigoFinal,
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number.parseInt(form.stock, 10),
      stockCritico: form.stockCritico === "" ? null : Number.parseInt(form.stockCritico, 10),
      categoria: form.categoria,
      imagen: form.imagen.trim() || "/images/producto-placeholder.svg",
    };

    const ok = original
      ? actualizarProducto(original.codigo, producto)
      : crearProducto(producto);

    if (!ok) {
      setError("No se pudo guardar. Comprueba que el código no esté repetido.");
      return;
    }

    navigate("/admin/productos");
  }

  if (codigo && !original) {
    return (
      <main className="admin-main">
        <h2>Producto no encontrado</h2>
        <Link to="/admin/productos">Volver a productos</Link>
      </main>
    );
  }

  return (
    <main className="admin-main">
      <div className="admin-topbar">
        <h2>{original ? "Editar producto" : "Nuevo producto"}</h2>
      </div>

      <section className="admin-form-panel">
        <form onSubmit={guardar} noValidate>
          {error && <div className="alerta alerta-error">{error}</div>}

          <div className="form-grid">
            <div className="campo">
              <label>Código de producto</label>
              <input name="codigo" value={form.codigo} onChange={cambiar} readOnly={!!original} />
              {errores.codigo && <span className="mensaje-error">{errores.codigo}</span>}
            </div>

            <div className="campo">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={cambiar}>
                <option value="">-- Seleccione categoría --</option>
                {CATEGORIAS.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.nombre}</option>
                ))}
              </select>
              {errores.categoria && <span className="mensaje-error">{errores.categoria}</span>}
            </div>

            <div className="campo campo-full">
              <label>Nombre</label>
              <input name="nombre" maxLength="100" value={form.nombre} onChange={cambiar} />
              {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
            </div>

            <div className="campo campo-full">
              <label>Descripción (opcional)</label>
              <textarea name="descripcion" maxLength="500" value={form.descripcion} onChange={cambiar} />
              {errores.descripcion && <span className="mensaje-error">{errores.descripcion}</span>}
            </div>

            <div className="campo">
              <label>Precio (CLP)</label>
              <input type="number" min="0" step="1" name="precio" value={form.precio} onChange={cambiar} />
              {errores.precio && <span className="mensaje-error">{errores.precio}</span>}
            </div>

            <div className="campo">
              <label>Stock</label>
              <input type="number" min="0" step="1" name="stock" value={form.stock} onChange={cambiar} />
              {errores.stock && <span className="mensaje-error">{errores.stock}</span>}
            </div>

            <div className="campo">
              <label>Stock crítico (opcional)</label>
              <input type="number" min="0" step="1" name="stockCritico" value={form.stockCritico} onChange={cambiar} />
              {errores.stockCritico && <span className="mensaje-error">{errores.stockCritico}</span>}
            </div>

            <div className="campo campo-full">
              <label>Ruta o URL de la imagen (opcional)</label>
              <input name="imagen" value={form.imagen} onChange={cambiar} placeholder="img/productos/mi-producto.jpg" />
              <p className="mensaje-ayuda">Las rutas locales deben corresponder a archivos dentro de public.</p>
            </div>
          </div>

          <div className="form-acciones">
            <button type="submit">Guardar producto</button>
            <Link to="/admin/productos">Cancelar</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

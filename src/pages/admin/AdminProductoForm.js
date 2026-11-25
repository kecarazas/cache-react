
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext";
import { productoService } from "../../services";
import { mensajeDeError } from "../../services/api";
import "../../styles/admin/Admin.css";

// Espera a que el catálogo cargue antes de mostrar el formulario (para poder editar)
export default function AdminProductoForm() {
  const { codigo } = useParams();
  const { productos, categorias, cargando, recargar } = useProductos();

  if (cargando) {
    return (
      <main className="admin-main">
        <p>Cargando…</p>
      </main>
    );
  }

  const original = codigo
    ? productos.find((p) => p.codigo === decodeURIComponent(codigo)) || null
    : null;

  if (codigo && !original) {
    return (
      <main className="admin-main">
        <h2>Producto no encontrado</h2>
        <Link to="/admin/productos">Volver a productos</Link>
      </main>
    );
  }

  return (
    <FormularioProducto
      key={original?.id ?? "nuevo"}
      original={original}
      productos={productos}
      categorias={categorias}
      recargar={recargar}
    />
  );
}

function FormularioProducto({ original, productos, categorias, recargar }) {
  const navigate = useNavigate();

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

  async function guardar(e) {
    e.preventDefault();
    const nuevosErrores = {};

    if (!form.codigo.trim()) nuevosErrores.codigo = "El código es obligatorio.";
    else if (form.codigo.trim().length < 3 || form.codigo.trim().length > 10) {
      nuevosErrores.codigo = "Debe tener entre 3 y 10 caracteres.";
    }

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (form.nombre.length > 150) nuevosErrores.nombre = "Máximo 150 caracteres.";
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
    const codigoExistente = productos.find(
      (p) => p.codigo.toLowerCase() === codigoFinal.toLowerCase()
    );

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

    // Campos que este formulario no edita se conservan al actualizar
    const producto = {
      codigo: original ? original.codigo : codigoFinal,
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      marca: original?.marca ?? null,
      etiqueta: original?.etiqueta ?? null,
      destacado: original?.destacado ?? false,
      especificaciones: original?.especificaciones ?? [],
      precioOferta: original?.precioOferta ?? null,
      precio: Number(form.precio),
      stock: Number.parseInt(form.stock, 10),
      stockCritico: form.stockCritico === "" ? 0 : Number.parseInt(form.stockCritico, 10),
      categoria: form.categoria,
      imagen: form.imagen.trim() || "producto-placeholder.svg",
    };

    try {
      if (original) {
        await productoService.actualizar(original.id, producto);
      } else {
        await productoService.crear(producto);
      }
      await recargar();
      navigate("/admin/productos");
    } catch (err) {
      setError(mensajeDeError(err));
    }
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
                {categorias.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.nombre}</option>
                ))}
              </select>
              {errores.categoria && <span className="mensaje-error">{errores.categoria}</span>}
            </div>

            <div className="campo campo-full">
              <label>Nombre</label>
              <input name="nombre" maxLength="150" value={form.nombre} onChange={cambiar} />
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
              <input name="imagen" value={form.imagen} onChange={cambiar} placeholder="mouse/mouse1.png" />
              <p className="mensaje-ayuda">Ruta dentro de public/images (por ejemplo mouse/mouse1.png).</p>
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

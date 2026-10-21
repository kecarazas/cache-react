
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  obtenerSesion,
  obtenerUsuarioPorCorreo,
  obtenerUsuarioPorRun,
  crearUsuario,
  actualizarUsuario,
} from "../../data/admin";
import "../../styles/admin/Admin.css";

const REGIONES = [
  { nombre: "Arica y Parinacota", comunas: ["Arica", "Putre", "Camarones", "General Lagos"] },
  { nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"] },
  { nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones"] },
  { nombre: "Atacama", comunas: ["Copiapó", "Vallenar", "Chañaral", "Caldera"] },
  { nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel"] },
  { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"] },
  { nombre: "Región Metropolitana de Santiago", comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "Puente Alto"] },
  { nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "San Fernando", "Rengo", "Santa Cruz"] },
  { nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Cauquenes"] },
  { nombre: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"] },
  { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"] },
  { nombre: "La Araucanía", comunas: ["Temuco", "Villarrica", "Angol", "Pucón"] },
  { nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"] },
  { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"] },
  { nombre: "Aysén del General Carlos Ibáñez del Campo", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico"] },
  { nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"] },
];

function validarRun(run) {
  const limpio = run.toUpperCase().replace(/\./g, "").replace(/-/g, "");
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resultado = 11 - (suma % 11);
  const esperado = resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);
  return dv === esperado;
}

function correoValido(correo) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
}

const FORM_VACIO = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  fechaNacimiento: "",
  tipoUsuario: "",
  region: "",
  comuna: "",
  direccion: "",
  clave: "",
  confirmarClave: "",
};

export default function AdminUsuarioForm() {
  const sesion = obtenerSesion();
  const { correo } = useParams();
  const navigate = useNavigate();
  const correoOriginal = correo ? decodeURIComponent(correo) : null;
  const original = correoOriginal ? obtenerUsuarioPorCorreo(correoOriginal) : null;

  const [form, setForm] = useState(() => {
    if (!original) return { ...FORM_VACIO };
    return {
      ...FORM_VACIO,
      ...original,
      clave: "",
      confirmarClave: "",
    };
  });
  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState("");

  if (sesion?.tipoUsuario !== "administrador") {
    return <Navigate to="/admin" replace />;
  }

  if (correoOriginal && !original) {
    return (
      <main className="admin-main">
        <h2>Usuario no encontrado</h2>
        <Link to="/admin/usuarios">Volver a usuarios</Link>
      </main>
    );
  }

  const comunas = REGIONES.find((r) => r.nombre === form.region)?.comunas || [];

  function cambiar(e) {
    const { name, value } = e.target;
    setForm((actual) => ({
      ...actual,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));
  }

  function guardar(e) {
    e.preventDefault();
    const nuevos = {};
    const run = form.run.trim().toUpperCase();
    const nombre = form.nombre.trim();
    const apellidos = form.apellidos.trim();
    const correoLimpio = form.correo.trim().toLowerCase();

    if (!run) nuevos.run = "El RUN es obligatorio.";
    else if (!validarRun(run)) nuevos.run = "El RUN no es válido.";
    else {
      const repetido = obtenerUsuarioPorRun(run);
      if (repetido && (!original || repetido.run !== original.run)) {
        nuevos.run = "Ya existe un usuario con ese RUN.";
      }
    }

    if (!nombre) nuevos.nombre = "El nombre es obligatorio.";
    else if (nombre.length > 50) nuevos.nombre = "Máximo 50 caracteres.";

    if (!apellidos) nuevos.apellidos = "Los apellidos son obligatorios.";
    else if (apellidos.length > 100) nuevos.apellidos = "Máximo 100 caracteres.";

    if (!correoLimpio) nuevos.correo = "El correo es obligatorio.";
    else if (!correoValido(correoLimpio)) {
      nuevos.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    } else {
      const repetido = obtenerUsuarioPorCorreo(correoLimpio);
      if (repetido && (!original || repetido.correo.toLowerCase() !== original.correo.toLowerCase())) {
        nuevos.correo = "Ya existe una cuenta con ese correo.";
      }
    }

    if (!form.tipoUsuario) nuevos.tipoUsuario = "Selecciona un tipo de usuario.";
    if (!form.region) nuevos.region = "Selecciona una región.";
    if (!form.comuna) nuevos.comuna = "Selecciona una comuna.";
    if (!form.direccion.trim()) nuevos.direccion = "La dirección es obligatoria.";
    else if (form.direccion.trim().length > 300) nuevos.direccion = "Máximo 300 caracteres.";

    if (!original && !form.clave) nuevos.clave = "La contraseña es obligatoria.";
    else if (form.clave && (form.clave.length < 4 || form.clave.length > 10)) {
      nuevos.clave = "Debe tener entre 4 y 10 caracteres.";
    }

    if ((form.clave || !original) && form.confirmarClave !== form.clave) {
      nuevos.confirmarClave = "Las contraseñas no coinciden.";
    }

    if (Object.keys(nuevos).length) {
      setErrores(nuevos);
      setAlerta("Revisa los campos marcados.");
      return;
    }

    const usuario = {
      run,
      nombre,
      apellidos,
      correo: correoLimpio,
      clave: form.clave || original?.clave || "",
      fechaNacimiento: form.fechaNacimiento,
      tipoUsuario: form.tipoUsuario,
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion.trim(),
    };

    if (original) {
      const ok = actualizarUsuario(original.correo, usuario);
      if (!ok) {
        setAlerta("No se pudo actualizar el usuario. Revisa el correo.");
        return;
      }
    } else {
      const resultado = crearUsuario(usuario);
      if (!resultado.ok) {
        setAlerta(resultado.error);
        return;
      }
    }

    navigate("/admin/usuarios");
  }

  function campoError(nombre) {
    return errores[nombre]
      ? <span className="mensaje-error">{errores[nombre]}</span>
      : null;
  }

  return (
    <main className="admin-main">
      <div className="admin-topbar">
        <h2>{original ? "Editar usuario" : "Nuevo usuario"}</h2>
        <span className="rol-badge">{sesion.tipoUsuario}</span>
      </div>

      <section className="admin-form-panel">
        <form onSubmit={guardar} noValidate>
          {alerta && <div className="alerta alerta-error">{alerta}</div>}

          <div className="form-grid">
            <div className="campo">
              <label>RUN (sin puntos ni guion)</label>
              <input name="run" maxLength="9" value={form.run} onChange={cambiar} readOnly={!!original} />
              {campoError("run")}
            </div>

            <div className="campo">
              <label>Tipo de usuario</label>
              <select name="tipoUsuario" value={form.tipoUsuario} onChange={cambiar}>
                <option value="">-- Seleccione --</option>
                <option value="administrador">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="cliente">Cliente</option>
              </select>
              {campoError("tipoUsuario")}
            </div>

            <div className="campo">
              <label>Nombre</label>
              <input name="nombre" maxLength="50" value={form.nombre} onChange={cambiar} />
              {campoError("nombre")}
            </div>

            <div className="campo">
              <label>Apellidos</label>
              <input name="apellidos" maxLength="100" value={form.apellidos} onChange={cambiar} />
              {campoError("apellidos")}
            </div>

            <div className="campo">
              <label>Correo</label>
              <input type="email" name="correo" maxLength="100" value={form.correo} onChange={cambiar} />
              {campoError("correo")}
            </div>

            <div className="campo">
              <label>Fecha de nacimiento (opcional)</label>
              <input type="date" name="fechaNacimiento" value={form.fechaNacimiento || ""} onChange={cambiar} />
            </div>

            <div className="campo">
              <label>Región</label>
              <select name="region" value={form.region} onChange={cambiar}>
                <option value="">-- Seleccione región --</option>
                {REGIONES.map((r) => (
                  <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                ))}
              </select>
              {campoError("region")}
            </div>

            <div className="campo">
              <label>Comuna</label>
              <select name="comuna" value={form.comuna} onChange={cambiar}>
                <option value="">-- Seleccione comuna --</option>
                {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {campoError("comuna")}
            </div>

            <div className="campo campo-full">
              <label>Dirección</label>
              <input name="direccion" maxLength="300" value={form.direccion} onChange={cambiar} />
              {campoError("direccion")}
            </div>

            <div className="campo">
              <label>Contraseña {original && "(opcional)"}</label>
              <input type="password" name="clave" maxLength="10" value={form.clave} onChange={cambiar} />
              {original && <span className="mensaje-ayuda">Déjala en blanco para conservar la actual.</span>}
              {campoError("clave")}
            </div>

            <div className="campo">
              <label>Confirmar contraseña</label>
              <input type="password" name="confirmarClave" maxLength="10" value={form.confirmarClave} onChange={cambiar} />
              {campoError("confirmarClave")}
            </div>
          </div>

          <div className="form-acciones">
            <button type="submit">Guardar usuario</button>
            <Link to="/admin/usuarios">Cancelar</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

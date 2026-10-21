import '../../styles/Auth.css'
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { regiones } from "../../data/regiones";
import { validarDominioCorreo, validarRun } from "../../utils/validaciones";

const valoresIniciales = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  clave: "",
  confirmarClave: "",
  telefono: "",
  fechaNacimiento: "",
  region: "",
  comuna: "",
  direccion: ""
};

export default function Registro() {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState(null);
  const [camposTocados, setCamposTocados] = useState({});
  const navigate = useNavigate();

  const comunas = useMemo(() => {
    const region = regiones.find((item) => item.nombre === valores.region);
    return region ? region.comunas : [];
  }, [valores.region]);

  const validadores = {
    run: (valor) => {
      if (!valor.trim()) 
        return "El RUN es obligatorio.";
      if (!/^[0-9kK]{7,9}$/.test(valor.trim()))
        return "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.";
      if (!validarRun(valor.trim())) 
        return "El RUN ingresado no es válido.";
      return "";
    },
    nombre: (valor) => {
      if (!valor.trim()) 
        return "El nombre es obligatorio.";
      if (valor.trim().length > 50) 
        return "Máximo 50 caracteres.";
      return "";
    },
    apellidos: (valor) => {
      if (!valor.trim()) 
        return "Los apellidos son obligatorios.";
      if (valor.trim().length > 100) 
        return "Máximo 100 caracteres.";
      return "";
    },
    correo: (valor) => {
      if (!valor.trim()) 
        return "El correo es obligatorio.";
      if (valor.trim().length > 100) 
        return "Máximo 100 caracteres.";
      if (!validarDominioCorreo(valor.trim()))
        return "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      return "";
    },
    clave: (valor) => {
      if (!valor) 
        return "La contraseña es obligatoria.";
      if (valor.length < 4 || valor.length > 10)
        return "Debe tener entre 4 y 10 caracteres.";
      return "";
    },
    confirmarClave: (valor) => {
      if (!valor) 
        return "Confirma tu contraseña.";
      if (valor !== valores.clave) 
        return "Las contraseñas no coinciden.";
      return "";
    },
    telefono: (valor) => {
      if (!valor.trim()) return "";
      if (!/^[0-9+\s]{8,15}$/.test(valor.trim()))
        return "Ingresa un teléfono válido.";
      return "";
    },
    region: (valor) => (valor ? "" : "Selecciona una región."),
    comuna: (valor) => (valor ? "" : "Selecciona una comuna."),
    direccion: (valor) => {
      if (!valor.trim()) 
        return "La dirección es obligatoria.";
      if (valor.trim().length > 300) 
        return "Máximo 300 caracteres.";
      return "";
    }
  };

  const validarCampo = (nombre, valorActual = valores[nombre]) => {
    const error = validadores[nombre](valorActual);

    setErrores((prev) => ({
      ...prev,
      [nombre]: error
    }));

    return !error;
  };

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setValores((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "region") {
      setValores((prev) => ({
        ...prev,
        region: value,
        comuna: ""
      }));
    }

    if (camposTocados[name]) {
      validarCampo(name, value);
    }

    if (name === "clave" && camposTocados.confirmarClave) {
      validarCampo("confirmarClave", valores.confirmarClave);
    }
  };

  const handleBlur = (evento) => {
    const { name } = evento.target;

    setCamposTocados((prev) => ({
      ...prev,
      [name]: true
    }));

    validarCampo(name);
  };

  const obtenerUsuarios = () => {
    try {
      return JSON.parse(localStorage.getItem("at_usuarios")) || [];
    } catch {
      return [];
    }
  };

  const crearUsuario = (usuario) => {
    const usuarios = obtenerUsuarios();

    const existeRun = usuarios.some(
      (item) => item.run.toUpperCase() === usuario.run.toUpperCase()
    );

    const existeCorreo = usuarios.some(
      (item) => item.correo.toLowerCase() === usuario.correo.toLowerCase()
    );

    if (existeRun) {
      return { ok: false, error: "Ya existe una cuenta con este RUN." };
    }

    if (existeCorreo) {
      return { ok: false, error: "Ya existe una cuenta con este correo." };
    }

    localStorage.setItem("at_usuarios", JSON.stringify([...usuarios, usuario]));
    return { ok: true };
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    let formValido = true;
    let primerError = null;
    const nuevosErrores = {};

    Object.keys(validadores).forEach((nombre) => {
      const error = validadores[nombre](valores[nombre]);
      nuevosErrores[nombre] = error;

      if (error && !primerError) {
        primerError = nombre;
      }

      formValido = formValido && !error;
    });

    setErrores(nuevosErrores);
    setCamposTocados(
      Object.keys(validadores).reduce((acc, campo) => {
        acc[campo] = true;
        return acc;
      }, {})
    );

    if (!formValido) {
      setAlerta({
        tipo: "error",
        mensaje: "Revisa los campos marcados en rojo antes de continuar."
      });
      return;
    }

    const resultado = crearUsuario({
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim().toLowerCase(),
      clave: valores.clave,
      telefono: valores.telefono.trim(),
      fechaNacimiento: valores.fechaNacimiento,
      tipoUsuario: "cliente",
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim()
    });

    if (!resultado.ok) {
      setAlerta({
        tipo: "error",
        mensaje: resultado.error
      });
      return;
    }

    setAlerta({
      tipo: "exito",
      mensaje: "¡Cuenta creada con éxito! Redirigiendo a inicio de sesión..."
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <main>
      <section className="seccion-auth">
        <div className="auth-logo">
            <img src="/images/Cachelogo.png" alt="" />
            <h1>Caché</h1>
        </div>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <h2>Crear una cuenta</h2>
          <p className="subtitulo">
            Regístrate para comprar más rápido y guardar tus pedidos.
          </p>

          {alerta && (
            <div className={`alerta alerta-${alerta.tipo}`}>{alerta.mensaje}</div>
          )}

          <div className="form-grid">
            <Campo
              label="RUN (sin puntos ni guion)"
              name="run"
              value={valores.run}
              error={errores.run}
              maxLength={9}
              placeholder="Ej: 123456789"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Nombre"
              name="nombre"
              value={valores.nombre}
              error={errores.nombre}
              maxLength={50}
              placeholder="Nombre"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Apellidos"
              name="apellidos"
              value={valores.apellidos}
              error={errores.apellidos}
              maxLength={100}
              placeholder="Apellidos"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Correo"
              name="correo"
              type="email"
              value={valores.correo}
              error={errores.correo}
              maxLength={100}
              placeholder="john.doe@duocuc.cl"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Contraseña"
              name="clave"
              type="password"
              value={valores.clave}
              error={errores.clave}
              maxLength={10}
              placeholder="Entre 4 y 10 caracteres"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Confirmar contraseña"
              name="confirmarClave"
              type="password"
              value={valores.confirmarClave}
              error={errores.confirmarClave}
              maxLength={10}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Teléfono (opcional)"
              name="telefono"
              value={valores.telefono}
              error={errores.telefono}
              placeholder="+56 9 1234 5678"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Campo
              label="Fecha de nacimiento (opcional)"
              name="fechaNacimiento"
              type="date"
              value={valores.fechaNacimiento}
              onChange={handleChange}
            />

            <CampoSelect
              label="Región"
              name="region"
              value={valores.region}
              error={errores.region}
              onChange={handleChange}
              onBlur={handleBlur}
              opciones={regiones.map((region) => region.nombre)}
              placeholder="Selecciona una región"
            />

            <CampoSelect
              label="Comuna"
              name="comuna"
              value={valores.comuna}
              error={errores.comuna}
              onChange={handleChange}
              onBlur={handleBlur}
              opciones={comunas}
              placeholder="Selecciona una comuna"
              disabled={!valores.region}
            />

            <Campo
              label="Dirección"
              name="direccion"
              value={valores.direccion}
              error={errores.direccion}
              maxLength={300}
              placeholder="Calle, número, depto."
              className="campo-full"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-acciones">
            <button type="submit">Registrar</button>
          </div>

          <p className="form-enlace-secundario">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

function Campo({
  label,
  name,
  value,
  error,
  type = "text",
  maxLength,
  placeholder,
  className = "",
  onChange,
  onBlur
}) {
  return (
    <div className={`campo ${className} ${error ? "campo-error" : ""}`}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <span className="mensaje-error">{error}</span>}
    </div>
  );
}

function CampoSelect({
  label,
  name,
  value,
  error,
  opciones,
  placeholder,
  disabled = false,
  className = "",
  onChange,
  onBlur
}) {
  return (
    <div className={`campo ${className} ${error ? "campo-error" : ""}`}>
      <label htmlFor={name}>{label}</label>

      <select
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="">{placeholder}</option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      {error && <span className="mensaje-error">{error}</span>}
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validarDominioCorreo } from "../utils/validaciones";
import './Auth.css'

const cuentasDemo = [
  {
    run: "111111111",
    nombre: "Admin",
    apellidos: "Art Tools",
    correo: "admin@duoc.cl",
    clave: "admin123",
    tipoUsuario: "administrador"
  },
  {
    run: "222222222",
    nombre: "Vendedor",
    apellidos: "Art Tools",
    correo: "vendedor@duoc.cl",
    clave: "vendedor123",
    tipoUsuario: "vendedor"
  }
];

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState(null);
  const [camposTocados, setCamposTocados] = useState({});

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const validarCorreo = (valor = correo) => {
    let error = "";

    if (!valor.trim()) {
      error = "El correo es obligatorio.";
    } else if (valor.trim().length > 100) {
      error = "Máximo 100 caracteres.";
    } else if (!validarDominioCorreo(valor.trim())) {
      error = "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    setErrores((prev) => ({ ...prev, correo: error }));
    return !error;
  };

  const validarClave = (valor = clave) => {
    let error = "";

    if (!valor) {
      error = "La contraseña es obligatoria.";
    } else if (valor.length < 4 || valor.length > 10) {
      error = "Debe tener entre 4 y 10 caracteres.";
    }

    setErrores((prev) => ({ ...prev, clave: error }));
    return !error;
  };

  const handleCorreo = (evento) => {
    const valor = evento.target.value;
    setCorreo(valor);

    if (camposTocados.correo) {
      validarCorreo(valor);
    }
  };

  const handleClave = (evento) => {
    const valor = evento.target.value;
    setClave(valor);

    if (camposTocados.clave) {
      validarClave(valor);
    }
  };

  const handleBlurCorreo = () => {
    setCamposTocados((prev) => ({ ...prev, correo: true }));
    validarCorreo();
  };

  const handleBlurClave = () => {
    setCamposTocados((prev) => ({ ...prev, clave: true }));
    validarClave();
  };

  const obtenerUsuarioPorCorreo = (correoBuscado) => {
    let usuarios = [];

    try {
      usuarios = JSON.parse(localStorage.getItem("at_usuarios")) || [];
    } catch {
      usuarios = [];
    }

    const todos = [...cuentasDemo, ...usuarios];

    return todos.find(
      (usuario) =>
        usuario.correo.toLowerCase() === correoBuscado.trim().toLowerCase()
    );
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    setCamposTocados({ correo: true, clave: true });

    const correoValido = validarCorreo();
    const claveValida = validarClave();

    if (!correoValido || !claveValida) {
      setAlerta({
        tipo: "error",
        mensaje: "Revisa los campos marcados en rojo."
      });
      return;
    }

    const usuario = obtenerUsuarioPorCorreo(correo);

    if (!usuario || usuario.clave !== clave) {
      setAlerta({
        tipo: "error",
        mensaje: "Correo o contraseña incorrectos."
      });
      return;
    }

    iniciarSesion(usuario);

    setAlerta({
      tipo: "exito",
      mensaje: `¡Bienvenido/a, ${usuario.nombre}! Redirigiendo...`
    });

    const esStaff =
      usuario.tipoUsuario === "administrador" ||
      usuario.tipoUsuario === "vendedor";

    setTimeout(() => {
      navigate(esStaff ? "/admin" : "/");
    }, 900);
  };

  return (
    <main>
      <section className="seccion-auth">
        <div className="auth-logo">
          <img src="/images/Cachelogo.png" alt="" />
          <h1>Caché</h1>
        </div>

        <div className="demo-credenciales">
          <strong>Cuentas de demostración (mientras no hay backend):</strong>
          Administrador: admin@duoc.cl / admin123 &nbsp;|&nbsp;
          Vendedor: vendedor@duoc.cl / vendedor123
        </div>

        <form className="form-card form-login" onSubmit={handleSubmit} noValidate>
          <h2>Inicio de sesión</h2>

          {alerta && (
            <div className={`alerta alerta-${alerta.tipo}`}>
              {alerta.mensaje}
            </div>
          )}

          <div className={`campo ${errores.correo ? "campo-error" : ""}`}>
            <label htmlFor="correo">Correo</label>

            <input
              id="correo"
              name="correo"
              type="email"
              value={correo}
              maxLength={100}
              placeholder="john.doe@duocuc.cl"
              onChange={handleCorreo}
              onBlur={handleBlurCorreo}
            />

            {errores.correo && (
              <span className="mensaje-error">{errores.correo}</span>
            )}
          </div>

          <div className={`campo ${errores.clave ? "campo-error" : ""}`}>
            <label htmlFor="clave">Contraseña</label>

            <input
              id="clave"
              name="clave"
              type="password"
              value={clave}
              maxLength={10}
              placeholder="Entre 4 y 10 caracteres"
              onChange={handleClave}
              onBlur={handleBlurClave}
            />

            {errores.clave && (
              <span className="mensaje-error">{errores.clave}</span>
            )}
          </div>

          <div className="form-acciones">
            <button type="submit">Iniciar sesión</button>
          </div>

          <p className="form-enlace-secundario">
            ¿Aún no tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
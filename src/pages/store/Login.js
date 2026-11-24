import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { mensajeDeError } from "../../services/api";
import '../../styles/Auth.css'

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
    }

    setErrores((prev) => ({ ...prev, correo: error }));
    return !error;
  };

  const validarClave = (valor = clave) => {
    let error = "";

    if (!valor) {
      error = "La contraseña es obligatoria.";
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

  const handleSubmit = async (evento) => {
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

    try {
      const usuario = await iniciarSesion(correo.trim(), clave);

      setAlerta({
        tipo: "exito",
        mensaje: `¡Bienvenido/a, ${usuario.nombre}! Redirigiendo...`
      });

      navigate(usuario.tipoUsuario === "cliente" ? "/" : "/admin", { replace: true });
    } catch (e) {
      setAlerta({
        tipo: "error",
        mensaje: e.response?.status === 401 || e.response?.status === 400
          ? "Correo o contraseña incorrectos."
          : mensajeDeError(e)
      });
    }
  };

  return (
    <main>
      <section className="seccion-auth">
        <div className="auth-logo">
          <img src="/images/Cachelogo.png" alt="" />
          <h1>Caché</h1>
        </div>

        <div className="demo-credenciales">
          <strong>Cuentas de prueba:</strong>
          Administrador: admin@cache.cl / admin123 &nbsp;|&nbsp;
          Vendedor: vendedor@cache.cl / vendedor123 &nbsp;|&nbsp;
          Cliente: pedro@gmail.com / pedro123
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
              placeholder="correo@ejemplo.cl"
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
              placeholder="Tu contraseña"
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
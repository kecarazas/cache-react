import './Auth.css'
import { Link } from "react-router-dom";

function Login(){
    return(
        <main>
        <section className="seccion-auth">
            <div className="auth-logo">
            <img src="image/Cachelogo.png" alt="" />
            <h1>Caché</h1>
            </div>
            <div className="demo-credenciales">
            <strong>Cuentas de demostración (mientras no hay backend):</strong>
            Administrador: admin@duoc.cl / admin123 &nbsp;|&nbsp;
            Vendedor: vendedor@duoc.cl / vendedor123
            </div>
            <form id="form-login" className="form-card form-login" noValidate>
            <h2>Inicio de sesión</h2>
            <div className="alerta oculto" id="alerta-login" />
            <div className="campo">
                <label htmlFor="correo">Correo</label>
                <input type="email" id="correo" name="correo" placeholder="john.doe@duocuc.cl" maxLength={100} />
                <span className="mensaje-error" id="error-correo" />
            </div>
            <div className="campo">
                <label htmlFor="clave">Contraseña</label>
                <input type="password" id="clave" name="clave" placeholder="Entre 4 y 10 caracteres" maxLength={10} />
                <span className="mensaje-error" id="error-clave" />
            </div>
            <div className="form-acciones">
                <button type="submit">Iniciar sesión</button>
            </div>
            <p className="form-enlace-secundario">¿Aún no tienes cuenta? <Link to="/Registro">Registrate aquí</Link></p>
            </form>
        </section>
        </main>

    );
}

export default Login;
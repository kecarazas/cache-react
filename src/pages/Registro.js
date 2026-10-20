import './Auth.css'
import { Link } from "react-router-dom";

function Registro(){
        return(
        <main>
        <section className="seccion-auth">
            <div className="auth-logo">
            <img src="img/Cachelogo.png" alt="" />
            <h1>Caché</h1>
            </div>
            <form id="form-registro" className="form-card" noValidate>
            <h2>Crear una cuenta</h2>
            <p className="subtitulo">Regístrate para comprar más rápido y guardar tus pedidos.</p>
            <div className="alerta oculto" id="alerta-registro" />
            <div className="form-grid">
                <div className="campo">
                <label htmlFor="run"> RUN (sin puntos ni guion)</label>
                <input type="text" id="run" name="run" placeholder="Ej: 123456789" maxLength={9} />
                <span className="mensaje-error" id="error-run" />
                </div>
                <div className="campo">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" placeholder="Nombre" maxLength={50} />
                <span className="mensaje-error" id="error-nombre" />
                </div>
                <div className="campo">
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" maxLength={100} />
                <span className="mensaje-error" id="error-apellidos" />
                </div>
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
                <div className="campo">
                <label htmlFor="confirmar-clave">Confirmar contraseña</label>
                <input type="password" id="confirmar-clave" name="confirmar-clave" maxLength={10} />
                <span className="mensaje-error" id="error-confirmarClave" />
                </div>
                <div className="campo">
                <label htmlFor="telefono">Teléfono<span className="opcional-tag">(opcional)</span></label>
                <input type="text" id="telefono" name="telefono" placeholder="+56 9 1234 5678" />
                <span className="mensaje-error" id="error-telefono" />
                </div>
                <div className="campo">
                <label htmlFor="fecha-nacimiento">Fecha de nacimiento <span className="opcional-tag">(opcional)</span></label>
                <input type="date" id="fecha-nacimiento" name="fecha-nacimiento" />
                </div>
                <div className="campo">
                <label htmlFor="region">Región</label>
                <select id="region" name="region" />
                <span className="mensaje-error" id="error-region" />
                </div>
                <div className="campo">
                <label htmlFor="comuna">Comuna</label>
                <select id="comuna" name="comuna" />
                <span className="mensaje-error" id="error-comuna" />
                </div>
                <div className="campo campo-full">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" id="direccion" name="direccion" placeholder="Calle, número, depto." maxLength={300} />
                <span className="mensaje-error" id="error-direccion" />
                </div>
            </div>
            <div className="form-acciones">
                <button type="submit">Registrar</button>
            </div>
            <p className="form-enlace-secundario">¿Ya tienes cuenta? <Link to="/Login">Inicia sesión aquí</Link></p>
            </form>
        </section>
        </main>
    );
}

export default Registro;
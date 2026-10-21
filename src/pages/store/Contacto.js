import { useState } from "react";
import "../../styles/Contacto.css";

function Contacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [comentario, setComentario] = useState("");
    const [errores, setErrores] = useState({});
    const [alerta, setAlerta] = useState(null);

    function validarDominioCorreo(valor) {
        return /^[^\s@]+@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(valor);
    }

    function validarFormulario() {
        const nuevosErrores = {};

        if (!nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (nombre.trim().length > 100) {
            nuevosErrores.nombre = "El máximo es de 100 caracteres.";
        }

        if (correo.trim()) {
            if (correo.trim().length > 100) {
                nuevosErrores.correo = "Máximo 100 caracteres.";
            } else if (!validarDominioCorreo(correo.trim())) {
                nuevosErrores.correo =
                    "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            }
        }

        if (!comentario.trim()) {
            nuevosErrores.comentario = "El comentario es obligatorio.";
        } else if (comentario.trim().length > 500) {
            nuevosErrores.comentario = "Máximo de 500 caracteres.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }

    function enviarFormulario(e) {
        e.preventDefault();
        setAlerta(null);

        if (!validarFormulario()) {
            setAlerta({
                tipo: "error",
                mensaje: "Revisa los campos marcados en rojo."
            });
            return;
        }

        setAlerta({
            tipo: "exito",
            mensaje: `¡Gracias ${nombre.trim()}! Recibimos tu mensaje y te responderemos a la brevedad.`
        });

        setNombre("");
        setCorreo("");
        setComentario("");
        setErrores({});
    }

    return (
        <>
            <section className="hero-contacto">
                <h2>¡Contáctanos!</h2>
                <p>¿Tienes dudas sobre un producto o tu pedido? Escribenos!</p>
            </section>

            <section className="seccion-contacto">
                <div className="datos-contacto">
                    <div>
                        <strong>Correo</strong> contacto@arttools.cl
                    </div>
                    <div>
                        <strong>Teléfono</strong> +56 1234 5678
                    </div>
                    <div>
                        <strong>Horario de Atención</strong> Lun. a Vie. 9:00 - 18:00
                    </div>
                </div>

                <form
                    id="form-contacto"
                    className="form-card"
                    noValidate
                    onSubmit={enviarFormulario}
                >
                    {alerta && (
                        <div
                            className={`alerta alerta-${alerta.tipo}`}
                            role="status"
                        >
                            {alerta.mensaje}
                        </div>
                    )}

                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            maxLength={100}
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                                setErrores((prev) => ({
                                    ...prev,
                                    nombre: ""
                                }));
                            }}
                            className={errores.nombre ? "input-error" : ""}
                        />
                        {errores.nombre && (
                            <span className="mensaje-error">
                                {errores.nombre}
                            </span>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="correo">
                            Correo <span className="opcional-tag">(opcional)</span>
                        </label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            placeholder="john.doe@gmail.com"
                            maxLength={100}
                            value={correo}
                            onChange={(e) => {
                                setCorreo(e.target.value);
                                setErrores((prev) => ({
                                    ...prev,
                                    correo: ""
                                }));
                            }}
                            className={errores.correo ? "input-error" : ""}
                        />
                        {errores.correo && (
                            <span className="mensaje-error">
                                {errores.correo}
                            </span>
                        )}
                    </div>

                    <div className="campo">
                        <label htmlFor="comentario">Comentarios</label>
                        <textarea
                            id="comentario"
                            name="comentario"
                            placeholder="Escriba su comentario"
                            maxLength={500}
                            value={comentario}
                            onChange={(e) => {
                                setComentario(e.target.value);
                                setErrores((prev) => ({
                                    ...prev,
                                    comentario: ""
                                }));
                            }}
                            className={errores.comentario ? "input-error" : ""}
                        />

                        {errores.comentario && (
                            <span className="mensaje-error">
                                {errores.comentario}
                            </span>
                        )}

                        <span className="mensaje-ayuda">
                            {comentario.length} / 500
                        </span>
                    </div>

                    <div className="form-acciones">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Contacto;
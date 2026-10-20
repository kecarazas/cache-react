import "./Contacto.css"

function Contacto() {

    return (
        <>
            <section className="hero-contacto">
                <h2>¡Contáctanos!</h2>
                <p>¿Tienes dudas sobre un producto o tu pedido? Escribenos!</p>
            </section>
            <section className="seccion-contacto">
                <div className="datos-contacto">
                    <div><strong>Correo</strong> contacto@arttools.cl</div>
                    <div><strong>Teléfono</strong>+56 1234 5678</div>
                    <div><strong>Horario de Atención</strong>Lun. a Vie. 9:00 - 18:00</div>
                </div>
                <form id="form-contacto" className="form-card" novalidate>
                    <div className="alerta oculto" id="alerta-contacto"></div>
                    <div className="campo">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" maxlength="100" />
                        <span className="mensaje-error" id="error-nombre"></span>
                    </div>
                    <div className="campo">
                        <label for="correo">Correo <span className="opcional-tag">(opcional)</span></label>
                        <input type="text" id="correo" name="correo" placeholder="john.doe@gmail.com" />
                        <span className="mensaje-error" id="error-correo"></span>
                    </div>
                    <div className="campo">
                        <label for="comentario">Comentarios</label>
                        <textarea id="comentario" name="comentario" placeholder="Escriba su comentario" maxlength="500"></textarea>
                        <span className="mensaje-error" id="error-comentario"></span>
                        <span className="mensaje-ayuda" id="contador-comentario">0 / 500</span>
                    </div>
                    <div className="form-acciones">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Contacto;
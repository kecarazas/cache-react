import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { obtenerProductoPorCodigo } from "../data/productos";

function formatCLP(valor) {
  return "$" + Math.round(Number(valor) || 0).toLocaleString("es-CL");
}

export default function Carrito(){
    const{
        items,
        cupon,
        totales,
        actualizarCantidad,
        quitarDelCarrito,
        vaciarCarrito,
        aplicarCupon,
        quitarCupon
    } = useCarrito();

    const[codigoCupon, setCodigoCupon] = useState(cupon || "");
    
    const [mensajeCupon, setMensajeCupon] = useState(
        cupon ? "Cupón aplicado." : ""
    );

    const [mensajeCompra, setMensajeCompra] = useState("");

    const itemsValidos = items.filter((items) =>
        obtenerProductoPorCodigo(item.codigo));

    const handleAplicarCupon = () => {
        const resultado = aplicarCupon(codigoCupon);

        setMensajeCupon(resultado.mensaje);

        if(!resultado.ok){
            setCodigoCupon("");
        }
    };

    const handleFinalizarCompra = () => {
        if(itemsValidos.length === 0) return;

        vaciarCarrito();
        quitarCupon();
        setCodigoCupon("");
        setMensajeCupon("");
        setMensajeCompra("¡Gracias por tu compra!");
    };

    return(
    <main>
        <div className="volver-cont">
            <Link className="volver" to="/productos">
            <img src="/img/flecha.png" alt="regresar" />
            Volver
            </Link>
        </div>

        <section className="carrito-info">
            <h2>Mi carrito</h2>

            <div className="contenido-carrito">
            <div>
                {itemsValidos.length === 0 ? (
                <div className="carrito-vacio">
                    <p>Tu carrito está vacío.</p>
                    <Link to="/productos">Ver productos</Link>
                </div>
                ) : (
                <div className="lista-carrito">
                    {itemsValidos.map((item) => {
                    const producto = obtenerProductoPorCodigo(item.codigo);
                    const subtotalItem = producto.precio * item.cantidad;

                    return (
                        <article
                        key={item.codigo}
                        className="producto-carrito"
                        >
                        <div className="img-p-carrito">
                            <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            />
                        </div>

                        <div className="info-carrito">
                            <h3>{producto.nombre}</h3>
                            <p className="precio">
                            {formatCLP(producto.precio)} c/u
                            </p>

                            <div className="cantidad">
                            <label htmlFor={`cant-${item.codigo}`}>
                                Cantidad
                            </label>

                            <input
                                id={`cant-${item.codigo}`}
                                type="number"
                                min="1"
                                max={producto.stock}
                                value={item.cantidad}
                                className="input-cantidad-carrito"
                                onChange={(evento) =>
                                actualizarCantidad(
                                    item.codigo,
                                    evento.target.value
                                )
                                }
                            />
                            </div>
                        </div>

                        <div className="subtotal-item">
                            {formatCLP(subtotalItem)}
                        </div>

                        <button
                            type="button"
                            className="eliminar"
                            onClick={() => quitarDelCarrito(item.codigo)}
                        >
                            Eliminar
                        </button>
                        </article>
                    );
                    })}
                </div>
                )}
            </div>

            <aside className="resumen-carrito">
                <h2>Resumen de compra</h2>

                <div className="subtotal">
                <span>Subtotal</span>
                <span>{formatCLP(totales.subtotal)}</span>
                </div>

                <div className="envio">
                <span>Envío</span>
                <span>
                    {totales.envio === 0 ? "Gratis" : formatCLP(totales.envio)}
                </span>
                </div>

                <p className="nota-envio">
                Envío gratis en compras sobre $20.000.
                </p>

                {totales.descuento > 0 && (
                <div className="descuento">
                    <span>Descuento</span>
                    <span>-{formatCLP(totales.descuento)}</span>
                </div>
                )}

                <div className="total">
                <span>Total</span>
                <strong>{formatCLP(totales.total)}</strong>
                </div>

                <div className="cupon">
                <label className="solo-lectores" htmlFor="input-cupon">
                    Cupón de descuentos
                </label>

                <input
                    id="input-cupon"
                    type="text"
                    placeholder="Ingresa tu cupón"
                    value={codigoCupon}
                    onChange={(evento) => setCodigoCupon(evento.target.value)}
                />

                <button type="button" onClick={handleAplicarCupon}>
                    Aplicar
                </button>
                </div>

                {mensajeCupon && (
                <p className="mensaje-cupon">{mensajeCupon}</p>
                )}

                <button
                type="button"
                className="finalizar"
                disabled={itemsValidos.length === 0}
                onClick={handleFinalizarCompra}
                >
                Finalizar compra
                </button>

                {mensajeCompra && (
                <p className="mensaje-carrito">{mensajeCompra}</p>
                )}
            </aside>
            </div>
        </section>
        </main>
    );
}
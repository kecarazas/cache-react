import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

function formatCLP(valor) {
  return (
    "$" +
    Math.round(Number(valor) || 0).toLocaleString("es-CL")
  );
}

export default function Carrito() {
  const {
    productosCarrito,
    cupon,
    totales,
    actualizarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    aplicarCupon,
    quitarCupon
  } = useCarrito();

  const [codigoCupon, setCodigoCupon] = useState(
    cupon || ""
  );

  const [mensajeCupon, setMensajeCupon] = useState(
    cupon ? "Cupón aplicado." : ""
  );

  const [tipoMensajeCupon, setTipoMensajeCupon] = useState(
    cupon ? "ok" : ""
  );

  const [mensajeCompra, setMensajeCompra] = useState("");

  function handleAplicarCupon() {
    const resultado = aplicarCupon(codigoCupon);

    setMensajeCupon(resultado.mensaje);
    setTipoMensajeCupon(resultado.ok ? "ok" : "error");

    if (resultado.ok) {
      setCodigoCupon(codigoCupon.trim().toUpperCase());
    }
  }

  function handleFinalizarCompra() {
    if (productosCarrito.length === 0) return;

    vaciarCarrito();
    quitarCupon();

    setCodigoCupon("");
    setMensajeCupon("");
    setTipoMensajeCupon("");
    setMensajeCompra("¡Gracias por tu compra!");
  }

  return (
    <main>
      <div className="volver-cont">
        <Link className="volver" to="/">
          <img src="/img/flecha.png" alt="" />
          Volver
        </Link>
      </div>

      <section className="carrito-info">
        <h2>Mi carrito</h2>

        <div className="contenido-carrito">
          <div>
            {productosCarrito.length === 0 ? (
              <div className="carrito-vacio">
                <p>Tu carrito está vacío.</p>
                <Link to="/">Ver productos</Link>
              </div>
            ) : (
              <div className="lista-carrito">
                {productosCarrito.map((producto) => (
                  <article
                    key={producto.slug}
                    className="producto-carrito"
                  >
                    <div className="img-p-carrito">
                      <img
                        src={`/img/${producto.imagen}`}
                        alt={producto.nombre}
                      />
                    </div>

                    <div className="info-carrito">
                      <h3>{producto.nombre}</h3>

                      <p className="precio">
                        {formatCLP(producto.precio)} c/u
                      </p>

                      <div className="cantidad">
                        <label
                          htmlFor={`cant-${producto.slug}`}
                        >
                          Cantidad
                        </label>

                        <input
                          id={`cant-${producto.slug}`}
                          type="number"
                          min="1"
                          step="1"
                          max={
                            typeof producto.stock === "number"
                              ? producto.stock
                              : undefined
                          }
                          value={producto.cantidad}
                          className="input-cantidad-carrito"
                          onChange={(evento) =>
                            actualizarCantidad(
                              producto.slug,
                              evento.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="subtotal-item">
                      {formatCLP(producto.subtotal)}
                    </div>

                    <button
                      type="button"
                      className="eliminar"
                      onClick={() =>
                        quitarDelCarrito(producto.slug)
                      }
                    >
                      Eliminar
                    </button>
                  </article>
                ))}
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
                {totales.envio === 0
                  ? "Gratis"
                  : formatCLP(totales.envio)}
              </span>
            </div>

            <p className="nota-envio">
              Envío gratis en compras desde $20.000.
            </p>

            {totales.descuento > 0 && (
              <div className="descuento">
                <span>Descuento</span>
                <span>
                  -{formatCLP(totales.descuento)}
                </span>
              </div>
            )}

            <div className="total">
              <span>Total</span>
              <strong>{formatCLP(totales.total)}</strong>
            </div>

            <div className="cupon">
              <label
                className="solo-lectores"
                htmlFor="input-cupon"
              >
                Cupón de descuentos
              </label>

              <input
                id="input-cupon"
                type="text"
                placeholder="Ingresa tu cupón"
                value={codigoCupon}
                onChange={(evento) =>
                  setCodigoCupon(evento.target.value)
                }
              />

              <button
                type="button"
                onClick={handleAplicarCupon}
              >
                Aplicar
              </button>
            </div>

            {mensajeCupon && (
              <p
                className={`mensaje-cupon ${tipoMensajeCupon}`}
                role="status"
              >
                {mensajeCupon}
              </p>
            )}

            <button
              type="button"
              className="finalizar"
              disabled={productosCarrito.length === 0}
              onClick={handleFinalizarCompra}
            >
              Finalizar compra
            </button>

            {mensajeCompra && (
              <p
                className="mensaje-carrito"
                role="status"
              >
                {mensajeCompra}
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "../../styles/Carrito.css";

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
    aplicarCupon,
    confirmarCompra
  } = useCarrito();

  const [checkoutActivo, setCheckoutActivo] = useState(false);
  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    region: "",
    comuna: "",
    direccion: ""
  });
  const [codigoCupon, setCodigoCupon] = useState(
    cupon || ""
  );

  const [mensajeCupon, setMensajeCupon] = useState(
    cupon ? "Cupón aplicado." : ""
  );

  const [tipoMensajeCupon, setTipoMensajeCupon] = useState(
    cupon ? "ok" : ""
  );

  const [errorCheckout, setErrorCheckout] = useState("");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  function handleAplicarCupon() {
    const resultado = aplicarCupon(codigoCupon);

    setMensajeCupon(resultado.mensaje);
    setTipoMensajeCupon(resultado.ok ? "ok" : "error");

    if (resultado.ok) {
      setCodigoCupon(codigoCupon.trim().toUpperCase());
    }
  }

  function handleCambioCliente(evento) {
    setErrorCheckout("");
    setDatosCliente((datos) => ({
      ...datos,
      [evento.target.name]: evento.target.value
    }));
  }

  function handleFinalizarCompra(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;

    if (!formulario.checkValidity()) {
      setErrorCheckout(
        "Error de pago: no se pudo procesar la compra. Completa y revisa todos los datos obligatorios."
      );
      formulario.querySelector(":invalid")?.focus();
      return;
    }

    const resultado = confirmarCompra(datosCliente);
    if (!resultado.ok) {
      setErrorCheckout(resultado.mensaje);
      return;
    }

    setPedidoConfirmado(resultado.pedido);
    setCheckoutActivo(false);
    setCodigoCupon("");
    setMensajeCupon("");
    setTipoMensajeCupon("");
    setErrorCheckout("");
  }

  return (
    <main>
      <div className="volver-cont">
        <Link className="volver" to="/">
          <img src="/images/flecha.png" alt="" />
          Volver
        </Link>
      </div>

      <section className="carrito-info">
        <h2>Mi carrito</h2>

        <div className="contenido-carrito">
          {pedidoConfirmado ? (
            <div className="checkout-confirmacion" role="status">
              <h3>¡Pedido recibido!</h3>
              <p>Tu compra de demostración se registró correctamente.</p>
              <p>Número de pedido: <strong>{pedidoConfirmado.id}</strong></p>
              <Link to="/">Seguir comprando</Link>
            </div>
          ) : (
            <>
              <div>
                {checkoutActivo ? (
                  <form
                    id="checkout-form"
                    className="checkout-form"
                    onSubmit={handleFinalizarCompra}
                    noValidate
                  >
                    <h3>Datos de entrega</h3>
                    <p>Completa todos los campos para confirmar el pedido.</p>
                    {errorCheckout && (
                      <p className="mensaje-carrito error" role="alert">
                        {errorCheckout}
                      </p>
                    )}
                    <p className="checkout-pago-nota">
                      Checkout de demostración: el pedido se guarda localmente y no
                      se procesa ningún pago.
                    </p>

                    <div className="checkout-campos">
                      <div className="checkout-campo">
                        <label htmlFor="checkout-nombre">Nombre completo</label>
                        <input
                          id="checkout-nombre"
                          name="nombre"
                          type="text"
                          autoComplete="name"
                          maxLength="100"
                          value={datosCliente.nombre}
                          onChange={handleCambioCliente}
                          required
                        />
                      </div>

                      <div className="checkout-campo">
                        <label htmlFor="checkout-correo">Correo electrónico</label>
                        <input
                          id="checkout-correo"
                          name="correo"
                          type="email"
                          autoComplete="email"
                          maxLength="120"
                          value={datosCliente.correo}
                          onChange={handleCambioCliente}
                          required
                        />
                      </div>

                      <div className="checkout-campo">
                        <label htmlFor="checkout-telefono">Teléfono</label>
                        <input
                          id="checkout-telefono"
                          name="telefono"
                          type="tel"
                          autoComplete="tel"
                          minLength="8"
                          maxLength="20"
                          value={datosCliente.telefono}
                          onChange={handleCambioCliente}
                          required
                        />
                      </div>

                      <div className="checkout-campo">
                        <label htmlFor="checkout-region">Región</label>
                        <input
                          id="checkout-region"
                          name="region"
                          type="text"
                          autoComplete="address-level1"
                          maxLength="80"
                          value={datosCliente.region}
                          onChange={handleCambioCliente}
                          required
                        />
                      </div>

                      <div className="checkout-campo">
                        <label htmlFor="checkout-comuna">Comuna</label>
                        <input
                          id="checkout-comuna"
                          name="comuna"
                          type="text"
                          autoComplete="address-level2"
                          maxLength="80"
                          value={datosCliente.comuna}
                          onChange={handleCambioCliente}
                          required
                        />
                      </div>

                      <div className="checkout-campo checkout-campo-completo">
                        <label htmlFor="checkout-direccion">Dirección</label>
                        <input
                          id="checkout-direccion"
                          name="direccion"
                          type="text"
                          autoComplete="street-address"
                          maxLength="150"
                          value={datosCliente.direccion}
                          onChange={handleCambioCliente}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="checkout-volver"
                      onClick={() => {
                        setCheckoutActivo(false);
                        setErrorCheckout("");
                      }}
                    >
                      Volver al carrito
                    </button>
                  </form>
                ) : productosCarrito.length === 0 ? (
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
                            src={`/images/${producto.imagen}`}
                            alt={producto.nombre}
                          />
                        </div>

                        <div className="info-carrito">
                          <h3>{producto.nombre}</h3>

                          <p className="precio">
                            {formatCLP(producto.precio)} c/u
                          </p>

                          <div className="cantidad">
                            <label htmlFor={`cant-${producto.slug}`}>
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
                          onClick={() => quitarDelCarrito(producto.slug)}
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

            {checkoutActivo ? (
              <button
                key="confirmar-compra"
                type="submit"
                form="checkout-form"
                className="finalizar"
                disabled={productosCarrito.length === 0}
              >
                Confirmar compra
              </button>
            ) : (
              <button
                key="continuar-checkout"
                type="button"
                className="finalizar"
                disabled={productosCarrito.length === 0}
                onClick={() => {
                  setCheckoutActivo(true);
                  setErrorCheckout("");
                }}
              >
                Continuar al checkout
              </button>
            )}

              </aside>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
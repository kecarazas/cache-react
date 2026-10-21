import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { obtenerProductoPorCodigo } from "../data/productos";
import { requestFormReset } from "react-dom";

const CLAVE_CARRITO = "at_cattito";
const CLAVE_CUPON = "at_cupon";
const COSTO_ENVIO = 2999;
const ENVIO_GRATIS_DESDE = 20000;

const CUPONES = {
    CACHE10: {
        tipo: "porcentaje",
        valor: 10,
        texto: "10% de descuento"
    },
    ENVIOGRATIS: {
        tipo: "envio",
        valor: 0,
        texto: "Envío gratis aplicado."
    }
};

const CarritoContext = createContext(null);

export function CarritoProvider ({children}){
    const [items, setItems] = useState([]);
    const [cupon, setCupon] = useState(null);

    useEffect(() => {
        try {
            const carritoGuardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
            setItems(Array.isArray(carritoGuardado) ? carritoGuardado : []);
        }catch{
            setItems([]);
        }

        const cuponGuardado = localStorage.getItem(CLAVE_CUPON);
        setCupon(cuponGuardado && CUPONES[cuponGuardado] ? cuponGuardado : null);
    }, []);

    const guardarCarrito = (nuevosItems) => {
        setItems(nuevosItems);
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(nuevosItems));
    };

    const agregarAlCarrito = (codigo, cantidad) =>{
        const producto = obtenerProductoPorCodigo(codigo);

        if(!producto){
            return {ok: false, mensaje: "El producto ya no está disponible."};
        }

        if(producto.stock <= 0){
            return {ok : false, mensaje: "Este producto está agotado."};
        }

        const existente = items.find((item) => item.codigo === codigo);
        const cantidadActual = existente ? existente.cantidad : 0;
        const nuevaCantidad = cantidadActual + cantidad;

        if (nuevaCantidad > producto.stock){
            return {
                ok: false,
                mensaje: `Solo quedan ${producto} unidades disponibles.`
            };
        }

        const nuevosItems = existente ? items.map((item) => item.codigo === codigo
            ?{...item, cantidad: nuevaCantidad} : item) : [...items, {codigo, cantidad}];

            guardarCarrito(nuevosItems);
            return {ok: true, mensaje: "Producto agregado al carrito"};
    };

    const actualizarCantidad = (codigo, cantidad) => {
        const producto = obtenerProductoPorCodigo(codigo);
        const items = items.find((item) => item.codigo === codigo);

        if(!item) return;

        let cantidadFinal = Math.max(1, Number(cantidad) || 1);

        if (productos && cantidadFinal > producto.stock) {
            cantidadFinal = productosTeclados.stock;
        }

        guardarCarrito(
            items.map((item) =>
            item.codigo === codigo
                ?{...item, cantidad: cantidadFinal}
                : item
            ));
    };

    const quitarDelCarrito = (codigo) => {
        guardarCarrito(items.filter((item) => item.codigo !== codigo));
    };

    const vaciarCarrito = () => {
        guardarCarrito([]);
    };

    const aplicarCupon = (codigoIngresado) => {
        const codigo = (codigoIngresado || "").trim().toUpperCase();

        if(!codigo){
            return {ok: false, mensaje: "Escribe un cupón."};
        }

        if(!CUPONES[codigo]){
            localStorage.removeItem(CLAVE_CUPON);
            setCupon(null);
            return {ok: false, mensaje: "El cupón no es válido."};
        }

        localStorage.setItem(CLAVE_CUPON, codigo);
        setCupon(codigo);
        return {ok: true, mensaje: CUPONES[codigo].texto};
    };

    const totales = useMemo(() => {
        let subtotal = 0;

        items.forEach((item) => {
            const producto = obtenerProductoPorCodigo(item.codigo);

            if(producto){
                subtotal += producto.precio * item.cantidad;
            }
        });

        let envio = 
            subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;

        let descuento = 0;

        if (cupon && subtotal > 0) {
            const datosCupon = CUPONES[cupon];

            if(datosCupon.tipo === "porcentaje"){
                descuento = Math.round((subtotal * datosCupon.valor) / 100);
            }

            if(datosCupon.tipo === "envio"){
                envio = 0;
            }
        }

        return{
            subtotal,
            descuento,
            envio,
            total: subtotal - descuento + envio
        };
    }, [items, cupon]);

    const cantidadTotal = useMemo(
        () => items.reduce((total, item) => total + item.cantidad, 0),
        [items]
    );

    return (
        <CarritoContext.Provider
        value={{
            items,
            cupon,
            cantidadTotal,
            totales,
            agregarAlCarrito,
            actualizarCantidad,
            quitarDelCarrito,
            vaciarCarrito,
            aplicarCupon,
            quitarCupon
        }}
        >
        {children}
        </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
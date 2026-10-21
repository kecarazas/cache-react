import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { todosLosProductos } from "../data/productos";

const CLAVE_CARRITO = "at_carrito";
const CLAVE_CUPON = "at_cupon";

const COSTO_ENVIO = 2990;
const ENVIO_GRATIS_DESDE = 20000;

const CUPONES = {
  CACHE10: {
    tipo: "porcentaje",
    valor: 10,
    texto: "10% de descuento aplicado."
  },
  ENVIOGRATIS: {
    tipo: "envio",
    valor: 0,
    texto: "Envío gratis aplicado."
  }
};

const CarritoContext = createContext(null);

function buscarProducto(slug) {
  return todosLosProductos.find(
    (producto) => producto.slug === slug
  );
}

function obtenerLimiteStock(producto) {
  if (typeof producto.stock === "number") {
    return Number.isFinite(producto.stock)
      ? Math.max(0, Math.floor(producto.stock))
      : 0;
  }

  return producto.stock === false ? 0 : Infinity;
}

function cargarCarrito() {
  try {
    const guardado = JSON.parse(
      localStorage.getItem(CLAVE_CARRITO) || "[]"
    );

    if (!Array.isArray(guardado)) return [];

    const itemsValidos = [];

    for (const item of guardado) {
      if (!item) continue;
      if (!Number.isInteger(item.cantidad)) continue;
      if (item.cantidad < 1) continue;

      const producto = buscarProducto(item.slug);

      if (!producto) continue;

      const limite = obtenerLimiteStock(producto);

      if (limite === 0) continue;

      const existente = itemsValidos.find(
        (elemento) => elemento.slug === producto.slug
      );

      if (existente) {
        existente.cantidad = Math.min(
          existente.cantidad + item.cantidad,
          limite
        );
      } else {
        itemsValidos.push({
          slug: producto.slug,
          cantidad: Math.min(item.cantidad, limite)
        });
      }
    }

    return itemsValidos;
  } catch {
    return [];
  }
}

function cargarCupon() {
  try {
    const codigo = localStorage.getItem(CLAVE_CUPON);

    return Object.hasOwn(CUPONES, codigo)
      ? codigo
      : null;
  } catch {
    return null;
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(cargarCarrito);
  const [cupon, setCupon] = useState(cargarCupon);

  useEffect(() => {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(items)
    );
  }, [items]);

  useEffect(() => {
    if (cupon) {
      localStorage.setItem(CLAVE_CUPON, cupon);
    } else {
      localStorage.removeItem(CLAVE_CUPON);
    }
  }, [cupon]);

  function agregarAlCarrito(slug, cantidad = 1) {
    const producto = buscarProducto(slug);
    const unidades = Number(cantidad);

    if (!producto) {
      return {
        ok: false,
        mensaje: "El producto ya no está disponible."
      };
    }

    if (!Number.isInteger(unidades) || unidades < 1) {
      return {
        ok: false,
        mensaje: "Ingresa una cantidad entera mayor que cero."
      };
    }

    const limite = obtenerLimiteStock(producto);

    if (limite === 0) {
      return {
        ok: false,
        mensaje: "Este producto está agotado."
      };
    }

    const existente = items.find(
      (item) => item.slug === slug
    );

    const nuevaCantidad =
      (existente?.cantidad || 0) + unidades;

    if (nuevaCantidad > limite) {
      return {
        ok: false,
        mensaje: `Solo quedan ${limite} unidades disponibles.`
      };
    }

    setItems((anteriores) => {
      const encontrado = anteriores.find(
        (item) => item.slug === slug
      );

      if (encontrado) {
        return anteriores.map((item) =>
          item.slug === slug
            ? {
                ...item,
                cantidad: Math.min(
                  item.cantidad + unidades,
                  limite
                )
              }
            : item
        );
      }

      return [
        ...anteriores,
        {
          slug,
          cantidad: unidades
        }
      ];
    });

    return {
      ok: true,
      mensaje: "Producto agregado al carrito."
    };
  }

  function actualizarCantidad(slug, cantidad) {
    const unidades = Number(cantidad);
    const producto = buscarProducto(slug);

    if (!producto) return;

    if (!Number.isInteger(unidades) || unidades < 1) {
      return;
    }

    const limite = obtenerLimiteStock(producto);

    if (limite === 0) {
      quitarDelCarrito(slug);
      return;
    }

    setItems((anteriores) =>
      anteriores.map((item) =>
        item.slug === slug
          ? {
              ...item,
              cantidad: Math.min(unidades, limite)
            }
          : item
      )
    );
  }

  function quitarDelCarrito(slug) {
    setItems((anteriores) =>
      anteriores.filter(
        (item) => item.slug !== slug
      )
    );
  }

  function vaciarCarrito() {
    setItems([]);
  }

  function aplicarCupon(codigoIngresado) {
    const codigo = String(codigoIngresado || "")
      .trim()
      .toUpperCase();

    if (!codigo) {
      setCupon(null);

      return {
        ok: false,
        mensaje: "Escribe un cupón."
      };
    }

    if (!Object.hasOwn(CUPONES, codigo)) {
      setCupon(null);

      return {
        ok: false,
        mensaje: "El cupón no es válido."
      };
    }

    setCupon(codigo);

    return {
      ok: true,
      mensaje: CUPONES[codigo].texto
    };
  }

  function quitarCupon() {
    setCupon(null);
  }

  const productosCarrito = items.flatMap((item) => {
    const producto = buscarProducto(item.slug);

    if (!producto) return [];

    return [
      {
        ...producto,
        cantidad: item.cantidad,
        subtotal: producto.precio * item.cantidad
      }
    ];
  });

  const cantidadTotal = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const subtotal = productosCarrito.reduce(
    (total, producto) => total + producto.subtotal,
    0
  );

  let envio =
    subtotal === 0 || subtotal >= ENVIO_GRATIS_DESDE
      ? 0
      : COSTO_ENVIO;

  let descuento = 0;

  if (cupon && subtotal > 0) {
    const datosCupon = CUPONES[cupon];

    if (datosCupon.tipo === "porcentaje") {
      descuento = Math.round(
        (subtotal * datosCupon.valor) / 100
      );
    }

    if (datosCupon.tipo === "envio") {
      envio = 0;
    }
  }

  const totales = {
    subtotal,
    descuento,
    envio,
    total: subtotal - descuento + envio
  };

  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        cantidadTotal,
        cupon,
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
  const contexto = useContext(CarritoContext);

  if (contexto === null) {
    throw new Error(
      "useCarrito debe usarse dentro de CarritoProvider."
    );
  }

  return contexto;
}
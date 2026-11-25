import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { categoriaService, productoService } from "../services";
import { mensajeDeError } from "../services/api";

const ProductosContext = createContext({
  productos: [],
  categorias: [],
  cargando: true,
  error: "",
  recargar: () => {},
});

// Carga el catálogo desde el backend una sola vez y lo comparte con toda la app
export function ProductosProvider({ children }) {
  const [estado, setEstado] = useState({
    productos: [],
    categorias: [],
    cargando: true,
    error: "",
  });

  const recargar = useCallback(() => {
    return Promise.all([productoService.listar(), categoriaService.listar()])
      .then(([productos, categorias]) =>
        setEstado({ productos, categorias, cargando: false, error: "" })
      )
      .catch((e) =>
        setEstado((anterior) => ({ ...anterior, cargando: false, error: mensajeDeError(e) }))
      );
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return (
    <ProductosContext.Provider value={{ ...estado, recargar }}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}

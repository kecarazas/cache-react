import { api, tokens } from "./api";

const datos = (r) => r.data;

export const authService = {
  async login(correo, clave) {
    const r = await api.post("/auth/login", { correo, clave }).then(datos);
    tokens.guardar(r);
    return r.usuario;
  },
  // El registro público crea un cliente; luego el usuario inicia sesión
  registro: (usuario) => api.post("/auth/registro", usuario).then(datos),
  logout: () => tokens.borrar(),
};

export const categoriaService = {
  listar: () => api.get("/categorias").then(datos),
};

export const productoService = {
  listar: (categoria) => api.get("/productos", { params: { categoria } }).then(datos),
  porSlug: (slug) => api.get(`/productos/slug/${slug}`).then(datos),
  crear: (producto) => api.post("/productos", producto).then(datos),
  actualizar: (id, producto) => api.put(`/productos/${id}`, producto).then(datos),
  eliminar: (id) => api.delete(`/productos/${id}`),
};

export const pedidoService = {
  comprar: (compra) => api.post("/pedidos", compra).then(datos),
  mios: () => api.get("/pedidos/mias").then(datos),
  todos: () => api.get("/pedidos").then(datos),
};

export const usuarioService = {
  listar: () => api.get("/usuarios").then(datos),
  crear: (usuario) => api.post("/usuarios", usuario).then(datos),
  actualizar: (id, usuario) => api.put(`/usuarios/${id}`, usuario).then(datos),
  eliminar: (id) => api.delete(`/usuarios/${id}`),
};

export const reporteService = {
  resumen: () => api.get("/reportes/resumen").then(datos),
};

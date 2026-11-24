import axios from "axios";

export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1";

const CLAVE_TOKENS = "at_tokens";
const CLAVE_SESION = "at_sesion";

export const tokens = {
  leer() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_TOKENS)) || null;
    } catch {
      return null;
    }
  },
  guardar({ accessToken, refreshToken }) {
    localStorage.setItem(CLAVE_TOKENS, JSON.stringify({ accessToken, refreshToken }));
  },
  borrar() {
    localStorage.removeItem(CLAVE_TOKENS);
  },
};

export const api = axios.create({ baseURL: API_URL, timeout: 15000 });

// Agrega el token a cada petición si hay sesión
api.interceptors.request.use((config) => {
  const t = tokens.leer();
  if (t?.accessToken) config.headers.Authorization = `Bearer ${t.accessToken}`;
  return config;
});

// Si el access token venció (401): renueva con el refresh token y repite la petición una vez
let renovando = null;

api.interceptors.response.use(
  (respuesta) => respuesta,
  async (error) => {
    const original = error.config;
    const t = tokens.leer();
    const esAuth = original?.url?.includes("/auth/");

    if (error.response?.status === 401 && t?.refreshToken && original && !original._reintento && !esAuth) {
      original._reintento = true;
      try {
        renovando =
          renovando || axios.post(`${API_URL}/auth/refresh`, { refreshToken: t.refreshToken });
        const { data } = await renovando;
        renovando = null;
        tokens.guardar(data);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        renovando = null;
        tokens.borrar();
        localStorage.removeItem(CLAVE_SESION);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// El backend responde { status, mensaje, errores, fecha }
export function mensajeDeError(e) {
  if (!e?.response) {
    return "No se pudo conectar con el servidor. ¿Está encendido el backend?";
  }
  const d = e.response.data;
  if (d?.errores && Object.keys(d.errores).length) {
    return Object.values(d.errores).join(" · ");
  }
  return d?.mensaje || `Error ${e.response.status}`;
}

import { createContext, useContext, useState } from "react";
import { authService } from "../services";
import { tokens } from "../services/api";

const CLAVE_SESION = "at_sesion";

const AuthContext = createContext({
  sesion: null,
  iniciarSesion: async () => {},
  cerrarSesion: () => {},
});

// La sesión solo es válida si además hay tokens guardados
function leerSesion() {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE_SESION));
    return guardada && tokens.leer() ? guardada : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion);

  // Lanza el error del backend si las credenciales no son válidas
  const iniciarSesion = async (correo, clave) => {
    const usuario = await authService.login(correo, clave);
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    setSesion(usuario);
    return usuario;
  };

  const cerrarSesion = () => {
    authService.logout();
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
  };

  return (
    <AuthContext.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

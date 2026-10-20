import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_SESION = "at_sesion";

const AuthContext = createContext({
  sesion: null,
  iniciarSesion: () => {},
  cerrarSesion: () => {}
});

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem(CLAVE_SESION);

    if (guardado) {
      try {
        setSesion(JSON.parse(guardado));
      } catch {
        localStorage.removeItem(CLAVE_SESION);
      }
    }
  }, []);

  const iniciarSesion = (usuario) => {
    const nuevaSesion = {
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      tipoUsuario: usuario.tipoUsuario
    };

    localStorage.setItem(CLAVE_SESION, JSON.stringify(nuevaSesion));
    setSesion(nuevaSesion);
  };

  const cerrarSesion = () => {
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
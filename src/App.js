import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import Nosotros from "./pages/Nosotros";
import Login from "./pages/Login";
import Contacto from "./pages/Contacto";
import Registro from "./pages/Registro";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />

          <div className="contenido">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categoria/:producto" element={<Categoria />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
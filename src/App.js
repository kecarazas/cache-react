import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Categoria from './pages/Categoria';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Contacto from './pages/Contacto';
import Producto from './pages/Producto';
import Registro from './pages/Registro';
import Blog from './pages/Blog';

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="contenido">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:producto" element={<Categoria />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:slug" element={<Producto />} />
          <Route path="/blogs" element={<Blog />} />
        </Routes>

      </div>

      <Footer />
    </div>
  );
}

export default App;

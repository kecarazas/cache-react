import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/store/Home';
import Categoria from './pages/store/Categoria';
import Nosotros from './pages/store/Nosotros';
import Login from './pages/store/Login';
import Contacto from './pages/store/Contacto';
import Producto from './pages/store/Producto';
import Registro from './pages/store/Registro';
import Blog from './pages/store/Blog';
import BlogDetalle from './pages/store/BlogDetalle';

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
          <Route path="/blogs/:id" element={<BlogDetalle />} />
        </Routes>

      </div>

      <Footer />
    </div>
  );
}

export default App;

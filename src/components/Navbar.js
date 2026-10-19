import './Navbar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
 
function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    return (
    <header>
        <nav className="cabecera">
            <div className="logo">
                <Link to="/">
                    <img src="images/Cachelogo.png" alt="logo" />
                    <h1>Cache - Tools</h1>
                </Link>
            </div>
            <div className="acciones-cabecera">
                <button
                    type="button"
                    className="btn-menu"
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                    aria-controls="content-menu"
                    onClick={() => setMenuAbierto(!menuAbierto)}>
                    <span />
                    <span />
                    <span />
                </button>
            </div>            
            <div className={`content-menu ${menuAbierto ? "visible" : ""}`}
                id="content-menu">
            <ul className="menu">
                <li><Link to="/" className="activo" aria-current="page">Inicio</Link></li>
                <li className="menu-categorias">
                <details>
                    <summary>Categorías</summary>
                    <ul className="submenu">
                    <li><Link to="/Categoria/mouse">Mouses</Link></li>
                    <li><Link to="/Categoria/mousepad">Mousepads</Link></li>
                    <li><Link to="/Categoria/teclado">Teclados</Link></li>
                    <li><Link to="/Categoria/skate">Skates</Link></li>
                    <li><Link to="/Categoria/audifonos">Audífonos</Link></li>
                    <li><Link to="/Categoria/mangas">Mangas</Link></li>
                    </ul>
                </details>
                </li>
                <li><Link to="/Categoria">Productos</Link></li>
                <li><Link to="/Blogs">Blogs</Link></li>
                <li><Link to="/Nosotros">Nosotros</Link></li>
                <li><Link to="/Contacto">Contacto</Link></li>
            </ul>
            <div className="buscar">
                <form action="" method="get" role="search">
                <img src="images/lupa.png" aria-hidden="true" alt="Lupa" />
                <label htmlFor="busqueda">Buscar productos</label>
                <input type="text" id="busqueda" name="q" placeholder="Mouse" />
                </form>
            </div>
                <Link to="/Carrito" className="carrito-nav" aria-label="Ver carrito de compras">
                    <img src="images/carrito-de-compras.png" alt="Carrito de compras" />
                    <span className="carrito-count oculto">0</span>
                </Link>
            <div className="auth-area" id="auth-area" />
            </div>
        </nav>
    </header>
    );
}

export default Navbar;
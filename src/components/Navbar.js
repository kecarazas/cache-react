import './Navbar.css'
import { useState } from 'react';
 
function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    return (
    <header>
    <nav className="cabecera">
        <div className="logo">
        <a href="/Home">
            <img src="images/Cachelogo.png" alt="logo" />
            <h1>Art Tools</h1>
        </a>
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
            <li><a href="index.html" className="activo" aria-current="page">Inicio</a></li>
            <li className="menu-categorias">
            <details>
                <summary>Categorías</summary>
                <ul className="submenu">
                <li><a href="">Mouses</a></li>
                <li><a href="">Mousepads</a></li>
                <li><a href="">Teclados</a></li>
                <li><a href="">Skates</a></li>
                <li><a href="">Audífonos</a></li>
                <li><a href="">Mangas</a></li>
                </ul>
            </details>
            </li>
            <li><a href="/Productos">Productos</a></li>
            <li><a href="">Blogs</a></li>
            <li><a href="/Nosotros">Nosotros</a></li>
            <li><a href="/Contacto">Contacto</a></li>
        </ul>
        <div className="buscar">
            <form action="" method="get" role="search">
            <img src="images/lupa.png" alt aria-hidden="true" />
            <label htmlFor="busqueda">Buscar productos</label>
            <input type="text" id="busqueda" name="q" placeholder="Mouse" />
            </form>
        </div>
            <a className="carrito-nav" href="" aria-label="Ver carrito de compras">
            <img src="images/carrito-de-compras.png" alt />
            <span className="carrito-count oculto">0</span>
        </a>
        <div className="auth-area" id="auth-area" />
        </div>
    </nav>
    </header>
    );
}

export default Navbar;
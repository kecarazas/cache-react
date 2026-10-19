import './Navbar.css'
import { Link } from 'react-router-dom'
 
function Navbar() {
    return (
        <header>
            <nav className="nav-bar">
                <div className="navbar">
                    <Link to="/">
                        <img src="images/Cachelogo.png" className="nav-logo" alt="logo"/>
                    </Link>
                </div>

                <form className="search-box">
                    <input type="text" placeholder="Buscar algo" name="buscar" required />
                </form>

                <div className="nav-derecha">
                    <div className="login">
                        <a href="login.html">INICIAR SESIÓN</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
import './Navbar.css'

function Navbar() {
    return (
        <header>
            <nav className="nav-bar">
                <div className="navbar">
                    <a href="index.html">
                        <img src="images/Cachelogo.png" className="nav-logo" alt="logo"/>
                    </a>
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
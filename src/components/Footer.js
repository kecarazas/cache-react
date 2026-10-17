import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer1">
                <div className="pie-pagina">
                    <img src="images/Cachelogo.png" alt="logo"/>
                </div>
                <div className="pie-pagina">
                    <a href="sobre-nosotros.html">Sobre nosotros</a>         
                </div>
                <div className="pie-pagina">
                    <a href="contacto.html">Contacto <br/> </a>
                    <span>
                        <br />
                        contacto@cache.cl <br/>
                        <br/>
                        +569 5597 9994<br/>
                        <br/>
                    </span>
                </div>
            </div>
            <div className="footer2">
            </div>
            
        </footer>
    );
}

export default Footer;
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
                        +569 5597 9994 <br/>
                        <br/>
                        <p>Cache: La evolución de tu setup.</p>
                        <p>Somos la selección definitiva para el gamer exigente.</p>
                        <p>Descubre periféricos premium seleccionados y probados por expertos y disfruta de despachos rápidos con pagos seguros.</p>
                        <p>Tu próximo nivel empieza aquí.</p>    
                    </span>
                </div>
            </div>
            <div className="footer2">
            </div>
            
        </footer>
    );
}

export default Footer;
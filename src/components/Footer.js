import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="footer1">
                <div className="pie-pagina">
                    <img src="images/Cachelogo.png" alt="logo"/>
                </div>
                <div className="pie-pagina">
                    <Link to="/nosotros">Sobre nosotros</Link>         
                </div>
                <div className="pie-pagina">
                    <Link to="/contacto">Contacto <br/> </Link>
                    <span>
                        <br />
                        contacto@cache.cl <br/>
                        <br/>
                        +569 5597 9994 <br/>
                        <br/>
                        <p>
                            Cache: La evolución de tu setup.
                            Somos la selección definitiva para el gamer exigente.
                            Descubre periféricos premium seleccionados y probados 
                            por expertos y disfruta de despachos rápidos con pagos seguros.
                            Tu próximo nivel empieza aquí.
                        </p>    
                    </span>
                </div>
            </div>
            <div className="footer2">
            </div>
            
        </footer>
    );
}

export default Footer;
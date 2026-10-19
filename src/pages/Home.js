import { Link } from 'react-router-dom';
import Slider from "../components/Slider";
import "./Home.css"

function Home() {
    return (
        <>
            <Slider />

            <section>

            <div class="texto">
                <p>categoria seleccionada</p>
            </div>

            </section>
        
            <section className="seccion2">
                <div className="prod1">

                    <Link to="/productos/mouse" className="prod2">
                        <span className="texto-barra">MOUSE</span>
                        <img src="images/mouse.png" alt="" className="cards" />
                    </Link>

                    <Link to="/productos/mousepad" className="prod2">
                    <span className="texto-barra">MOUSEPAD</span>
                    <img src="images/mousepad.png" alt="" className="cards" />
                    </Link>

                </div>

                <div className="prod1">

                    <Link to="/productos/teclado" className="cards2">
                    <span className="texto-barra">TECLADO</span>
                    <img src="images/teclado.png" alt="" className="img-cat" />
                    </Link>

                    <Link to="/productos/skate" className="cards2">
                    <span className="texto-barra">SKATES</span>
                    <img src="images/skate.png" alt="" className="img-cat" />
                    </Link>

                    <Link to="/productos/audifonos" className="cards2">
                    <span className="texto-barra">AUDIFONOS</span>
                    <img src="images/audifonos.png" alt="" className="img-cat" />
                    </Link>

                    <Link to="/productos/mangas" className="cards2">
                    <span className="texto-barra">MANGAS</span>
                    <img src="images/mangas.png" alt="" className="img-cat" />
                    </Link>

                </div>
            
            </section>
        </>
    )
}

export default Home;
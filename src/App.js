import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Slider from './components/slider';

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="contenido">

        <Slider />

        <section>

          <div class="texto">
            <p>categoria seleccionada</p>
          </div>

        </section>
    
        <section className="seccion2">
          <div className="prod1">

            <a href="#" class="prod2">
              <span className="texto-barra">MOUSE</span>
              <img src="images/mouse.png" alt="" className="cards" />
            </a>

            <a href="#" className="prod2">
              <span className="texto-barra">MOUSEPAD</span>
              <img src="images/mousepad.png" alt="" className="cards" />
            </a>

          </div>

          <div className="prod1">

            <a href="#" className="cards2">
              <span className="texto-barra">TECLADO</span>
              <img src="images/teclado.png" alt="" className="img-cat" />
            </a>

            <a href="#" className="cards2">
              <span className="texto-barra">SKATES</span>
              <img src="images/skate.png" alt="" className="img-cat" />
            </a>

            <a href="#" className="cards2">
              <span className="texto-barra">AUDIFONOS</span>
              <img src="images/audifonos.png" alt="" className="img-cat" />
            </a>

            <a href="#" className="cards2">
              <span className="texto-barra">MANGAS</span>
              <img src="images/mangas.png" alt="" className="img-cat" />
            </a>

          </div>
          
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default App;

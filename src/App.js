import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="contenido">
        <h1>Bienvenido a CACHÉ</h1>
        <p>La evolución de tu setup.</p>
        <p>Somos la selección definitiva para el gamer exigente.</p>
        <p>Descubre periféricos premium seleccionados y probados por expertos y disfruta de despachos rápidos con pagos seguros.</p>
        <p>Tu próximo nivel empieza aquí.</p>
      </main>

      <Footer />
    </div>
  );
}

export default App;

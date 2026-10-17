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
      </div>

      <Footer />
    </div>
  );
}

export default App;

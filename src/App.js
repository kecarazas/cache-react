import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="contenido">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:categoria" element={<Productos />} />
        </Routes>

      </div>

      <Footer />
    </div>
  );
}

export default App;

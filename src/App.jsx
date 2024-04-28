import { BrowserRouter, Routes, Route } from "react-router-dom";
import InstrumentoList from './components/Productos/InstrumentoList'
import DetalleProducto from './components/Productos/DetalleProducto'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Ubicacion from './components/Ubicacion/Ubicacion';

const mapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBHw4xgFowelmI7zD7y_quHrFZOKEx3xhk"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/donde-estamos" 
          element={<Ubicacion 
                      googleMapURL={mapURL}
                      containerElement={<div style={{height: '400px'}} />}
                      mapElement={<div style={{height: '100%'}} />}
                    />} 
        />
        <Route path="/productos" element={<InstrumentoList />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

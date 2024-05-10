import { useState, useEffect } from 'react';
import { FiTruck } from "react-icons/fi";
import '../../styles/instrumento.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const InstrumentoList = () => {
  const [instrumentos, setInstrumentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/instrumentos')
      .then(response => response.json())
      .then(data => setInstrumentos(data))
      .catch(error => console.error('Error al cargar los instrumentos:', error));

    fetch('http://localhost:8080/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al cargar las categorías:', error));
  }, []);

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const instrumentosFiltrados = categoriaSeleccionada
    ? instrumentos.filter(instrumento => instrumento.idCategoria === categoriaSeleccionada)
    : instrumentos;

  return (
    <div className="instrumento-container">
      <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
        <option value="">Todas las categorías</option>
        {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
        ))}
      </select>
      {instrumentosFiltrados.map(instrumento => (
        <div key={instrumento.id} className="instrumento-item">
          <img src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} width="120px" className="img-fluid" /> 
          <div className="instrumento-info">
            <h2 style={{ fontWeight: 'normal' }}>{instrumento.instrumento}</h2>
            <p style={{ fontSize: '24px' }}><strong>${instrumento.precio}</strong></p>
            <p className={instrumento.costoEnvio === "G" ? "envio-gratis" : "envio-pago"}>
              {instrumento.costoEnvio === "G" ? (
                <>
                  <FiTruck /> Envío gratis a todo el país
                </>
              ) : (
                `Costo de envío interior de Argentina: $${instrumento.costoEnvio}`
              )}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <p>{`${instrumento.cantidadVendida} vendidos` }</p>
              <Link to={`/detalle/${instrumento.id}`}>
                <Button variant="outline-success">Ver Detalle</Button>
              </Link>
            </div>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentoList;

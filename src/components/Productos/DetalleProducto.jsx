import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/instrumento.css';
import { FiTruck } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';

const DetalleProducto = () => {
  const [instrumento, setInstrumento] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    fetch(`http://localhost:8080/instrumentos/${id}`)
      .then(response => response.json())
      .then(data => setInstrumento(data))
      .catch(error => console.error('Error al cargar el instrumento:', error));
  }, [id]);


  const handleDelete = () => {
    if (window.confirm('¿Estás seguro que quieres eliminar este producto?')) {
      fetch(`http://localhost:8080/instrumentos/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        history.push('/productos');
      })
      .catch(error => console.error('Error al eliminar el instrumento:', error));
    }
  };

  if (!instrumento) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalle-producto-container">
      <div className="detalle-producto-info">
        <div className="detalle-producto-imagen">
          <img src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} />
        </div>
        <div className="detalle-producto-detalle">
          <h2>{instrumento.instrumento}</h2>
          <p>Precio: $ {instrumento.precio}</p>
          <p>Marca: {instrumento.marca}</p>
          <p>Modelo: {instrumento.modelo}</p>
          {instrumento.idCategoria && (
            <p>Categoría: {instrumento.idCategoria.denominacion}</p>
          )}
          <p className={instrumento.costoEnvio === 'G' ? 'envio-gratis' : 'envio-pago'}>
            {instrumento.costoEnvio === 'G' ? (
              <>
                <FiTruck /> Envío gratis a todo el país
              </>
            ) : (
              `Costo de envío interior de Argentina: $${instrumento.costoEnvio}`
            )}
          </p>
        </div>
      </div>
      <div className="detalle-producto-descripcion">
        <h3>Descripción</h3>
        <p>{instrumento.descripcion}</p>
      </div>
      <div className="abm-producto-buttons">
        <div className="abm-producto-buttons-container">
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <div style={{ marginLeft: '10px' }} /> 
          <Link to={`/editar/${instrumento.id}`}>
            <Button variant="primary">Editar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;

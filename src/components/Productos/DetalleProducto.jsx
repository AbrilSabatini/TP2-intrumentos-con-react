import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/instrumento.css';
import { FiTruck } from "react-icons/fi";

const DetalleProducto = () => {
  const [instrumento, setInstrumento] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    fetch("/instrumentos/instrumentos.json")
      .then(response => response.json())
      .then(data => {
        const instrumentoEncontrado = data.instrumentos.find(item => item.id === id);
        setInstrumento(instrumentoEncontrado);
      })
      .catch(error => console.error('Error al cargar los instrumentos:', error));
  }, [id]);

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
          <p className={instrumento.costoEnvio === "G" ? "envio-gratis" : "envio-pago"}>
            {instrumento.costoEnvio === "G" ? (
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
    </div>
  );
}

export default DetalleProducto;

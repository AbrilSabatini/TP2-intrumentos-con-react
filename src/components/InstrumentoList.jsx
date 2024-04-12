import {useState, useEffect} from 'react'
import { FiTruck } from "react-icons/fi";
import '../styles/instrumento.css'

const InstrumentoList = () => {
  const [instrumentos, setInstrumentos] = useState([])

  useEffect(() => {
    fetch("/instrumentos/instrumentos.json")
      .then(response => response.json())
      .then(data => setInstrumentos(data.instrumentos))
      .catch(error => console.error('Error al cargar los instrumentos:', error));
  }, []); 

 
  return (
    <div className="instrumento-container">
      {instrumentos.map(instrumento => (
        <div key={instrumento.id} className="instrumento-item" >
            <img src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} width="120px" className="img-fluid"/> 
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
              <p>{`${instrumento.cantidadVendida} vendidos` }</p>
          <hr />
          </div>
        </div>
      ))}
    </div>
  )
}

export default InstrumentoList

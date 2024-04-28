import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/carousel.css'; // Importa los estilos CSS

const Home = () => {
  const [instrumentos, setInstrumentos] = useState([]);

  useEffect(() => {
    fetch("/instrumentos/instrumentos.json")
      .then(response => response.json())
      .then(data => setInstrumentos(data.instrumentos))
      .catch(error => console.error('Error al cargar los instrumentos:', error));
  }, []);

  return (
    <>
      <div className="carousel-wrapper mt-5">
        <Carousel>
          {instrumentos.map((instrumento) => (
            <Carousel.Item key={instrumento.id}>
            <img
                className="mx-auto d-block"
                src={`/img/${instrumento.imagen}`}
                alt={instrumento.instrumento} 
                style={{ maxWidth: '500px', maxHeight: '500px', width: '500%', height: 'auto' }}
              />
              <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <h3>{instrumento.instrumento}</h3>
                <p>{instrumento.descripcion}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="text-center">
        <h1 style={{ color: 'blue', fontSize: '3rem' }}>NegoZona</h1>
        <img
          className="mx-auto d-block"
          src="https://images-negozona-argentina.s3.amazonaws.com/uploads/picture/image/51/M_sica.jpg"
          style={{ maxWidth: '700px', maxHeight: '700px', width: '100%', height: 'auto' }}
        />
        <p>
          NegoZona es una tienda de instrumentos musicales con ya más de 15 años de
          experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
          mejores elecciones para tu compra musical.
        </p>
      </div>
    </>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const EditarProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/instrumentos/${id}`)
      .then(response => response.json())
      .then(data => {
        setProducto(data);
        setCategoriaSeleccionada(data.idCategoria.id); 
      })
      .catch(error => console.error('Error al cargar el producto:', error));
  
    fetch('http://localhost:8080/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al cargar las categorías:', error));
  }, [id]);
  

  const handleActualizarProducto = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = {};
    formData.forEach((value, key) => {
      datos[key] = value;
    });

    fetch(`http://localhost:8080/instrumentos/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => {
      if (response.ok) {
        history.push(`/detalle/${id}`);
      } else {
        throw new Error('Error al actualizar el producto');
      }
    })
    .catch(error => console.error(error));
  };

  const handleCategoriaChange = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);
  };

  if (!producto || categorias.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Editar Producto</h2>
      <Form onSubmit={handleActualizarProducto}>
        <div className="row">
          <Form.Group className="mb-3" controlId="formGroupInstrumento">
            <Form.Label>Instrumento</Form.Label>
            <Form.Control type="text" defaultValue={producto.instrumento} name="instrumento" />
          </Form.Group>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formGroupMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" defaultValue={producto.marca} name="marca" />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formGroupModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control type="text" defaultValue={producto.modelo} name="modelo" />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formGroupPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" defaultValue={producto.precio} name="precio" />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formGroupCostoEnvio">
              <Form.Label>Costo de envío</Form.Label>
              <Form.Control type="number" defaultValue={producto.costoEnvio} name="costoEnvio" />
            </Form.Group>
          </div>
        </div>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripción del producto</Form.Label>
          <Form.Control as="textarea" rows={2} defaultValue={producto.descripcion} name="descripcion" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupCategoria">
          <Form.Label>Categoría</Form.Label>
          <div>
            {categorias.map((categoria) => (
              <div key={categoria.id} className="form-check form-check-inline">
                <input
                  type="radio"
                  id={`categoria-${categoria.id}`}
                  name="categoria"
                  value={categoria.id}
                  checked={categoria.id === categoriaSeleccionada}
                  onChange={() => handleCategoriaChange(categoria.id)}
                  className="form-check-input"
                />
                <label htmlFor={`categoria-${categoria.id}`} className="form-check-label">
                  {categoria.denominacion}
                </label>
              </div>
            ))}
          </div>
        </Form.Group>
        <button type="submit" className="btn btn-primary">Guardar cambios</button>
      </Form>
    </div>
  );  
};

export default EditarProducto;

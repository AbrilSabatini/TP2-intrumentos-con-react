import React from 'react'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const AltaProducto = () => {
  const [categorias, setCategorias] = useState<{ id: number; denominacion: string; }[]>([]);


  useEffect(() => {
    // Cargar las categorías desde el servidor al montar el componente
    fetch('http://localhost:8080/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al cargar las categorías:', error));
  }, []);

  const handleCrearProducto = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = {};
    formData.forEach((value, key) => {
      datos[key] = value;
    });

    // Enviar los datos al servidor para crear el producto
    fetch(`http://localhost:8080/instrumentos`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => {
      if (response.ok) {
        // Si la creación es exitosa, redirigir a la página de detalles del nuevo producto
        return response.json();
      } else {
        throw new Error('Error al crear el producto');
      }
    })
    .then(data => {
      <Link to={`/detalle/${data.id}`} />;
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Alta de Producto</h2>
      <Form onSubmit={handleCrearProducto}>
        <div className="row">
          <Form.Group className="mb-3 col-md-3" controlId="formGroupMarca">
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text" placeholder="Marca del instrumento" name="marca" />
          </Form.Group>
  
          <Form.Group className="mb-3 col-md-3" controlId="formGroupModelo">
            <Form.Label>Modelo</Form.Label>
            <Form.Control type="text" placeholder="Modelo del instrumento" name="modelo" />
          </Form.Group>
  
          <Form.Group className="mb-3 col-md-3" controlId="formGroupPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" placeholder="Precio del instrumento" name="precio" />
          </Form.Group>
  
          <Form.Group className="mb-3 col-md-3" controlId="formGroupCostoEnvio">
            <Form.Label>Costo de envío</Form.Label>
            <Form.Control type="number" placeholder="Costo de envío del instrumento" name="costoEnvio" />
          </Form.Group>
        </div>
  
        <Form.Group className="mb-3" controlId="formGroupInstrumento">
          <Form.Label>Instrumento</Form.Label>
          <Form.Control type="text" placeholder="Nombre del instrumento" name="instrumento" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formGroupDescripcion">
          <Form.Label>Descripción del instrumento</Form.Label>
          <Form.Control as="textarea" placeholder="Descripción del instrumento" name="descripcion" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupImagen">
          <Form.Label>Enlace de la Imagen</Form.Label>
          <Form.Control type="text" placeholder="Enlace de la imagen del producto" name="imagen" />
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
                  className="form-check-input"
                />
                <label htmlFor={`categoria-${categoria.id}`} className="form-check-label">
                  {categoria.denominacion}
                </label>
              </div>
            ))}
          </div>
        </Form.Group>
  
        {/* Agregar botón para guardar cambios */}
        <button type="submit" className="btn btn-primary">Guardar Producto</button>
      </Form>
    </div>
  );  
};

export default AltaProducto;

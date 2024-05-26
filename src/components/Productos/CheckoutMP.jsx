import { useCarrito } from '../../hooks/useCarrito';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const CheckoutMP = ({ montoCarrito }) => {
  const { cart, limpiarCarrito } = useCarrito();

  const guardarCarrito = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. No se puede guardar un pedido vacío.');
      return;
    }  

    try {
      const detallesPedido = cart.map(item => ({
        id: 0, 
        instrumento: {
          id: item.id,
        },
        cantidad: item.cantidad,
        pedido: null 
      }));

      const pedido = {
        id: 0, 
        total: montoCarrito,
        fechaPedido: new Date().toISOString().split('T')[0], 
        detalles: detallesPedido
      };

      const response = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        const data = await response.json();
        limpiarCarrito();
        alert(`El pedido con id ${data.id} se guardó correctamente.`);
      } else {
        throw new Error('Error al guardar el pedido.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar el pedido.');
    }
  };

  return (
    <Button onClick={guardarCarrito} variant="primary">Guardar Carrito</Button>
  );
};

CheckoutMP.propTypes = {
  montoCarrito: PropTypes.number.isRequired,
};

export default CheckoutMP;

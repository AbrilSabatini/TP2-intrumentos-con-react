import { useCarrito } from '../../hooks/useCarrito';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';

const CheckoutMP = ({ montoCarrito }) => {
  const { cart, limpiarCarrito } = useCarrito();
  const [idPreference, setIdPreference] = useState('');
  const [mostrarBotonPago, setMostrarBotonPago] = useState(false);

  const guardarCarritoYCrearPreferencia = async () => {
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
        pedido: null,
      }));

      const pedido = {
        id: 0,
        total: montoCarrito,
        fechaPedido: new Date().toISOString().split('T')[0],
        detalles: detallesPedido,
      };

      // Guardar el carrito
      const responseGuardar = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (responseGuardar.ok) {
        const dataGuardar = await responseGuardar.json();
        limpiarCarrito();
        alert(`El pedido con id ${dataGuardar.id} se guardó correctamente.`);

        // Crear preferencia de Mercado Pago
        const responsePreferencia = await fetch('http://localhost:8080/api/create_preference_mp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedido),
        });

        if (responsePreferencia.ok) {
          const dataPreferencia = await responsePreferencia.json();
          setIdPreference(dataPreferencia.id);
          setMostrarBotonPago(true); // Mostrar el botón de pago
        } else {
          throw new Error('Error al crear la preferencia.');
        }
      } else {
        throw new Error('Error al guardar el pedido.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar el pedido y crear la preferencia.');
    }
  };

  initMercadoPago('TEST-bd3c7909-3885-438a-b62b-51cecd7510f8', { locale: 'es-AR' });

  return (
    <div>
      <Button onClick={guardarCarritoYCrearPreferencia} variant="primary">
        Guardar Carrito
      </Button>
      {mostrarBotonPago && (
        <div>
          <button className='btMercadoPago'>Pagar con Mercado Pago</button>
          <Wallet
            initialization={{ preferenceId: idPreference, redirectMode: 'blank' }}
            customization={{ texts: { valueProp: 'smart_option' } }}
          />
        </div>
      )}
    </div>
  );
};

CheckoutMP.propTypes = {
  montoCarrito: PropTypes.number.isRequired,
};

export default CheckoutMP;

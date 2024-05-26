import { useContext } from 'react';
import { CartContext } from '../../hooks/useCarrito';

const ShoppingCart = () => {
  const { cart, removeCarrito, removeItemCarrito, addCarrito, totalPedido } = useContext(CartContext);

  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.instrumento} - Cantidad: {item.cantidad} - Precio: ${item.precio}
            <button onClick={() => addCarrito(item)}>+</button>
            <button onClick={() => removeItemCarrito(item)}>-</button>
            <button onClick={() => removeCarrito(item)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPedido}</p>
      <button onClick={() => console.log('Guardar Carrito')}>Guardar Carrito</button>
    </div>
  );
};

export default ShoppingCart;

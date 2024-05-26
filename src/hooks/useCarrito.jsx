import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  totalPedido: 0,
});

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCarrito = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id: product.id, instrumento: product.instrumento, cantidad: 1, precio: product.precio }]);
    }
  };

  const removeCarrito = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
  };

  const removeItemCarrito = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem && existingItem.cantidad > 1) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
      );
    } else {
      removeCarrito(product);
    }
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const totalPedido = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
  );
};

CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el contexto
export const useCarrito = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

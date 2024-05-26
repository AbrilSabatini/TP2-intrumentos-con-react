import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

const CartItem = ({ id, nombre, precio, cantidad, addCarrito, removeItemCarrito, removeCarrito }) => {
  return (
    <div key={id}>
      <span>
        <div>
          <strong>{nombre}</strong> - ${precio}
        </div>
        <div>
          <b>{cantidad} {cantidad === 1 ? 'unidad' : 'unidades'}</b>
        </div>
        <Button onClick={() => addCarrito({ id, nombre, precio })} variant="success" style={{ margin: '0 5px' }}>
          <FaPlus />
        </Button>
        <Button onClick={() => removeItemCarrito({ id })} variant="warning" style={{ margin: '0 5px' }}>
          <FaMinus />
        </Button>
        <Button onClick={() => removeCarrito({ id })} variant="danger" style={{ margin: '0 5px' }}>
          <FaTrash />
        </Button>
      </span>
      <hr />
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  cantidad: PropTypes.number.isRequired,
  addCarrito: PropTypes.func.isRequired,
  removeItemCarrito: PropTypes.func.isRequired,
  removeCarrito: PropTypes.func.isRequired,
};

export default CartItem;

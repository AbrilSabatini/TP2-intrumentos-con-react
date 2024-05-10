import { Link, useLocation } from "react-router-dom"
import '../../styles/NavBar.css'
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div className="NavBar">

      <Link to="" style={{ textDecoration: "none", color: location.pathname === '/' ? 'black' : 'grey' }} className="links">
        Home
      </Link>
      <Link to="/donde-estamos" style={{ textDecoration: "none", color: location.pathname === '/donde-estamos' ? 'black' : 'grey' }} className="links">
        Donde estamos
      </Link>
      <Link to="/productos" style={{ textDecoration: "none", color: location.pathname === '/productos' ? 'black' : 'grey' }} className="links">
        Productos
      </Link>
      <Link to={`/anadirProducto`}>
         <Button variant="light">Añadir Producto</Button>
      </Link>
    </div>

  )
}

export default NavBar

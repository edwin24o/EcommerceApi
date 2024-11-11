import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerPage from './components/CustomerPage';
import ProductPage from './components/ProductPage';
import OrderPage from './components/OrderPage';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './app.css'; 

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/" element={<h1>Welcome to the E-Commerce App!</h1>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

const OrderForm = ({ onSubmit }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch customers and products to display in form
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/customers');
        if (!response.ok) throw new Error('Failed to load customers.');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) throw new Error('Failed to load products.');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      customer_id: selectedCustomer,
      product_id: selectedProduct,
      quantity,
    };

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to place order.');
      onSubmit(); // Call the onSubmit function passed as a prop
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="customer">
          <Form.Label>Select Customer</Form.Label>
          <Form.Control
            as="select"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Choose a customer...</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="product">
          <Form.Label>Select Product</Form.Label>
          <Form.Control
            as="select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price.toFixed(2)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1" // Prevents entering negative or zero quantities
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </div>
  );
};

// PropTypes validation
OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Validate onSubmit as a required function
};

export default OrderForm;

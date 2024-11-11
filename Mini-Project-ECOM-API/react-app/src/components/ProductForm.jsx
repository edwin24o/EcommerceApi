import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

const ProductForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to add product.');
        onSubmit();
        // Reset form fields and error state after successful submission
        setName('');
        setPrice('');
        setStock('');
        setError(''); // Clear any previous errors
      })
      .catch((err) => setError(err.message)); // Use the error message from the catch
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Form.Group controlId="stock">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter stock quantity"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

// Prop validation
ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a required function
};

export default ProductForm;

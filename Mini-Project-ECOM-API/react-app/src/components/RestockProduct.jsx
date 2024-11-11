import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const RestockProduct = ({ productId, onRestock }) => {
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleRestock = (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Restock quantity must be positive.');
      return;
    }

    fetch(`http://localhost:5000/products/${productId}/restock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: parseInt(quantity) }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to restock product.');
        onRestock(); // Call onRestock if successful
        setQuantity(''); // Clear the quantity input
        setError(''); // Clear any previous errors
      })
      .catch(err => {
        console.error(err); // Log the error for debugging
        setError('Error restocking product: ' + err.message); // Provide more detailed error message
      });
  };

  return (
    <Modal show={true} onHide={onRestock}>
      <Modal.Header closeButton>
        <Modal.Title>Restock Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRestock}>
          <Form.Group controlId="restockQuantity">
            <Form.Label>Restock Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity to restock"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Restock
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// PropTypes validation
RestockProduct.propTypes = {
  productId: PropTypes.number.isRequired, // Expect productId to be a number
  onRestock: PropTypes.func.isRequired, // Expect onRestock to be a function
};

export default RestockProduct;

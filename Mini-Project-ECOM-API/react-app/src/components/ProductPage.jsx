import { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Modal, Button, Alert } from 'react-bootstrap';

const ProductPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(''); // State for error messages

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/products/${productId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete product.');
        setError('Product deleted successfully.'); // Set success message
      })
      .catch(error => {
        console.error(error); // Log the error
        setError('Failed to delete product.'); // Set error message
      });
  };

  const handleClose = () => {
    setShowModal(false);
    setError(''); // Clear error message when modal closes
  };

  const handleProductSubmit = () => {
    setShowModal(false);
    setError(''); // Clear error message after successful submission
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error alert if there's an error */}
      <ProductList onDelete={handleDelete} />
      <Button onClick={() => setShowModal(true)}>Add New Product</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm onSubmit={handleProductSubmit} /> {/* Pass the handleProductSubmit function */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductPage;

import { useState } from 'react';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';

const OrderPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const handleDelete = (orderId) => {
    setLoading(true); // Start loading
    fetch(`http://localhost:5000/orders/${orderId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete order.');
        setSuccessMessage('Order deleted successfully.'); // Set success message
      })
      .catch(err => setError(err.message)) // Use error message from catch
      .finally(() => setLoading(false)); // Stop loading
  };

  const handleClose = () => {
    setShowModal(false);
    setError(''); // Clear any errors when closing the modal
    setSuccessMessage(''); // Clear success message when closing the modal
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>} {/* Show error message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Show success message */}
      <OrderList onDelete={handleDelete} />
      <Button onClick={() => setShowModal(true)}>Place New Order</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderForm onSubmit={handleClose} />
        </Modal.Body>
      </Modal>

      {loading && <Spinner animation="border" />} {/* Show loading spinner while deleting */}
    </div>
  );
};

export default OrderPage;

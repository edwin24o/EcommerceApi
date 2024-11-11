import { useState } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';

const CustomerPage = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowModal(true);
  };

  const handleDelete = (customerId) => {
    setLoading(true);
    fetch(`http://localhost:5000/customers/${customerId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete customer.');
        setError('Customer deleted successfully.');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to delete customer.');
        setLoading(false);
      });
  };

  const handleClose = () => {
    setSelectedCustomerId(null);
    setShowModal(false);
    setError(''); // Clear error when closing the modal
  };

  return (
    <div>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {loading && <Spinner animation="border" />}
      <CustomerList onEdit={handleEdit} onDelete={handleDelete} />
      <Button onClick={() => setShowModal(true)}>Add New Customer</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCustomerId ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomerForm customerId={selectedCustomerId} onSubmit={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerPage;

import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomerForm = ({ customerId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerId) {
      setLoading(true);
      // Fetch customer details for updating
      fetch(`http://localhost:5000/customers/${customerId}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch customer details.');
          return response.json();
        })
        .then(data => {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [customerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerData = { name, email, phone };

    // Check if updating or creating a new customer
    const url = customerId 
      ? `http://localhost:5000/customers/${customerId}`
      : `http://localhost:5000/customers`;

    const method = customerId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to save customer.');
        onSubmit();
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}
      <Form onSubmit={handleSubmit} disabled={loading}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {customerId ? 'Update Customer' : 'Create Customer'}
        </Button>
      </Form>
    </div>
  );
};

// PropTypes validation
CustomerForm.propTypes = {
  customerId: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerForm;

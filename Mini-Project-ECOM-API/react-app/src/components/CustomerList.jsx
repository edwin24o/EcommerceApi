import { useEffect, useState } from 'react';
import { Button, Table, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomerList = ({ onEdit, onDelete }) => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch customers.');
        return response.json();
      })
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && customers.length === 0 && <Alert variant="info">No customers found.</Alert>}
      
      {!loading && customers.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <Button variant="primary" onClick={() => onEdit(customer.id)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => onDelete(customer.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

// PropTypes validation
CustomerList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomerList;

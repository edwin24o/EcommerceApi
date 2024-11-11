import { useEffect, useState } from 'react';
import { Button, Table, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

const OrderList = ({ onDelete }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        if (!response.ok) throw new Error('Failed to fetch orders.');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message); // Capture the actual error message
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.customer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>${order.total_price.toFixed(2)}</td> {/* Format price to 2 decimal places */}
                <td>
                  <Button variant="danger" onClick={() => onDelete(order.id)}>
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
OrderList.propTypes = {
  onDelete: PropTypes.func.isRequired, // Validate onDelete as a required function
};

export default OrderList;

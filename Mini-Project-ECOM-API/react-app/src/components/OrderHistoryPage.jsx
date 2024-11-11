import { useEffect, useState } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        if (!response.ok) throw new Error('Failed to fetch orders.');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message); // Log the actual error message for debugging
      } finally {
        setLoading(false);
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
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>${order.total_amount.toFixed(2)}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  {order.products.map(product => (
                    <div key={product.id}>
                      {product.name} (x{product.quantity})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderHistoryPage;

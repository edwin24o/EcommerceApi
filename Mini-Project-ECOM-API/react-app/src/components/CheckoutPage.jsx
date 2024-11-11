import { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';  // Import PropTypes for validation

const CheckoutPage = ({ cart, onPlaceOrder }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // To handle loading state

  // Calculate the total price based on the cart items
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setError('');
  
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_id: 1,
        items: cart.map(item => ({ product_id: item.id, quantity: item.quantity }))
      })
    })
      .then(response => {
        setIsLoading(false);
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Failed to place order');
          });
        }
        return response.json();  
      })
      .then(data => {
        console.log(data);  
        onPlaceOrder(); 
      })
      .catch(err => {
        setError(err.message || 'Error placing order. Please try again.');
      });
  };
  

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2>Order Summary</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total Price</strong></td>
            <td><strong>${calculateTotalPrice().toFixed(2())}</strong></td>
          </tr>
        </tfoot>
      </Table>
      <Button 
        variant="primary" 
        onClick={handlePlaceOrder} 
        disabled={isLoading}  // Disable button when order is being placed
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </Button>
    </div>
  );
};


CheckoutPage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,        // Product ID must be a number
    name: PropTypes.string.isRequired,      // Product name must be a string
    price: PropTypes.number.isRequired,     // Price must be a number
    quantity: PropTypes.number.isRequired,  // Quantity must be a number
  })).isRequired,  
  onPlaceOrder: PropTypes.func.isRequired   
};


CheckoutPage.defaultProps = {
  cart: [],  
  onPlaceOrder: () => {},  
};

export default CheckoutPage;

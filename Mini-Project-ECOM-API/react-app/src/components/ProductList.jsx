import { useState, useEffect } from 'react';
import { Button, Table, Alert, Spinner } from 'react-bootstrap';
import RestockProduct from './RestockProduct';
import PropTypes from 'prop-types'; // Import PropTypes

const ProductList = ({ onDelete }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Initialize error state
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products.'); // Throw error if response is not ok
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Set error message if fetch fails
        setLoading(false);
      });
  }, []);

  const handleRestock = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error if it exists */}
      {!loading && !error && ( // Only show the table if there’s no error
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <Button variant="danger" onClick={() => onDelete(product.id)}>
                    Delete
                  </Button>
                  <Button variant="secondary" onClick={() => handleRestock(product.id)}>
                    Restock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedProductId && (
        <RestockProduct
          productId={selectedProductId}
          onRestock={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

// Prop validation
ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired, // Ensure onDelete is a required function
};

export default ProductList;

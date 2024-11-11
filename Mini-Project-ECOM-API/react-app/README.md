# E-Commerce Application

## Overview
This is a full-featured E-Commerce web application built with React for the frontend and Flask for the backend. It allows users to manage customers, products, and orders efficiently. The application features a modern design, responsive interface, and easy navigation.

## Features
- **Customer Management:** Add, view, and delete customers.
- **Product Management:** Add, view, delete, and restock products.
- **Order Management:** Create and view orders with details on products.
- **Responsive Design:** Optimized for desktop and mobile use.

## Technologies Used
- **Frontend:** 
  - React
  - React Router
  - React Bootstrap
  - CSS
- **Backend:** 
  - Flask
  - Flask-CORS
  - SQLAlchemy
- **Database:** 
  - SQLite 
- **CSS Framework:** 
  - Bootstrap

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js** (version >= 14)
- **npm** (Node package manager)
- **Python** (version >= 3.6)
- **Flask** and other Python dependencies

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/codeland93/E-Com-Mini-Project-.git
   ```

2. **Frontend Setup:**
   - Install the necessary npm packages:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

3. **Backend Setup:**
   - Install the necessary Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask server:
     ```bash
     python app.py
     ```

### Running the Application
http://localhost:5173/

## Usage
- **Customers:** Navigate to the Customers page to add or manage customers.
- **Products:** Navigate to the Products page to add, view, delete, or restock products.
- **Orders:** Navigate to the Orders page to create new orders and view existing ones.

## API Endpoints
Here are some of the key API endpoints for the backend:

- `GET /products` - Retrieve a list of all products.
- `POST /products` - Add a new product.
- `DELETE /products/<id>` - Delete a product by ID.
- `POST /products/<id>/restock` - Restock a product by ID.
- `GET /orders` - Retrieve a list of all orders.
- `POST /orders` - Create a new order.

## Frontend Components
- **App:** The main component that sets up routing and navigation.
- **CustomerPage:** Component for managing customers.
- **ProductPage:** Component for managing products.
- **OrderPage:** Component for managing orders.
- **RestockProduct:** Modal for restocking a product.

## CSS Styling
The application uses a modern CSS design to provide a professional and sleek look, with proper spacing and styling for buttons and navigation elements. Custom styles are included in the `app.css` file.

## Contributing
Contributions are welcome! If you have suggestions for improvements or find a bug, please create an issue or submit a pull request. Please ensure that your code adheres to the project's coding standards.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or inquiries, please reach out to:
- **Eric Freeland**
- **erichfreeland@gmail.com**
- **https://github.com/codeland93**

## Acknowledgements
- Thanks to the contributors and the open-source community for their valuable resources and tools that made this project possible.

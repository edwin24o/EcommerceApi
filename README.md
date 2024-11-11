E-commerce API A RESTful API for managing an e-commerce system with customers, products, and orders. Built with Flask, Flask-SQLAlchemy.

Features Customers: Add, update, delete, and retrieve customer information. Products: Add, update, delete, retrieve, and restock products. Orders: Create orders, retrieve order details, and view associated products and quantities. Installation Clone the repository:

bash Copy code git clone <> cd into repository made Set up a virtual environment (optional):

bash Copy code python3 -m venv venv source venv/bin/activate # For Linux/macOS venv\Scripts\activate # For Windows Install dependencies:

bash Copy code pip install -r requirements.txt Run the application:

bash Copy code python app.py The API will run on http://127.0.0.1:5000.

Endpoints Customers GET /customers: Retrieve all customers. GET /customers/int:id: Retrieve a specific customer by ID. POST /customers: Add a new customer. PUT /customers/int:id: Update an existing customer. DELETE /customers/int:id: Delete a customer. Products GET /products: Retrieve all products. GET /products/int:id: Retrieve a specific product by ID. POST /products: Add a new product. PUT /products/int:id: Update an existing product. DELETE /products/int:id: Delete a product. POST /products/int:id/restock: Restock a product by adding to its quantity. Orders GET /orders: Retrieve all orders. POST /orders: Create a new order. Database The API uses SQLite as its database. The database will be initialized when the application runs for the first time.

Technologies Used Flask Flask-SQLAlchemy Flask-CORS SQLite Running Tests You can test the API endpoints using a tool like Postman or curl.

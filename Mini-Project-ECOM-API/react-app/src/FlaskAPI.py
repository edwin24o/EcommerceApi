from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
db = SQLAlchemy(app)


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    items = db.relationship('OrderItem', backref='order', lazy=True)


with app.app_context():
    db.create_all()


@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    result = [{'id': customer.id, 'name': customer.name, 'email': customer.email} for customer in customers]
    return jsonify(result), 200

@app.route('/customers/<int:id>', methods=['GET'])
def get_customer(id):
    customer = Customer.query.get(id)
    if customer:
        return jsonify({'id': customer.id, 'name': customer.name, 'email': customer.email}), 200
    else:
        return jsonify({'error': 'Customer not found'}), 404

@app.route('/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    new_customer = Customer(name=data['name'], email=data['email'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'Customer created successfully', 'id': new_customer.id}), 201

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get(id)
    if customer:
        data = request.get_json()
        customer.name = data['name']
        customer.email = data['email']
        db.session.commit()
        return jsonify({'message': 'Customer updated successfully'}), 200
    else:
        return jsonify({'error': 'Customer not found'}), 404

@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get(id)
    if customer:
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'}), 200
    else:
        return jsonify({'error': 'Customer not found'}), 404


@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = [{'id': product.id, 'name': product.name, 'price': product.price, 'stock': product.stock} for product in products]
    return jsonify(result), 200

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if product:
        return jsonify({'id': product.id, 'name': product.name, 'price': product.price, 'stock': product.stock}), 200
    else:
        return jsonify({'error': 'Product not found'}), 404

@app.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(name=data['name'], price=data['price'], stock=data['stock'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully', 'id': new_product.id}), 201

@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    if product:
        data = request.get_json()
        product.name = data['name']
        product.price = data['price']
        product.stock = data['stock']
        db.session.commit()
        return jsonify({'message': 'Product updated successfully'}), 200
    else:
        return jsonify({'error': 'Product not found'}), 404

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    else:
        return jsonify({'error': 'Product not found'}), 404


@app.route('/products/<int:id>/restock', methods=['POST'])
def restock_product(id):
    data = request.get_json()
    quantity = data['quantity']
    product = Product.query.get(id)
    if product:
        product.stock += quantity
        db.session.commit()
        return jsonify({'message': 'Product restocked successfully'}), 200
    else:
        return jsonify({'error': 'Product not found'}), 404

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    result = []
    for order in orders:
        order_data = {
            'id': order.id,
            'customer_name': order.customer.name,
            'total_amount': order.total_amount,
            'order_date': order.order_date,
            'products': [{'id': item.product.id, 'name': item.product.name, 'quantity': item.quantity} for item in order.items]
        }
        result.append(order_data)
    return jsonify(result), 200

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    customer_id = data['customer_id']
    items = data['items']

    # Calculate the total price
    total_price = 0
    order_items = []
    for item in items:
        product = Product.query.get(item['product_id'])
        if product:
            quantity = item['quantity']
            total_price += product.price * quantity
            order_items.append(OrderItem(product_id=product.id, quantity=quantity))

    # Create the order
    order = Order(customer_id=customer_id, total_amount=total_price, items=order_items)
    db.session.add(order)
    db.session.commit()

    return jsonify({'message': 'Order created successfully', 'order_id': order.id}), 201

if __name__ == '__main__':
    app.run(debug=True) 

    

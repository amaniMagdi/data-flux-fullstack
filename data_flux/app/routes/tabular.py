import json
from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import Product
#from ..services.tabular_service import TabularService
import pandas as pd
import numpy as np
from flask_cors import cross_origin

# Separating concerns is a good practice and to make our codebase organized, maintainable, and testable:
#Routes: Handle the HTTP request and response cycle.
#Services: Contain the business logic and interact with the data layer.
#the next code refactor will be separate routes ans services

tabular_bp = Blueprint('tabular', __name__)

@tabular_bp.route('/upload', methods=['POST'])
@cross_origin()  # Enable CORS for this specific route
def upload_tabular():
    file = request.files['file']
    if file:
        SHEET_HEADERS = ["ProductName", "Category", "Price", "StockQuantity", "Rating"]
        try:
            df = pd.read_csv(file)
            #validate sheet header
            if not df.columns.tolist() == SHEET_HEADERS: 
                return jsonify({'error': 'Incorrect file headers'}), 400
            # Convert DataFrame to list of dictionaries
            data = df.to_dict(orient='records')

            # Validate and format JSON data
            products = []
            for item in data:
                product = Product(
                    product_name=item["ProductName"],
                    category=item["Category"],
                    price=item["Price"],
                    stock_quantity=item["StockQuantity"],
                    rating=item["Rating"]
                )
                products.append(product)

            # Bulk insert products into the database
            db.session.bulk_save_objects(products)
            db.session.commit()

            return jsonify({'message': 'Product data uploaded', 'total_records': len(products)}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    return jsonify({'error': 'No file provided'}), 400

@tabular_bp.route('/list-products', methods=['GET'])
def all_products():
    # Fetch all product records
    products = Product.query.all()
    # Convert each product to a dictionary
    products_list = [product.to_dict() for product in products]
    return jsonify(products_list)

@tabular_bp.route('/statistics', methods=['GET'])
def compute_statistics():
    # Fetch all product records
    products = Product.query.all()
    # Convert the records to a list of dictionaries
    product_list = [
        {
            'product_name': product.product_name,
            'category': product.category,
            'price': product.price,
            'stock_quantity': product.stock_quantity,
            'rating': product.rating
        } 
        for product in products
    ]
    # Create a DataFrame from the list of dictionaries
    df = pd.DataFrame(product_list)
    
    # Calculate statistics
    statistics = {
        'mean': df.mean(numeric_only=True).to_dict(),
        'median': df.median(numeric_only=True).to_dict(),
        'mode': df.mode(numeric_only=True).iloc[0].to_dict(),
        'quartiles': df.quantile([0.25, 0.5, 0.75], numeric_only=True).to_dict(),
        'outliers': {
            col: df[(df[col] < (df[col].mean() - 2 * df[col].std())) | 
                     (df[col] > (df[col].mean() + 2 * df[col].std()))][col].tolist()
            for col in df.select_dtypes(include=['float64', 'int64']).columns
        }
    }
    return jsonify(statistics)

@tabular_bp.route('/<int:data_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_product(data_id):
    product_data = Product.query.get_or_404(data_id)
    
    if request.method == 'GET':
        return jsonify(product_data.to_dict())
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
        except Exception as e:
            return jsonify({'error': 'Invalid JSON'}), 400
        
        # Validate the data
        if not isinstance(data, dict):
            return jsonify({'error': 'Invalid data format, expected a JSON object'}), 400
        
        # Update model attributes directly
        for key, value in data.items():
            if hasattr(product_data, key):
                setattr(product_data, key, value)
        
        db.session.commit()
        return jsonify({'message': 'Product updated successfully'})
        
    elif request.method == 'DELETE':
        db.session.delete(product_data)
        db.session.commit()
        return jsonify({'message': 'Product data deleted'})

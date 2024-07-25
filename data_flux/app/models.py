from .extensions import db
#Tabular Data:
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(128), nullable=False)
    category = db.Column(db.String(128), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'category': self.category,
            'price': self.price,
            'stock_quantity': self.stock_quantity,
            'rating': self.rating
        }
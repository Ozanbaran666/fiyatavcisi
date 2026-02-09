from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)


tracked_products = [
    {"id": 1, "name": "iPhone 15 Pro", "my_price": 75000, "competitor_price": 76000, "url": "trendyol.com/..."}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/track', methods=['GET'])
def track_prices():
    for product in tracked_products:
        change = random.uniform(-0.05, 0.02)
        product['competitor_price'] = round(product['competitor_price'] * (1 + change))
        product['alert'] = product['competitor_price'] < product['my_price']
        
    return jsonify(tracked_products)

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/health")
def health():
    return {"status": "ok"}

# TODO: Implement Stripe integration
# TODO: Implement Airtable integration


@app.route("/api/food-pickup", methods=['GET'])
def get_airtable_data():
    try:
        token = os.getenv('AIRTABLE_TOKEN')
        url = os.getenv('AIRTABLE_URL')

        headers = {
            'Authorization' : f'Bearer {token}'
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error' : str(e)}), 500

if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 5000)))

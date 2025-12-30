from flask import Flask, jsonify, request
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
    

@app.route("/api/mailinglist-subscribe", methods=["POST"])
def subscribe():
    try:
        MAILCHIMP_API_KEY = os.getenv("MAILCHIMP_API_KEY")
        MAILCHIMP_AUDIENCE_ID =  os.getenv("MAILCHIMP_AUDIENCE_ID")
        MAILCHIMP_DATA_CENTER = os.getenv("MAILCHIMP_DATA_CENTER")
        
        data = request.get_json()
        email = data.get("email")
        role = data.get("role")
        
        if not email or not role:
            return jsonify({"error": "Email and role is required"}), 400

        url = f"https://{MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/{MAILCHIMP_AUDIENCE_ID}/members"
        
        metadata = {
            "email_address": email,
            "status": "subscribed",
            "tags": [role]
        }
        
        response = requests.post(
            url,
            auth=("anystring", MAILCHIMP_API_KEY),
            json=metadata
        )
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error' : str(e)}), 500


if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 5000)))

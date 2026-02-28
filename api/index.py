from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os
import stripe

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/health")
def health():
    return {"status": "ok"}


@app.route("/api/food-pickup", methods=['GET'])
def get_airtable_data():
    table_id = "tblEadgBO51Cm8eMm"
    try:
        token = os.getenv('AIRTABLE_TOKEN')
        url = os.getenv('AIRTABLE_URL') + table_id

        headers = {
            'Authorization' : f'Bearer {token}'
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error' : str(e)}), 500
    

@app.route("/api/blogs", methods=['GET'])
def get_blogs():
    table_id = os.getenv('AIRTABLE_BLOG_TABLE')

    try:
        token = os.getenv('AIRTABLE_TOKEN')
        url = os.getenv('AIRTABLE_URL') + table_id

        headers = {
            'Authorization' : f'Bearer {token}'
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        data = response.json()
        records = []

        for record in data.get('records', []):
            fields = record.get('fields', {})
            images = []

            if 'Attachments' in fields:
                for attachment in fields['Attachments']:
                    # Get down to the url
                    thumbnails = attachment.get('thumbnails', {})
                    fullsize_image = thumbnails.get('full', {})

                    images.append({
                        'url': fullsize_image.get('url'),
                        'filename': attachment.get('filename'),
                        'type': attachment.get('type')
                    })
            
            formatted_record = {
                'id': record.get('id'),
                'Content': fields.get('Content', ''),
                'Title': fields.get('Title', ''),
                'Date': fields.get('Date', ''),
                'Images': images
            }

            records.append(formatted_record)


        return jsonify({
            'success': True,
            'count': len(records),
            'records': records
        }), 200
    except Exception as e:
        return jsonify({'error' : str(e)}), 500

@app.route("/api/volunteer-signup", methods=["POST"])
def volunteer_signup():
    table_id = os.getenv('AIRTABLE_VOLUNTEER_TABLE')

    try:
        data = request.json
        airtable_data = {
            "records": [
                {
                    "fields": {
                        "Full Name": data.get("name"),
                        "Email Address": data.get("email"),
                        "Phone Number": data.get("phone"),
                        "General Availability": data.get("availability")
                    }
                }
            ]
        }
        token = os.getenv('AIRTABLE_TOKEN')
        url = os.getenv('AIRTABLE_URL') + table_id + '/'

        headers = {
            'Authorization' : f'Bearer {token}',
            'Content-Type': 'application/json'
        }
        response = requests.post(url, headers=headers, json=airtable_data)
        print("Response status:", response.status_code)
        print("Response body:", response.text)
        response.raise_for_status()
        
        # Also add to Mailchimp with "volunteer" tag
        MAILCHIMP_API_KEY = os.getenv("MAILCHIMP_API_KEY")
        MAILCHIMP_AUDIENCE_ID = os.getenv("MAILCHIMP_AUDIENCE_ID")
        MAILCHIMP_DATA_CENTER = os.getenv("MAILCHIMP_DATA_CENTER")
        
        email = data.get("email", "").strip().lower()
        full_name = data.get("name", "").strip()
        name_parts = full_name.split(" ", 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""
        
        import hashlib
        subscriber_hash = hashlib.md5(email.encode()).hexdigest()
        
        mc_url = f"https://{MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/{MAILCHIMP_AUDIENCE_ID}/members/{subscriber_hash}"
        
        mc_payload = {
            "email_address": email,
            "status_if_new": "subscribed",
            "status": "subscribed",
            "merge_fields": {
                "FNAME": first_name,
                "LNAME": last_name,
                "PHONE": data.get("phone"),
            },
            "tags": ["volunteer"],
        }
        
        requests.put(
            mc_url,
            auth=("anystring", MAILCHIMP_API_KEY),
            json=mc_payload,
        )
        
        return {"success": True, "data": response.json()}, 200
    except Exception as e:
        return jsonify({'error' : str(e)}), 500
    

@app.route("/api/mailinglist-subscribe", methods=["POST"])
def add_receiver_to_mailing_list():
    try:
        MAILCHIMP_API_KEY = os.getenv("MAILCHIMP_API_KEY")
        MAILCHIMP_AUDIENCE_ID = os.getenv("MAILCHIMP_AUDIENCE_ID")
        MAILCHIMP_DATA_CENTER = os.getenv("MAILCHIMP_DATA_CENTER")

        data = request.get_json()

        first_name = data.get("firstName", "").strip()
        last_name = data.get("lastName", "").strip()
        email = data.get("email", "").strip().lower()
        phone = data.get("phone")
        role = data.get("role", "recipient")

        if not first_name or not last_name:
            return jsonify({"error": "First and last name are required"}), 400
        if not email:
            return jsonify({"error": "Email is required"}), 400

        import hashlib
        subscriber_hash = hashlib.md5(email.encode()).hexdigest()

        url = f"https://{MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/{MAILCHIMP_AUDIENCE_ID}/members/{subscriber_hash}"

        payload = {
            "email_address": email,
            "status_if_new": "subscribed",
            "status": "subscribed",
            "merge_fields": {
                "FNAME": first_name,
                "LNAME": last_name,
                "PHONE": phone,
            },
            "tags": [role],
        }

        response = requests.put(
            url,
            auth=("anystring", MAILCHIMP_API_KEY),
            json=payload,
        )

        if response.status_code not in (200, 201):
            return jsonify(response.json()), response.status_code

        return jsonify({"message": "Successfully subscribed", "data": response.json()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
        data = request.json
        
        raw_amount = data.get('amount', 25)
        amount_in_cents = int(float(raw_amount) * 100)
        
        user_email = data.get('email')
        is_monthly = data.get('monthly', False)
        fund = data.get('fund', 'General Operations')
        
        success_url = data.get('origin', 'http://localhost:5173') + '/success?session_id={CHECKOUT_SESSION_ID}&email=' + user_email
        cancel_url = data.get('origin', 'http://localhost:5173') + '/donate'
        
        metadata = {
            'type': 'donation', 
            'source': 'website',
            'fund': fund
        }
        
        if is_monthly:
            metadata['billing_cycle'] = 'monthly'
            metadata['recurring'] = 'true'
            
            session = stripe.checkout.Session.create(
                customer_email=user_email,
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': amount_in_cents,
                        'recurring': {'interval': 'month'},
                        'product_data': {
                            'name': f'Monthly Donation - {fund}',
                        },
                    },
                    'quantity': 1,
                }],
                mode='subscription',
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata
            )
        else:
            session = stripe.checkout.Session.create(
                customer_email=user_email,
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': amount_in_cents,
                        'product_data': {
                            'name': f'Donation - {fund}',
                        },
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata
            )
        
        return jsonify({'url': session.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 403


@app.route('/api/add-donor-to-mailchimp', methods=['POST'])
def add_donor_to_mailchimp():
    try:
        MAILCHIMP_API_KEY = os.getenv("MAILCHIMP_API_KEY")
        MAILCHIMP_AUDIENCE_ID = os.getenv("MAILCHIMP_AUDIENCE_ID")
        MAILCHIMP_DATA_CENTER = os.getenv("MAILCHIMP_DATA_CENTER")
        
        data = request.get_json()
        email = data.get("email", "").strip().lower()
        amount = data.get("amount", 0)
        is_monthly = data.get("monthly", False)
        fund = data.get("fund", "General Operations")
        first_name = data.get("firstName", "").strip()
        last_name = data.get("lastName", "").strip()
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        import hashlib
        subscriber_hash = hashlib.md5(email.encode()).hexdigest()
        
        url = f"https://{MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/{MAILCHIMP_AUDIENCE_ID}/members/{subscriber_hash}"
        
        tags = ["donor"]
        if is_monthly:
            tags.append("monthly-donor")
        if fund == "Food Rescue Fund":
            tags.append("food-rescue-fund")
        
        payload = {
            "email_address": email,
            "status_if_new": "subscribed",
            "status": "subscribed",
            "merge_fields": {
                "FNAME": first_name,
                "LNAME": last_name,
                "DONATION": str(amount),
                "FUND": fund,
                "MONTHLY": "Yes" if is_monthly else "No"
            },
            "tags": tags,
        }
        
        response = requests.put(
            url,
            auth=("anystring", MAILCHIMP_API_KEY),
            json=payload,
        )
        
        if response.status_code not in (200, 201):
            return jsonify(response.json()), response.status_code
        
        return jsonify({"message": "Donor added successfully", "data": response.json()})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(port=int(os.environ.get("PORT", 5000)))
# Access to Excess
Website is live! Currently hosted at: https://www.accesstoexcessfood.org/

## Project Overview
Access to Excess is a nonprofit application connecting surplus resources with those in need. This repository contains the source code for the platform.

## Folder Structure
- **client/**: Frontend application (Vite + React + TailwindCSS)
- **server/**: Backend application (Flask)

## Getting Started

### Frontend
To run the frontend:

```bash
cd client
npm install
npm run dev
```

### Backend
To run the backend:

```bash
cd server
python -m venv .venv
source .venv/bin/activate    # or Windows equivalent: .venv\Scripts\activate
pip install -r requirements.txt
flask run
```

## Current State
- **Stripe**: Donation processing has been added.
- **Airtable**: Data management integration has been added.

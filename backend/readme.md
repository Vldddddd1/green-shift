# Backend Setup

## Prerequisites
- Python 3.10+ installed

## Steps

1. Clone the repository:
git clone <repo-url>
cd backend

2. Create a virtual environment:
python -m venv venv

3. Activate the virtual environment:

Windows:
venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

4. Install the dependencies:
pip install -r requirements.txt

5. Run the FastAPI server:
uvicorn main:app --reload

You should see output like:
INFO:     Uvicorn running on http://127.0.0.1:8000

6. Open the browser:
http://127.0.0.1:8000

Swagger documentation:
http://127.0.0.1:8000/docs

## Available Endpoints
- GET /carbon — returns raw carbon scores
- GET /route — returns the selected region based on carbon scores
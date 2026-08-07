from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def status():
    return{"region":"us-east", "status":"ok"}
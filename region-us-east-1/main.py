from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def status():
    return{"region":"us-east-1", "status":"ok"}
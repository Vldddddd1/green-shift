from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def status():
    return{"region":"eu-west", "status":"ok"}
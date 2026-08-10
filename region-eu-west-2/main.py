from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def status():
    return{"region":"eu-west-2", "status":"ok"}
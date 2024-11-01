from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def get_data():
    response = {"message": "Hello World!"}
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
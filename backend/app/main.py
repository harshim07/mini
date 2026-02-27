from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.detection import predict_attack
from app.data_generator import generate_network_data
from app.reporting import generate_summary
from app.schemas import TrafficInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Cyber Security Backend Running"}

@app.get("/data")
def get_data():
    data = generate_network_data()
    return data.to_dict(orient="records")

@app.post("/detect")
def detect(input: TrafficInput):
    result = predict_attack(input.dict())
    return {"attack": result}

@app.get("/report")
def report():
    data = generate_network_data()
    summary = generate_summary(data)
    return summary
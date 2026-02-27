import joblib
import pandas as pd

model, scaler = joblib.load("saved_model.pkl")

def predict_attack(data: dict):
    df = pd.DataFrame([data])
    scaled = scaler.transform(df)
    prediction = model.predict(scaled)[0]
    return int(prediction)
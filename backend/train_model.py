from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
from app.data_generator import generate_network_data

def train():
    data = generate_network_data(2000)

    X = data.drop("attack", axis=1)
    y = data["attack"]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    joblib.dump((model, scaler), "saved_model.pkl")
    print("Model trained successfully")

if __name__ == "__main__":
    train()
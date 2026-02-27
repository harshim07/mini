import pandas as pd
import numpy as np

def generate_network_data(rows=500):
    np.random.seed(42)

    data = pd.DataFrame({
        "packet_size": np.random.randint(20, 1500, rows),
        "duration": np.random.uniform(0.1, 10, rows),
        "failed_logins": np.random.randint(0, 10, rows),
        "connections": np.random.randint(1, 100, rows),
        "data_transferred": np.random.uniform(0.1, 1000, rows)
    })

    data["attack"] = (
        (data["failed_logins"] > 5) |
        (data["connections"] > 80) |
        (data["packet_size"] > 1400)
    ).astype(int)

    return data
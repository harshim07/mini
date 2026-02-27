from datetime import datetime

def generate_summary(data):
    total = len(data)
    attacks = int(data["attack"].sum())
    normal = total - attacks

    return {
        "total_records": total,
        "total_attacks": attacks,
        "normal_traffic": normal,
        "generated_at": str(datetime.now())
    }
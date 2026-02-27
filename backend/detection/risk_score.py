def calculate_risk(rule_result, anomaly_score):
    base = anomaly_score * 50

    if rule_result == "Brute Force":
        base += 30
    elif rule_result == "DDoS":
        base += 40

    if base > 80:
        severity = "Critical"
    elif base > 60:
        severity = "High"
    elif base > 30:
        severity = "Medium"
    else:
        severity = "Low"

    return round(base, 2), severity
def rule_based_detection(log):
    if log["failed_logins"] > 5:
        return "Brute Force"
    if log["traffic"] > 1000:
        return "DDoS"
    return "Normal"
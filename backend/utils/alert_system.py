def generate_alert(severity):
    if severity in ["High", "Critical"]:
        return "⚠ Immediate Attention Required"
    return "Normal Monitoring"
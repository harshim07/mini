from fastapi import APIRouter, HTTPException
from database import SessionLocal
from models import Log
from detection.rule_engine import rule_based_detection
from detection.ml_model import ml_predict
from detection.risk_score import calculate_risk
from datetime import datetime, timedelta
import random

router = APIRouter()

@router.post("/generate-log")
def generate_log():
    """
    Generate a sample security log
    """
    try:
        db = SessionLocal()

        sample_log = {
            "source_ip": "192.168.1.10",
            "traffic": 1200,
            "failed_logins": 6
        }

        rule = rule_based_detection(sample_log)
        anomaly = ml_predict(sample_log)
        risk, severity = calculate_risk(rule, anomaly)

        new_log = Log(
            source_ip=sample_log["source_ip"],
            attack_type=rule,
            traffic=sample_log["traffic"],
            failed_logins=sample_log["failed_logins"],
            risk_score=risk
        )

        db.add(new_log)
        db.commit()

        return {"attack_type": rule, "risk": risk, "severity": severity}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Log generation error: {str(e)}")

@router.get("/logs")
def get_network_logs():
    """
    Get network logs for analysis
    """
    try:
        # Generate sample network logs if database is empty
        sample_logs = []
        for i in range(20):
            source_ip = f"192.168.1.{random.randint(1, 254)}"
            dest_ip = f"10.0.0.{random.randint(1, 254)}"
            
            sample_logs.append({
                "id": i + 1,
                "timestamp": (datetime.now() - timedelta(minutes=random.randint(1, 1440))).isoformat(),
                "source_ip": source_ip,
                "destination_ip": dest_ip,
                "protocol": random.choice(["TCP", "UDP", "ICMP", "HTTP", "HTTPS"]),
                "packet_size": random.randint(64, 1500),
                "threat_level": random.choices(["low", "medium", "high"], weights=[0.7, 0.2, 0.1])[0],
                "status": random.choice(["allowed", "blocked", "monitored"]),
                "description": random.choice([
                    "Normal network traffic",
                    "Suspicious pattern detected",
                    "Potential port scan",
                    "Unusual data transfer",
                    "Connection established"
                ])
            })
        
        return sample_logs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Logs error: {str(e)}")
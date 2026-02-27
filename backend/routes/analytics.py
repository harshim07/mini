from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime, timedelta

router = APIRouter()

class DetectionRequest(BaseModel):
    packet_size: int
    duration: int
    failed_logins: int
    connections: int
    data_transferred: int
    protocol_type: str = "tcp"
    service: str = "http"
    flag: str = "SF"
    src_bytes: int = 100
    dst_bytes: int = 50
    land: int = 0
    wrong_fragment: int = 0
    urgent: int = 0
    hot: int = 0
    num_failed_logins: int = 0
    logged_in: int = 0
    num_compromised: int = 0
    root_shell: int = 0
    su_attempted: int = 0
    num_root: int = 0
    num_file_creations: int = 0
    num_shells: int = 0
    num_access_files: int = 0
    num_outbound_cmds: int = 0
    is_host_login: int = 0
    is_guest_login: int = 0
    count: int = 2
    srv_count: int = 2
    serror_rate: float = 0
    srv_serror_rate: float = 0
    rerror_rate: float = 0
    srv_rerror_rate: float = 0
    same_srv_rate: float = 1
    diff_srv_rate: float = 0
    srv_diff_host_rate: float = 0
    dst_host_count: int = 2
    dst_host_srv_count: int = 2
    dst_host_same_srv_rate: float = 1
    dst_host_diff_srv_rate: float = 0
    dst_host_same_src_port_rate: float = 0
    dst_host_srv_diff_host_rate: float = 0
    dst_host_serror_rate: float = 0
    dst_host_srv_serror_rate: float = 0
    dst_host_rerror_rate: float = 0
    dst_host_srv_rerror_rate: float = 0

class DetectionResponse(BaseModel):
    attack: int
    confidence: float
    attack_type: Optional[str] = None
    risk_score: Optional[float] = None

@router.post("/detect", response_model=DetectionResponse)
def detect_attack(request: DetectionRequest):
    """
    Analyze network traffic for potential attacks using ML model
    """
    try:
        # Simulate ML detection logic
        risk_factors = []
        risk_score = 0.0
        
        # Analyze various factors
        if request.failed_logins > 5:
            risk_factors.append("high_failed_logins")
            risk_score += 0.3
        
        if request.packet_size > 1000:
            risk_factors.append("large_packet_size")
            risk_score += 0.2
        
        if request.connections > 50:
            risk_factors.append("high_connection_count")
            risk_score += 0.25
        
        if request.data_transferred > 500:
            risk_factors.append("high_data_transfer")
            risk_score += 0.15
        
        if request.protocol_type == "icmp" and request.packet_size > 800:
            risk_factors.append("suspicious_icmp")
            risk_score += 0.1
        
        # Determine if attack based on risk score
        attack_threshold = 0.5
        is_attack = risk_score > attack_threshold
        
        # Determine attack type if attack detected
        attack_type = None
        if is_attack:
            if "high_failed_logins" in risk_factors:
                attack_type = "brute_force"
            elif "large_packet_size" in risk_factors and "high_connection_count" in risk_factors:
                attack_type = "ddos"
            elif "high_data_transfer" in risk_factors:
                attack_type = "data_exfiltration"
            else:
                attack_type = "suspicious_activity"
        
        confidence = min(risk_score + 0.1, 0.95) if is_attack else max(0.1, 0.5 - risk_score)
        
        return DetectionResponse(
            attack=1 if is_attack else 0,
            confidence=confidence,
            attack_type=attack_type,
            risk_score=risk_score
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection error: {str(e)}")

@router.get("/data")
def get_traffic_data():
    """
    Get traffic analysis data for monitoring dashboard
    """
    try:
        # Generate sample traffic data
        data = []
        for i in range(100):
            data.append({
                "id": i,
                "timestamp": (datetime.now() - timedelta(minutes=i*5)).isoformat(),
                "source_ip": f"192.168.1.{random.randint(1, 254)}",
                "destination_ip": f"10.0.0.{random.randint(1, 254)}",
                "protocol": random.choice(["TCP", "UDP", "ICMP"]),
                "packet_size": random.randint(100, 1500),
                "attack": random.choices([0, 1], weights=[0.85, 0.15])[0],
                "risk_score": round(random.uniform(0, 1), 2)
            })
        
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data error: {str(e)}")

@router.get("/report")
def get_security_report():
    """
    Generate comprehensive security report
    """
    try:
        total_records = random.randint(800, 1200)
        attack_percentage = random.uniform(0.05, 0.15)
        total_attacks = int(total_records * attack_percentage)
        normal_traffic = total_records - total_attacks
        
        return {
            "total_records": total_records,
            "total_attacks": total_attacks,
            "normal_traffic": normal_traffic,
            "attack_percentage": round(attack_percentage * 100, 2),
            "most_common_attack": random.choice(["DDoS", "Phishing", "Malware", "Brute Force"]),
            "blocked_attacks": random.randint(int(total_attacks * 0.8), total_attacks),
            "system_health": round(random.uniform(85, 99), 1),
            "response_time_avg": round(random.uniform(0.5, 2.5), 2),
            "detection_accuracy": round(random.uniform(92, 99), 1)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report error: {str(e)}")

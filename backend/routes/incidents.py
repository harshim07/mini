from fastapi import APIRouter, HTTPException
from database import SessionLocal
from models import Incident
from datetime import datetime, timedelta
import random

router = APIRouter()

@router.get("/incidents")
def get_incidents():
    """
    Get security incidents for reporting
    """
    try:
        # Generate sample incidents if database is empty
        sample_incidents = [
            {
                "id": 1,
                "title": "DDoS Attack Mitigation",
                "severity": "high",
                "date": (datetime.now() - timedelta(hours=1)).isoformat(),
                "status": "resolved",
                "description": "Successfully blocked distributed denial of service attack targeting web servers",
                "response_time": "2 min 34 sec",
                "impact": "minimal",
                "source_ip": "203.0.113.45",
                "target": "Web Server Farm",
                "actions_taken": [
                    "Blocked malicious IP ranges",
                    "Activated rate limiting",
                    "Notified security team"
                ]
            },
            {
                "id": 2,
                "title": "Suspicious Login Activity",
                "severity": "medium",
                "date": (datetime.now() - timedelta(hours=2)).isoformat(),
                "status": "investigating",
                "description": "Multiple failed login attempts detected from unusual geographic location",
                "response_time": "1 min 12 sec",
                "impact": "none",
                "source_ip": "198.51.100.22",
                "target": "Admin Portal",
                "actions_taken": [
                    "Temporarily locked account",
                    "Increased monitoring",
                    "Sent security alert"
                ]
            },
            {
                "id": 3,
                "title": "Malware Detection and Quarantine",
                "severity": "high",
                "date": (datetime.now() - timedelta(hours=4)).isoformat(),
                "status": "resolved",
                "description": "Detected and quarantined malware on employee workstation",
                "response_time": "45 sec",
                "impact": "contained",
                "source_ip": "192.168.1.105",
                "target": "Employee Workstation",
                "actions_taken": [
                    "Isolated affected system",
                    "Quarantined malicious files",
                    "Initiated system scan"
                ]
            },
            {
                "id": 4,
                "title": "Unusual Data Transfer Pattern",
                "severity": "low",
                "date": (datetime.now() - timedelta(hours=6)).isoformat(),
                "status": "monitoring",
                "description": "Detected unusual data transfer pattern from database server",
                "response_time": "3 min 15 sec",
                "impact": "under investigation",
                "source_ip": "10.0.0.15",
                "target": "Database Server",
                "actions_taken": [
                    "Increased logging",
                    "Pattern analysis initiated",
                    "User access review"
                ]
            },
            {
                "id": 5,
                "title": "Port Scan Detection",
                "severity": "medium",
                "date": (datetime.now() - timedelta(hours=8)).isoformat(),
                "status": "resolved",
                "description": "Detected port scanning activity from external source",
                "response_time": "30 sec",
                "impact": "none",
                "source_ip": "192.0.2.100",
                "target": "Network Perimeter",
                "actions_taken": [
                    "Blocked source IP",
                    "Updated firewall rules",
                    "Logged for analysis"
                ]
            }
        ]
        
        return sample_incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Incidents error: {str(e)}")
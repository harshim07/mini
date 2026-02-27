from pydantic import BaseModel

class TrafficInput(BaseModel):
    packet_size: int
    duration: float
    failed_logins: int
    connections: int
    data_transferred: float
from sqlalchemy import Column, Integer, String, Float
from database import Base

class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    source_ip = Column(String)
    attack_type = Column(String)
    traffic = Column(Integer)
    failed_logins = Column(Integer)
    risk_score = Column(Float)

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    attack_type = Column(String)
    severity = Column(String)
    status = Column(String)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    role = Column(String)
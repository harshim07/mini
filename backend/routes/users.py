from fastapi import APIRouter
from database import SessionLocal
from models import User

router = APIRouter()

@router.post("/add-user")
def add_user(username: str, role: str):
    db = SessionLocal()
    user = User(username=username, role=role)
    db.add(user)
    db.commit()
    return {"message": "User Added"}
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from database import engine, Base
from routes import logs, incidents, users, analytics
import traceback

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Cyber Security Monitoring System",
    description="Backend API for cybersecurity monitoring dashboard",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(logs.router, prefix="/api", tags=["logs"])
app.include_router(incidents.router, prefix="/api", tags=["incidents"])
app.include_router(users.router, prefix="/api", tags=["users"])
app.include_router(analytics.router, prefix="/api", tags=["analytics"])

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc),
            "type": type(exc).__name__
        }
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.get("/")
def root():
    return {
        "message": "AI Cyber Security Monitoring System Running",
        "status": "active",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Cyber Security API"
    }

# Legacy endpoints for backward compatibility
@app.post("/generate-log")
def legacy_generate_log():
    return logs.generate_log()

@app.get("/data")
def legacy_get_data():
    return analytics.get_traffic_data()

@app.post("/detect")
def legacy_detect():
    return analytics.detect_attack()

@app.get("/report")
def legacy_get_report():
    return analytics.get_security_report()

@app.get("/logs")
def legacy_get_logs():
    return logs.get_network_logs()

@app.get("/incidents")
def legacy_get_incidents():
    return incidents.get_incidents()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
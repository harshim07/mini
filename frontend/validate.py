import os
import sys
import subprocess
import json

def check_file_exists(file_path, description):
    """Check if a file exists and print status"""
    if os.path.exists(file_path):
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} - MISSING")
        return False

def check_directory_exists(dir_path, description):
    """Check if a directory exists and print status"""
    if os.path.exists(dir_path) and os.path.isdir(dir_path):
        print(f"✅ {description}: {dir_path}")
        return True
    else:
        print(f"❌ {description}: {dir_path} - MISSING")
        return False

def validate_project_structure():
    """Validate the complete project structure"""
    print("🔍 Validating AI Cyber Security Monitoring System...")
    print("=" * 60)
    
    all_good = True
    
    # Frontend checks
    print("\n📱 FRONTEND VALIDATION:")
    frontend_files = [
        ("frontend/package.json", "Package configuration"),
        ("frontend/src/App.jsx", "Main application component"),
        ("frontend/src/index.css", "Styling configuration"),
        ("frontend/tailwind.config.js", "Tailwind CSS configuration"),
        ("frontend/postcss.config.js", "PostCSS configuration"),
        ("frontend/vite.config.js", "Vite configuration"),
        ("frontend/src/api.js", "API configuration"),
        ("frontend/src/components/NavBar.jsx", "Navigation component"),
        ("frontend/src/pages/HomePage.jsx", "Home page"),
        ("frontend/src/pages/DetectionPage.jsx", "Detection page"),
        ("frontend/src/pages/MonitoringPage.jsx", "Monitoring page"),
        ("frontend/src/pages/ReportingPage.jsx", "Reporting page"),
    ]
    
    for file_path, description in frontend_files:
        if not check_file_exists(file_path, description):
            all_good = False
    
    # Backend checks
    print("\n🔧 BACKEND VALIDATION:")
    backend_files = [
        ("backend/main.py", "Main FastAPI application"),
        ("backend/requirements.txt", "Python dependencies"),
        ("backend/database.py", "Database configuration"),
        ("backend/models.py", "Database models"),
        ("backend/routes/logs.py", "Logs API routes"),
        ("backend/routes/incidents.py", "Incidents API routes"),
        ("backend/routes/users.py", "Users API routes"),
        ("backend/routes/analytics.py", "Analytics API routes"),
        ("backend/detection/rule_engine.py", "Rule-based detection"),
        ("backend/detection/ml_model.py", "ML detection model"),
        ("backend/detection/risk_score.py", "Risk scoring"),
    ]
    
    for file_path, description in backend_files:
        if not check_file_exists(file_path, description):
            all_good = False
    
    # Root level checks
    print("\n📁 ROOT LEVEL VALIDATION:")
    root_files = [
        ("README.md", "Project documentation"),
        ("install.bat", "Windows installation script"),
        ("start.bat", "Windows startup script"),
        ("start.sh", "Linux/Mac startup script"),
    ]
    
    for file_path, description in root_files:
        if not check_file_exists(file_path, description):
            all_good = False
    
    # Check package.json dependencies
    print("\n📦 DEPENDENCY VALIDATION:")
    try:
        with open("frontend/package.json", "r") as f:
            package_data = json.load(f)
            deps = package_data.get("dependencies", {})
            
            required_deps = [
                "react", "react-dom", "react-router-dom", 
                "chart.js", "react-chartjs-2", "lucide-react", 
                "axios", "tailwindcss"
            ]
            
            for dep in required_deps:
                if dep in deps:
                    print(f"✅ Dependency: {dep}@{deps[dep]}")
                else:
                    print(f"❌ Dependency: {dep} - MISSING")
                    all_good = False
    except Exception as e:
        print(f"❌ Could not validate package.json: {e}")
        all_good = False
    
    # Summary
    print("\n" + "=" * 60)
    if all_good:
        print("🎉 ALL VALIDATIONS PASSED!")
        print("\n🚀 Ready to start the application:")
        print("   1. Run 'install.bat' to install dependencies")
        print("   2. Run 'start.bat' to start the application")
        print("   3. Access at http://localhost:5173")
    else:
        print("❌ SOME VALIDATIONS FAILED!")
        print("   Please fix the missing files before proceeding.")
    
    return all_good

if __name__ == "__main__":
    validate_project_structure()

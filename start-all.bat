@echo off
REM LifeHub - Start All Services
REM This script starts MongoDB, Backend, and Frontend

echo.
echo ========================================
echo   LifeHub - Starting All Services
echo ========================================
echo.

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %errorlevel% equ 0 (
  echo [1/3] Starting MongoDB...
  start "LifeHub - MongoDB" mongod
  timeout /t 2 /nobreak
) else (
  echo [!] MongoDB not found. Skipping MongoDB...
  echo     Install from: https://www.mongodb.com/try/download/community
)

echo [2/3] Starting Backend Server...
start "LifeHub - Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak

echo [3/3] Starting Frontend Server...
start "LifeHub - Frontend" cmd /k "cd frontend && python -m http.server 8000"
timeout /t 2 /nobreak

echo.
echo ========================================
echo   All Services Started!
echo ========================================
echo.
echo Frontend: http://localhost:8000
echo Backend:  http://localhost:5000
echo.
echo Press any key to close this window...
pause >nul

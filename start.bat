@echo off
REM Quick Start Script for LifeHub on Windows

echo.
echo 🏠 LifeHub - Personal Home Management Ecosystem
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Change to backend directory
cd /d "%~dp0backend"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    echo.
)

REM Display startup information
echo.
echo 🚀 Starting backend server on http://localhost:5000
echo.
echo ⚠️  Make sure MongoDB is running before proceeding!
echo    Start MongoDB separately if not already running
echo.
echo 📝 In another terminal window, navigate to the frontend folder and serve it
echo.
echo Press any key to start the server...
pause >nul

REM Start the server
call npm start

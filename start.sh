#!/bin/bash
# Quick Start Script for LifeHub

echo "🏠 LifeHub - Personal Home Management Ecosystem"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB doesn't appear to be running"
    echo "Start MongoDB with: mongod"
fi

echo ""
echo "Starting LifeHub Backend..."
echo ""

# Navigate to backend
cd backend || exit

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🚀 Starting backend server on http://localhost:5000"
npm start

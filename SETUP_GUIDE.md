# LifeHub - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install MongoDB Locally
1. Download from: https://www.mongodb.com/try/download/community
2. Follow the installer
3. MongoDB will typically run as a service on `localhost:27017`

### Step 2: Start Backend Server

**Windows:**
```bash
cd backend
npm install
npm start
```

**Mac/Linux:**
```bash
cd backend
npm install
npm start
```

The server will start on `http://localhost:5000`

### Step 3: Serve Frontend

**Option A: Using VS Code Live Server (Recommended)**
1. Install "Live Server" extension in VS Code
2. Right-click on `frontend/index.html`
3. Click "Open with Live Server"
4. Browser will open automatically

**Option B: Using Python**
```bash
cd frontend
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Option C: Using Node http-server**
```bash
cd frontend
npx http-server
```

### Step 4: Access LifeHub
1. Open your browser to the frontend URL
2. Click "Sign Up" or "Login"
3. Create a new account with email and password
4. Start managing your life!

---

## 🛠️ Detailed Installation

### Prerequisites Checklist
- [ ] Node.js v14+ installed (`node --version`)
- [ ] MongoDB running locally (`mongod` or as service)
- [ ] Git (optional, for version control)
- [ ] Text editor/IDE (VS Code recommended)
- [ ] Modern web browser

### Backend Setup - Detailed Steps

1. **Navigate to Backend Folder**
   ```bash
   cd c:\Users\Sarika panchalwar\Desktop\lifehub\backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install:
   - express (Web framework)
   - mongoose (MongoDB ODM)
   - dotenv (Environment variables)
   - cors (Cross-origin requests)
   - bcryptjs (Password hashing)
   - jsonwebtoken (Authentication)
   - multer (File uploads)

3. **Verify .env File**
   Check that `backend/.env` contains:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/lifehub
   JWT_SECRET=lifehub_secret_key_2025
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - On Windows: MongoDB usually starts as a service automatically
   - Check if running: `mongosh` should connect
   - If not running, search for "MongoDB" in Windows services

5. **Start Backend Server**
   ```bash
   npm start
   ```
   
   Expected output:
   ```
   Server running on port 5000
   MongoDB connected: localhost
   ```

### Frontend Setup - Detailed Steps

1. **Navigate to Frontend Folder**
   ```bash
   cd c:\Users\Sarika panchalwar\Desktop\lifehub\frontend
   ```

2. **Choose Your Server Method:**

   **Method 1: VS Code Live Server (EASIEST)**
   - Open `index.html` in VS Code
   - Right-click → "Open with Live Server"
   - Browser opens automatically at `http://127.0.0.1:5500`

   **Method 2: Python HTTP Server**
   ```bash
   python -m http.server 8000
   ```
   - Open: `http://localhost:8000`

   **Method 3: Node http-server**
   ```bash
   npm install -g http-server
   http-server
   ```
   - Open: `http://localhost:8080`

---

## 📋 Testing the Application

### Create Test Account
1. Navigate to signup page
2. Enter:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "test123456"
3. Click "Sign Up"

### Add Sample Data

**Expense:**
1. Go to Expenses page
2. Add: $50 for "Food"
3. Repeat with different categories

**Bill:**
1. Go to Bills page
2. Add: Electricity bill for $100, due date 10 days from now
3. Add another: Internet for $50, due date 3 days from now

**Medicine:**
1. Go to Medicines page
2. Add: Aspirin, 500mg, Twice daily

**Grocery:**
1. Go to Groceries page
2. Add: Milk, Quantity: 2, Priority: High
3. Add: Bread, Quantity: 1, Priority: High (to trigger low stock)

**Task:**
1. Go to Tasks page
2. Add: "Clean kitchen", Assigned to: "John", Tomorrow, High priority

---

## 🔧 Troubleshooting

### Issue: "Cannot GET /"
**Solution:** Make sure you're running a server on the frontend directory
- If using Live Server: Right-click index.html → Open with Live Server
- If using http-server: Run `python -m http.server 8000` in frontend folder

### Issue: "Failed to fetch from http://localhost:5000"
**Solution:** Backend server is not running
- Open new terminal
- `cd backend`
- `npm start`
- Verify output shows "Server running on port 5000"

### Issue: "MongoDB connection failed"
**Solution:** MongoDB is not running
- On Windows: Search "Services" and start "MongoDB Server"
- Or run: `mongod` in a terminal

### Issue: "Cannot find module 'express'"
**Solution:** Dependencies not installed
- In backend folder: `npm install`

### Issue: CORS Error
**Solution:** Restart both backend and frontend
- Kill backend (Ctrl+C)
- Kill frontend (Ctrl+C)
- Restart backend first, then frontend

### Issue: "Port 5000 already in use"
**Solution:** Another process is using port 5000
- Change port in `.env` file (e.g., PORT=5001)
- Update frontend `api.js` if you change the port

### Issue: Login shows "Cannot POST /api/auth/login"
**Solution:** Backend routes not loaded
- Check backend server is running
- Restart with: `npm start`

---

## 📁 File Structure Summary

```
lifehub/
├── backend/
│   ├── server.js              ← Main entry point
│   ├── package.json           ← Dependencies
│   ├── .env                   ← Configuration
│   ├── config/
│   │   └── db.js              ← MongoDB connection
│   ├── middleware/
│   │   ├── auth.js            ← JWT verification
│   │   └── error.js           ← Error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   ├── Bill.js
│   │   ├── Medicine.js
│   │   ├── Grocery.js
│   │   ├── Document.js
│   │   └── Task.js
│   ├── controllers/
│   │   └── [All CRUD logic]
│   └── routes/
│       └── [All API endpoints]
│
├── frontend/
│   ├── index.html             ← Landing page
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html         ← Main dashboard
│   ├── [Other pages]
│   ├── js/
│   │   ├── api.js             ← API calls
│   │   ├── utils.js           ← Helpers
│   │   └── [Module files]
│   └── styles/
│       └── style.css          ← All styling
│
├── README.md                  ← Full documentation
├── start.bat                  ← Windows quick start
└── start.sh                   ← Linux/Mac quick start
```

---

## 🎯 Next Steps

1. **Explore the Dashboard**
   - View all your data in one place
   - Check alerts and summaries

2. **Add More Data**
   - Create expenses in multiple categories
   - Add bills with different dates
   - Build a complete picture

3. **Use Smart Features**
   - Check "Bills Due Soon" alerts
   - Monitor low stock groceries
   - Track task deadlines
   - Review budget usage

4. **Customize**
   - Change theme in Settings
   - Update profile information
   - Create notes

---

## 💾 Data Persistence

All data is stored in MongoDB. To reset data:
1. Stop the backend server
2. Delete the MongoDB database:
   ```bash
   mongo # or mongosh
   use lifehub
   db.dropDatabase()
   exit
   ```
3. Restart the server

---

## 🔐 Security Notes

- Passwords are hashed with bcryptjs (10 rounds)
- JWT tokens expire after 30 days
- All sensitive endpoints require authentication
- Use strong passwords (minimum 6 characters, but 8+ recommended)

---

## 📞 Support

### Common Commands

**Check Node.js version:**
```bash
node --version
```

**Check npm version:**
```bash
npm --version
```

**List running processes:**
```bash
# Windows
tasklist | findstr node
# Mac/Linux
ps aux | grep node
```

**Kill process on port 5000:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F
# Mac/Linux
lsof -i :5000
kill -9 [PID]
```

---

## 🎉 You're Ready!

Your LifeHub instance is now set up and ready to use. Enjoy managing your daily life efficiently!

**Happy Living! 🏠✨**

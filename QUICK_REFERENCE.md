# LifeHub - Quick Reference Card

## 🚀 Start Commands

### Start Backend (Terminal 1)
```bash
cd backend
npm install    # First time only
npm start
```

### Start Frontend (Terminal 2)
```bash
cd frontend
# Option 1: VS Code Live Server (easiest)
# Right-click index.html → Open with Live Server

# Option 2: Python
python -m http.server 8000

# Option 3: Node
npx http-server
```

---

## 📍 Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend Landing | `http://localhost:8000` | Main app entry |
| Backend API | `http://localhost:5000` | API server |
| Docs | `README.md` | Full documentation |

---

## 👤 Test Credentials

Use any account you create during signup:
- **Email:** any@email.com
- **Password:** anything (6+ chars)

---

## 📊 Database Collections

- **users** - User accounts
- **expenses** - Spending records
- **bills** - Bills to pay
- **medicines** - Medicine schedule
- **groceries** - Shopping items
- **documents** - Document metadata
- **tasks** - Family tasks

---

## 🎯 Key Features by Page

| Page | Features |
|------|----------|
| Dashboard | 6 metrics, recent data, auto-refresh |
| Expenses | Add, filter, category chart, summary |
| Bills | Add, due alerts, overdue alerts, mark paid |
| Medicine | Add, view active, track dosage |
| Groceries | Add, low stock alerts, mark purchased |
| Tasks | Create, filter, priorities, complete |
| Documents | Add, search, categorize |
| Budget | Monthly plan, visualization, savings calc |
| Notes | Quick save (local storage) |
| Settings | Profile, theme toggle |

---

## 🔑 Authentication

- **Default tokens:** 30 days
- **Password:** Hashed with bcryptjs (10 rounds)
- **Session:** JWT stored in localStorage
- **Protected:** All endpoints except auth

---

## 📝 Environment Variables (.env)

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lifehub
JWT_SECRET=lifehub_secret_key_2025
NODE_ENV=development
```

---

## 🛠️ Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Cannot GET / | Start frontend server |
| Failed to fetch | Start backend server |
| MongoDB error | Start MongoDB (mongod) |
| Port 5000 in use | Change PORT in .env |
| CORS error | Restart both servers |
| 404 endpoints | Check backend is running |

---

## 📂 Important Files

```
backend/
├── server.js          ← Start point
├── .env               ← Configuration
└── config/db.js       ← DB connection

frontend/
├── index.html         ← Start here
├── styles/style.css   ← All styling
└── js/api.js          ← API client
```

---

## 🔗 API Endpoints (All Protected)

### Auth
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user
- `PUT /api/auth/me` - Update user

### Expenses
- `POST /api/expenses` - Create
- `GET /api/expenses` - List (with filters)
- `PUT /api/expenses/:id` - Update
- `DELETE /api/expenses/:id` - Delete
- `GET /api/expenses/summary` - Monthly stats

### Bills
- `POST /api/bills` - Create
- `GET /api/bills` - List with due soon/overdue
- `PUT /api/bills/:id` - Update
- `PATCH /api/bills/:id/paid` - Mark paid
- `DELETE /api/bills/:id` - Delete

### Medicines
- `POST /api/medicines` - Create
- `GET /api/medicines` - List active
- `PUT /api/medicines/:id` - Update
- `DELETE /api/medicines/:id` - Delete

### Groceries
- `POST /api/groceries` - Create
- `GET /api/groceries` - List with low stock
- `PUT /api/groceries/:id` - Update
- `PATCH /api/groceries/:id/purchased` - Mark bought
- `DELETE /api/groceries/:id` - Delete

### Documents
- `POST /api/documents` - Create
- `GET /api/documents` - List with filters
- `GET /api/documents/search` - Search
- `PUT /api/documents/:id` - Update
- `DELETE /api/documents/:id` - Delete

### Tasks
- `POST /api/tasks` - Create
- `GET /api/tasks` - List with today's tasks
- `PUT /api/tasks/:id` - Update
- `PATCH /api/tasks/:id/complete` - Mark complete
- `DELETE /api/tasks/:id` - Delete

---

## 💾 Data Examples

### Create Expense
```javascript
{
  amount: 50,
  category: "Food",
  date: "2025-01-15",
  notes: "Grocery shopping"
}
```

### Create Bill
```javascript
{
  type: "Electricity",
  amount: 100,
  dueDate: "2025-02-01",
  notes: "Monthly bill"
}
```

### Create Grocery Item
```javascript
{
  item: "Milk",
  quantity: 2,
  unit: "liter",
  priority: "High",
  category: "Dairy"
}
```

### Create Task
```javascript
{
  title: "Clean kitchen",
  description: "Deep clean",
  assignedTo: "John",
  dueDate: "2025-02-01",
  priority: "High",
  category: "Household"
}
```

---

## 🎨 Theme Colors

- **Primary:** #3498db (Blue)
- **Success:** #2ecc71 (Green)
- **Danger:** #e74c3c (Red)
- **Warning:** #f39c12 (Orange)
- **Dark:** #2c3e50 (Dark Blue)
- **Light:** #ecf0f1 (Light Gray)

---

## ⌨️ Keyboard Shortcuts (Browser)

- `F12` - Open Developer Tools
- `Ctrl+Shift+C` - Inspect Element
- `Ctrl+J` - Console
- `Ctrl+K` - Clear Console

---

## 📱 Responsive Sizes

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px

All pages fully responsive!

---

## 🔐 Security Checklist

- ✓ Use strong passwords (8+ chars)
- ✓ Don't share login credentials
- ✓ Clear browser data when done
- ✓ Keep MongoDB secure (use Atlas in production)
- ✓ Update .env JWT_SECRET in production

---

## 🎓 Learning Resources

### Inside the Project
- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Installation walkthrough
- `PROJECT_SUMMARY.md` - Feature checklist
- Code comments - Throughout all files

### External Resources
- MongoDB: `https://docs.mongodb.com`
- Express: `https://expressjs.com`
- JWT: `https://jwt.io`

---

## 🆘 Getting Help

1. Check README.md first
2. See SETUP_GUIDE.md for setup issues
3. Review PROJECT_SUMMARY.md for features
4. Check browser console (F12) for errors
5. Verify backend server is running
6. Verify MongoDB is running

---

## ✅ Verification Checklist

Before considering setup complete:
- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard shows
- [ ] Can add expense
- [ ] Can add bill
- [ ] Can add medicine
- [ ] Can add grocery
- [ ] Can create task
- [ ] Theme toggle works
- [ ] Notes save locally

---

## 📞 Quick Commands Reference

```bash
# Check if Node installed
node --version

# Check if MongoDB running
mongosh

# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 🎉 You're All Set!

Everything is ready to go. Start the servers and begin managing your life with LifeHub! 

**Happy Managing! 🏠✨**

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅

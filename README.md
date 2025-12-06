# LifeHub - Personal Home Management Ecosystem

LifeHub is a full-stack web application designed to help families and individuals manage their daily life efficiently. Track expenses, manage bills, organize groceries, schedule medicines, manage tasks, store documents, and plan budgets all in one place.

## Features

### 💰 Financial Management
- **Expense Tracking**: Log expenses by category (Food, Transport, Entertainment, Health, Utilities, Shopping, Other)
- **Monthly Summary**: Visual breakdown of spending by category using CSS bar charts
- **Budget Planning**: Set monthly budgets and track spending against goals
- **Savings Calculator**: Project savings based on monthly budget goals

### 💳 Bill Management
- **Bill Tracking**: Manage all household and utility bills
- **Due Soon Alerts**: Get notifications for bills due within 7 days
- **Overdue Alerts**: Automatic detection of overdue bills
- **Payment Status**: Mark bills as paid or pending

### 💊 Health & Medicine
- **Medicine Schedule**: Track medicines with dosage and frequency
- **Active Medicines**: View only currently active medications
- **Dosage Times**: Set specific times for taking medicines

### 🛒 Grocery Management
- **Shopping Lists**: Create and manage grocery items
- **Low Stock Alerts**: Automatic alerts for items running low
- **Priority Sorting**: Organize items by priority (High, Medium, Low)
- **Purchase Tracking**: Mark items as purchased

### ✓ Task Management
- **Family Tasks**: Create and assign tasks to family members
- **Due Dates**: Set task deadlines
- **Priority Levels**: High, Medium, Low priority tasks
- **Completion Tracking**: Mark tasks complete

### 📄 Document Management
- **Document Storage**: Store important documents with metadata
- **Categorization**: Organize by type (Identification, Financial, Medical, Property, Insurance, Legal)
- **Search**: Full-text search for documents
- **Tagging**: Add custom tags for easy retrieval

### 📊 Dashboard
- Monthly expense summary
- Bills due soon count
- Next medicine to take
- Low stock grocery items
- Today's tasks
- Budget usage percentage
- Recent expenses list
- Upcoming bills list

### 📝 Additional Features
- **Notes**: Quick note-taking feature (browser local storage)
- **Theme Toggle**: Light/Dark mode support
- **User Profile**: Manage personal settings
- **Authentication**: Secure login/signup with JWT tokens

## Project Structure

```
lifehub/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Dependencies
│   ├── .env                       # Environment variables
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── error.js              # Error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   ├── Bill.js
│   │   ├── Medicine.js
│   │   ├── Grocery.js
│   │   ├── Document.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── billController.js
│   │   ├── medicineController.js
│   │   ├── groceryController.js
│   │   ├── documentController.js
│   │   └── taskController.js
│   └── routes/
│       ├── authRoutes.js
│       ├── expenseRoutes.js
│       ├── billRoutes.js
│       ├── medicineRoutes.js
│       ├── groceryRoutes.js
│       ├── documentRoutes.js
│       └── taskRoutes.js
├── frontend/
│   ├── index.html                # Landing page
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── expenses.html
│   ├── bills.html
│   ├── medicine.html
│   ├── groceries.html
│   ├── tasks.html
│   ├── documents.html
│   ├── budget.html
│   ├── notes.html
│   ├── settings.html
│   ├── styles/
│   │   └── style.css             # Comprehensive styling
│   └── js/
│       ├── api.js                # API client
│       ├── utils.js              # Utility functions
│       ├── dashboard.js
│       ├── expenses.js
│       ├── bills.js
│       ├── medicine.js
│       ├── groceries.js
│       ├── tasks.js
│       ├── documents.js
│       ├── budget.js
│       └── settings.js
└── README.md
```

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Document Mapper)
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **HTML5**: Structure
- **CSS3**: Styling with Flexbox and Grid
- **Vanilla JavaScript**: Logic and interactivity
- **Fetch API**: HTTP requests

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection string)
- A code editor (VS Code recommended)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lifehub
JWT_SECRET=lifehub_secret_key_2025
NODE_ENV=development
```

4. Start MongoDB:
```bash
# On Windows with MongoDB installed locally
mongod
```

5. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Open with a local server:
   - **Option 1**: Use VS Code Live Server extension
     - Right-click `index.html` → "Open with Live Server"
   
   - **Option 2**: Use Python's built-in server
     ```bash
     python -m http.server 8000
     ```
   
   - **Option 3**: Use Node's http-server
     ```bash
     npx http-server
     ```

3. Access the application:
- Open `http://localhost:8000` (or your chosen port)
- Start with landing page → Sign up → Dashboard

## Usage Guide

### 1. Authentication
- **Sign Up**: Create a new account with name, email, and password
- **Login**: Use credentials to access your account
- **Logout**: Click logout button to end session

### 2. Dashboard
- View all critical information at a glance
- See recent expenses and upcoming bills
- Quick access to all modules

### 3. Expenses
- Add new expenses with category, amount, date, and notes
- Filter by month and category
- View monthly summary with category breakdown

### 4. Bills
- Add bills with type, amount, and due date
- Automatic alerts for bills due soon (7 days)
- Mark bills as paid
- See total amount due

### 5. Medicines
- Add medicines with dosage and frequency
- Track only active medicines
- Easy deletion of completed medications

### 6. Groceries
- Create shopping lists with quantities
- Set priorities (High, Medium, Low)
- Get alerts for low stock items (≤2 quantity)
- Mark items as purchased

### 7. Tasks
- Create family tasks with assignments
- Set due dates and priorities
- Track task completion
- Filter by pending/completed

### 8. Documents
- Add document records with metadata
- Categorize by type
- Add custom tags for organization
- Search functionality

### 9. Budget
- Set monthly budget limits
- View spending by category
- Calculate projected savings
- Track budget usage percentage

### 10. Notes
- Quick note-taking (stored locally in browser)
- Simple and clean interface

### 11. Settings
- Update profile information
- Change theme (Light/Dark mode)
- User preferences

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update user profile

### Expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/summary` - Monthly summary
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Bills
- `POST /api/bills` - Create bill
- `GET /api/bills` - Get all bills
- `PATCH /api/bills/:id/paid` - Mark as paid
- `PUT /api/bills/:id` - Update bill
- `DELETE /api/bills/:id` - Delete bill

### Medicines
- `POST /api/medicines` - Create medicine
- `GET /api/medicines` - Get all active medicines
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine

### Groceries
- `POST /api/groceries` - Create grocery item
- `GET /api/groceries` - Get grocery items
- `PATCH /api/groceries/:id/purchased` - Mark as purchased
- `PUT /api/groceries/:id` - Update grocery
- `DELETE /api/groceries/:id` - Delete grocery

### Documents
- `POST /api/documents` - Create document
- `GET /api/documents` - Get all documents
- `GET /api/documents/search` - Search documents
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `PATCH /api/tasks/:id/complete` - Mark complete
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Features Explained

### Smart Alerts System
- Bills due soon (within 7 days)
- Overdue bills (past due date)
- Low stock groceries (≤2 items)
- Overdue tasks

### Monthly Summary
- Automatic aggregation of expenses by category
- Visual representation using CSS bars
- Budget comparison

### Priority-Based Sorting
- Automatic sorting by priority (High → Low)
- Color-coded priority indicators

### Local Storage
- Notes saved in browser
- Theme preferences saved
- Session management with JWT tokens

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features
- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- User data isolation per account

## Future Enhancements
- Email reminders for upcoming bills and medicines
- Multiple file uploads for documents
- Family member sharing (add/invite)
- Mobile app
- Push notifications
- Data export (PDF/Excel)
- Advanced analytics and reporting
- Bill payment integration
- Integration with banking APIs

## Troubleshooting

### "Cannot GET" error
- Make sure backend server is running on `http://localhost:5000`
- Check CORS configuration
- Verify MongoDB connection

### "Failed to fetch" errors
- Check browser console (F12)
- Verify backend API is running
- Check network tab for CORS issues

### Data not loading
- Clear browser cache
- Check localStorage token is set
- Verify user is authenticated
- Check MongoDB connection

### MongoDB connection error
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- Verify MongoDB is installed

## Contributing
This is a complete full-stack application ready for use. Feel free to customize and extend based on your needs.

## License
MIT License - Free to use and modify

## Support
For issues or questions, check the code comments and documentation.

---

**Created with ❤️ for personal home management**

Happy managing your life with LifeHub! 🏠✨

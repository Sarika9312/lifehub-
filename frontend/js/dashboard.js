// Dashboard functionality
checkAuth();

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

async function loadDashboard() {
  try {
    // Get user info
    const userRes = await authAPI.getMe();
    const userName = userRes.user.name;
    const userCurrency = userRes.user.currency;
    
    document.getElementById('userInfo').innerHTML = `Welcome, ${userName} (${userCurrency})`;
    
    // Store user's currency for global use
    if (userCurrency) {
      localStorage.setItem('budgetCurrency', userCurrency);
    }

    // Get monthly expenses
    const expenseRes = await expensesAPI.getAll(currentMonth, currentYear);
    document.getElementById('monthlyExpense').textContent = formatCurrency(expenseRes.total || 0);

    // Get bills due soon
    const billsRes = await billsAPI.getAll();
    const dueSoon = billsRes.dueSoon || [];
    document.getElementById('billsDue').textContent = dueSoon.length.toString();

    // Get medicines
    const medicinesRes = await medicinesAPI.getAll();
    const medicines = medicinesRes.medicines || [];
    const nextMedicine = medicines.length > 0 ? medicines[0].name : 'None';
    document.getElementById('nextMedicine').textContent = nextMedicine;

    // Get groceries with low stock
    const groceriesRes = await groceriesAPI.getAll(false);
    const lowStock = groceriesRes.lowStock || [];
    document.getElementById('lowStock').textContent = lowStock.length.toString();

    // Get today's tasks
    const tasksRes = await tasksAPI.getAll(false);
    const todaysTasks = tasksRes.todaysTasks || [];
    document.getElementById('todaysTasks').textContent = todaysTasks.length.toString();

    // Calculate budget usage
    const budgetUsage = expenseRes.total > 0 ? Math.min(100, Math.round((expenseRes.total / 5000) * 100)) : 0;
    document.getElementById('budgetUsage').textContent = budgetUsage + '%';

    // Load recent expenses
    loadRecentExpenses(expenseRes.expenses || []);

    // Load upcoming bills
    loadUpcomingBills(billsRes.bills || []);

  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

function loadRecentExpenses(expenses) {
  const container = document.getElementById('recentExpenses');
  
  if (!expenses || expenses.length === 0) {
    container.innerHTML = '<p>No expenses yet</p>';
    return;
  }

  const recent = expenses.slice(0, 5);
  container.innerHTML = recent.map(exp => `
    <div class="list-item">
      <div class="item-info">
        <div class="item-title">${exp.category}</div>
        <div class="item-details">${formatDateDisplay(exp.date)}</div>
      </div>
      <div style="font-weight: bold; color: #e74c3c;">${formatCurrency(exp.amount)}</div>
    </div>
  `).join('');
}

function loadUpcomingBills(bills) {
  const container = document.getElementById('upcomingBills');
  
  if (!bills || bills.length === 0) {
    container.innerHTML = '<p>No bills</p>';
    return;
  }

  const upcoming = bills.filter(b => !b.paid).slice(0, 5);
  container.innerHTML = upcoming.map(bill => {
    const daysUntil = getDaysUntil(bill.dueDate);
    let status = 'status-pending';
    if (daysUntil < 0) status = 'status-overdue';
    if (daysUntil <= 7 && daysUntil >= 0) status = 'status-pending';
    
    return `
      <div class="list-item">
        <div class="item-info">
          <div class="item-title">${bill.type}</div>
          <div class="item-details">Due: ${formatDateDisplay(bill.dueDate)}</div>
        </div>
        <div class="item-actions">
          <span class="${status}">${formatCurrency(bill.amount)}</span>
        </div>
      </div>
    `;
  }).join('');
}

loadDashboard();

// Refresh dashboard every 60 seconds
setInterval(loadDashboard, 60000);

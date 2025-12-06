// Expenses page
checkAuth();

let currentExpenses = [];

async function loadExpenses() {
  try {
    const month = document.getElementById('monthFilter').value ? 
      parseInt(document.getElementById('monthFilter').value.split('-')[1]) : currentMonth;
    const year = document.getElementById('monthFilter').value ? 
      parseInt(document.getElementById('monthFilter').value.split('-')[0]) : currentYear;
    
    const response = await expensesAPI.getAll(month, year);
    currentExpenses = response.expenses || [];
    
    displayExpenses(currentExpenses);
    displaySummary(response.summary, response.total);
  } catch (error) {
    console.error('Error loading expenses:', error);
    document.getElementById('expensesList').innerHTML = '<p>Error loading expenses</p>';
  }
}

function displayExpenses(expenses) {
  const container = document.getElementById('expensesList');
  
  if (!expenses || expenses.length === 0) {
    container.innerHTML = '<p>No expenses found</p>';
    return;
  }

  container.innerHTML = expenses.map(exp => `
    <div class="list-item">
      <div class="item-info">
        <div class="item-title">${exp.category}</div>
        <div class="item-details">${exp.notes || 'No notes'} • ${formatDateDisplay(exp.date)}</div>
      </div>
      <div class="item-actions">
        <span style="font-weight: bold; color: #e74c3c; margin-right: 10px;">${formatCurrency(exp.amount)}</span>
        <button onclick="deleteExpense('${exp._id}')" class="btn btn-danger small">Delete</button>
      </div>
    </div>
  `).join('');
}

function displaySummary(summary, total) {
  document.getElementById('totalExpense').textContent = formatCurrency(total || 0);
  
  const categories = summary || {};
  const container = document.getElementById('categorySummary');
  
  if (Object.keys(categories).length === 0) {
    container.innerHTML = '<p>No expense data</p>';
    return;
  }

  const maxAmount = Math.max(...Object.values(categories));
  
  container.innerHTML = Object.entries(categories).map(([cat, amount]) => {
    const percentage = (amount / maxAmount) * 100;
    return `
      <div class="bar-item">
        <div class="bar-label">${cat}</div>
        <div class="bar">
          <div class="bar-fill" style="width: ${percentage}%">
            ${formatCurrency(amount)}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function filterExpenses() {
  loadExpenses();
}

async function addExpense(e) {
  e.preventDefault();
  
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
  const notes = document.getElementById('notes').value;

  try {
    const response = await expensesAPI.create({
      amount: parseFloat(amount),
      category,
      date,
      notes
    });

    if (response.success) {
      document.getElementById('expenseForm').reset();
      loadExpenses();
      alert('Expense added successfully!');
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    alert('Error adding expense');
  }
}

async function deleteExpense(id) {
  if (confirm('Are you sure you want to delete this expense?')) {
    try {
      const response = await expensesAPI.delete(id);
      if (response.success) {
        loadExpenses();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  }
}

// Set today's date as default
document.getElementById('date').valueAsDate = new Date();
document.getElementById('monthFilter').value = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

document.getElementById('expenseForm').addEventListener('submit', addExpense);

loadExpenses();

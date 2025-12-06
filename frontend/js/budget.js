// Budget page
checkAuth();

async function loadBudget() {
  try {
    const monthInput = document.getElementById('budgetMonth').value;
    if (!monthInput) {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      document.getElementById('budgetMonth').value = `${year}-${month}`;
      return loadBudget();
    }

    const [year, month] = monthInput.split('-');
    const response = await expensesAPI.getMonthlySummary(parseInt(month), parseInt(year));
    
    const summary = response.summary || {};
    const total = response.total || 0;
    
    displayBudgetSummary(total);
    displayBudgetVisualization(summary);
    calculateSavings();
  } catch (error) {
    console.error('Error loading budget:', error);
  }
}

function displayBudgetSummary(spent) {
  const budget = 5000;
  const remaining = budget - spent;
  const percent = Math.round((spent / budget) * 100);

  document.getElementById('totalBudget').textContent = formatCurrency(budget);
  document.getElementById('totalSpent').textContent = formatCurrency(spent);
  document.getElementById('remaining').textContent = formatCurrency(Math.max(0, remaining));
  document.getElementById('usagePercent').textContent = Math.min(100, percent) + '%';
}

function displayBudgetVisualization(summary) {
  const container = document.getElementById('budgetVisualization');
  
  if (!summary || Object.keys(summary).length === 0) {
    container.innerHTML = '<p>No spending data for this month</p>';
    return;
  }

  const maxAmount = Math.max(...Object.values(summary));
  
  container.innerHTML = Object.entries(summary).map(([cat, amount]) => {
    const percentage = (amount / maxAmount) * 100;
    const colors = {
      'Food': '#e74c3c',
      'Transport': '#3498db',
      'Entertainment': '#9b59b6',
      'Health': '#2ecc71',
      'Utilities': '#f39c12',
      'Shopping': '#e91e63',
      'Other': '#95a5a6'
    };
    
    return `
      <div class="bar-item">
        <div class="bar-label">${cat}</div>
        <div class="bar">
          <div class="bar-fill" style="width: ${percentage}%; background: ${colors[cat] || '#3498db'}">
            ${formatCurrency(amount)}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function calculateSavings() {
  const savingsGoal = parseFloat(document.getElementById('savingsGoal').value) || 0;
  const budget = 5000;
  const projected = Math.max(0, budget - savingsGoal);
  
  document.getElementById('projectedSavings').textContent = formatCurrency(projected);
}

// Initialize
const now = new Date();
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();
document.getElementById('budgetMonth').value = `${year}-${month}`;

document.getElementById('budgetMonth').addEventListener('change', loadBudget);
document.getElementById('savingsGoal').addEventListener('change', calculateSavings);

loadBudget();

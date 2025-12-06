// Budget page
checkAuth();

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  AED: 'د.إ'
};

function getBudgetSettings() {
  const budgetInput = document.getElementById('budgetAmount');
  const currencySelect = document.getElementById('currencySelect');

  const savedBudget = parseFloat(localStorage.getItem('budgetAmount'));
  const savedCurrency = localStorage.getItem('budgetCurrency');

  if (!budgetInput.value) budgetInput.value = savedBudget || 5000;
  if (!currencySelect.value) currencySelect.value = savedCurrency || 'USD';

  const budget = parseFloat(budgetInput.value) || 0;
  const currency = currencySelect.value || 'USD';

  localStorage.setItem('budgetAmount', budget);
  localStorage.setItem('budgetCurrency', currency);

  return { budget, currency };
}

function formatWithCurrency(amount, currency) {
  const symbol = currencySymbols[currency] || `${currency} `;
  return `${symbol}${amount.toFixed(2)}`;
}

async function loadBudget() {
  try {
    const { budget, currency } = getBudgetSettings();

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
    
    displayBudgetSummary(total, budget, currency);
    displayBudgetVisualization(summary, currency);
    calculateSavings();
  } catch (error) {
    console.error('Error loading budget:', error);
    // Fallback to current inputs even if API fails
    const { budget, currency } = getBudgetSettings();
    displayBudgetSummary(0, budget, currency);
    displayBudgetVisualization({}, currency);
    calculateSavings();
  }
}

function displayBudgetSummary(spent, budget, currency) {
  const remaining = budget - spent;
  const percent = Math.round((spent / budget) * 100);

  document.getElementById('totalBudget').textContent = formatWithCurrency(budget, currency);
  document.getElementById('totalSpent').textContent = formatWithCurrency(spent, currency);
  document.getElementById('remaining').textContent = formatWithCurrency(Math.max(0, remaining), currency);
  document.getElementById('usagePercent').textContent = Math.min(100, percent) + '%';
}

function displayBudgetVisualization(summary, currency) {
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
            ${formatWithCurrency(amount, currency)}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function calculateSavings() {
  const savingsGoal = parseFloat(document.getElementById('savingsGoal').value) || 0;
  const { budget, currency } = getBudgetSettings();
  const projected = Math.max(0, budget - savingsGoal);
  
  document.getElementById('projectedSavings').textContent = formatWithCurrency(projected, currency);
}

// Initialize
const now = new Date();
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();
document.getElementById('budgetMonth').value = `${year}-${month}`;

document.getElementById('budgetMonth').addEventListener('change', loadBudget);
document.getElementById('savingsGoal').addEventListener('change', calculateSavings);
document.getElementById('budgetAmount').addEventListener('input', () => {
  getBudgetSettings();
  loadBudget();
});
document.getElementById('currencySelect').addEventListener('change', () => {
  getBudgetSettings();
  loadBudget();
});

loadBudget();

// Utility functions

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  AED: 'د.إ',
  JPY: '¥',
  CHF: 'CHF'
};

function getUserCurrency() {
  return localStorage.getItem('budgetCurrency') || 'USD';
}

function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

function formatDateDisplay(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function formatCurrency(amount) {
  const currency = getUserCurrency();
  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
}

function formatMonthYear(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function getDaysUntil(date) {
  const d1 = new Date().getTime();
  const d2 = new Date(date).getTime();
  const diff = d2 - d1;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
}

function isOverdue(date) {
  return getDaysUntil(date) < 0;
}

function isDueSoon(date) {
  const days = getDaysUntil(date);
  return days >= 0 && days <= 7;
}

function isToday(date) {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'High': return '#e74c3c';
    case 'Medium': return '#f39c12';
    case 'Low': return '#2ecc71';
    default: return '#3498db';
  }
}

function getPriorityClass(priority) {
  return `priority-${priority.toLowerCase()}`;
}

function getCurrentMonth() {
  const now = new Date();
  return now.getMonth() + 1;
}

function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

function setMonthInput(elementId) {
  const input = document.getElementById(elementId);
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  input.value = `${year}-${month}`;
}

function getMonthFromInput(elementId) {
  const input = document.getElementById(elementId);
  if (!input.value) return null;
  const [year, month] = input.value.split('-');
  return { month: parseInt(month), year: parseInt(year) };
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  localStorage.setItem('theme', theme);
}

function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

function initTheme() {
  const theme = getTheme();
  applyTheme(theme);
}

initTheme();

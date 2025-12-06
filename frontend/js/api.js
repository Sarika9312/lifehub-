// API Configuration
const API_BASE = 'https://10.233.251.26:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Auth API
const authAPI = {
  signup: (data) => fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json()),

  login: (data) => fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getMe: () => fetch(`${API_BASE}/auth/me`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  updateMe: (data) => fetch(`${API_BASE}/auth/me`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),
};

// Expenses API
const expensesAPI = {
  create: (data) => fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getAll: (month, year, category) => {
    let url = `${API_BASE}/expenses?`;
    if (month && year) {
      url += `month=${month}&year=${year}`;
    }
    if (category) {
      url += `${month && year ? '&' : ''}category=${category}`;
    }
    return fetch(url, { headers: getHeaders() }).then(r => r.json());
  },

  getById: (id) => fetch(`${API_BASE}/expenses/${id}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  update: (id, data) => fetch(`${API_BASE}/expenses/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  delete: (id) => fetch(`${API_BASE}/expenses/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(r => r.json()),

  getMonthlySummary: (month, year) => fetch(
    `${API_BASE}/expenses/summary?month=${month}&year=${year}`,
    { headers: getHeaders() }
  ).then(r => r.json()),
};

// Bills API
const billsAPI = {
  create: (data) => fetch(`${API_BASE}/bills`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getAll: () => fetch(`${API_BASE}/bills`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  getById: (id) => fetch(`${API_BASE}/bills/${id}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  update: (id, data) => fetch(`${API_BASE}/bills/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  markPaid: (id) => fetch(`${API_BASE}/bills/${id}/paid`, {
    method: 'PATCH',
    headers: getHeaders(),
  }).then(r => r.json()),

  delete: (id) => fetch(`${API_BASE}/bills/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(r => r.json()),
};

// Medicines API
const medicinesAPI = {
  create: (data) => fetch(`${API_BASE}/medicines`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getAll: () => fetch(`${API_BASE}/medicines`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  getById: (id) => fetch(`${API_BASE}/medicines/${id}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  update: (id, data) => fetch(`${API_BASE}/medicines/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  delete: (id) => fetch(`${API_BASE}/medicines/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(r => r.json()),
};

// Groceries API
const groceriesAPI = {
  create: (data) => fetch(`${API_BASE}/groceries`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getAll: (purchased) => {
    let url = `${API_BASE}/groceries`;
    if (purchased !== undefined) {
      url += `?purchased=${purchased}`;
    }
    return fetch(url, { headers: getHeaders() }).then(r => r.json());
  },

  getById: (id) => fetch(`${API_BASE}/groceries/${id}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  update: (id, data) => fetch(`${API_BASE}/groceries/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  markPurchased: (id) => fetch(`${API_BASE}/groceries/${id}/purchased`, {
    method: 'PATCH',
    headers: getHeaders(),
  }).then(r => r.json()),

  delete: (id) => fetch(`${API_BASE}/groceries/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(r => r.json()),
};

// Documents API
const documentsAPI = {
  create: (data) => fetch(`${API_BASE}/documents`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getAll: (category, tag) => {
    let url = `${API_BASE}/documents?`;
    if (category) url += `category=${category}`;
    if (tag) url += `${category ? '&' : ''}tag=${tag}`;
    return fetch(url, { headers: getHeaders() }).then(r => r.json());
  },

  getById: (id) => fetch(`${API_BASE}/documents/${id}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  update: (id, data) => fetch(`${API_BASE}/documents/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  search: (query) => fetch(`${API_BASE}/documents/search?query=${query}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  delete: (id) => fetch(`${API_BASE}/documents/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(r => r.json()),
};

// Tasks API
const tasksAPI = {
  create: (data) => fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  getAll: (completed) => {
    let url = `${API_BASE}/tasks`;
    if (completed !== undefined) {
      url += `?completed=${completed}`;
    }
    return fetch(url, { headers: getHeaders() }).then(r => r.json());
  },

  getById: (id) => fetch(`${API_BASE}/tasks/${id}`, {
    headers: getHeaders(),
  }).then(r => r.json()),

  update: (id, data) => fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(r => r.json()),

  complete: (id) => fetch(`${API_BASE}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: getHeaders(),
  }).then(r => r.json()),

  delete: (id) => fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(r => r.json()),
};

// Global logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

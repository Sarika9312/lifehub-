// Groceries page
checkAuth();

async function loadGroceries() {
  try {
    const response = await groceriesAPI.getAll(false);
    const groceries = response.groceries || [];
    const lowStock = response.lowStock || [];
    
    displayLowStockAlert(lowStock);
    displayGroceries(groceries);
  } catch (error) {
    console.error('Error loading groceries:', error);
  }
}

function displayLowStockAlert(lowStock) {
  const container = document.getElementById('lowStockAlert');
  
  if (!lowStock || lowStock.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <h4>⚠️ Low Stock Items (${lowStock.length})</h4>
    ${lowStock.map(item => `
      <div class="alert-item">
        ${item.item}: ${item.quantity} ${item.unit} remaining
      </div>
    `).join('')}
  `;
}

function displayGroceries(groceries) {
  const container = document.getElementById('groceriesList');
  
  if (!groceries || groceries.length === 0) {
    container.innerHTML = '<p>No grocery items</p>';
    return;
  }

  // Sort by priority
  const sorted = [...groceries].sort((a, b) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  container.innerHTML = sorted.map(item => `
    <div class="list-item" style="opacity: ${item.purchased ? 0.6 : 1}">
      <div class="item-info">
        <div class="item-title" style="text-decoration: ${item.purchased ? 'line-through' : 'none'}">
          ${item.item}
        </div>
        <div class="item-details">
          Qty: ${item.quantity} ${item.unit} | Category: ${item.category} 
          <span class="${getPriorityClass(item.priority)}"> • ${item.priority}</span>
        </div>
      </div>
      <div class="item-actions">
        ${!item.purchased ? 
          `<button onclick="markPurchased('${item._id}')" class="btn btn-secondary small">Mark Purchased</button>` : 
          `<button onclick="markUnpurchased('${item._id}')" class="btn btn-warning small">Mark Unpurchased</button>`
        }
        <button onclick="deleteGrocery('${item._id}')" class="btn btn-danger small">Delete</button>
      </div>
    </div>
  `).join('');
}

async function addGrocery(e) {
  e.preventDefault();
  
  const item = document.getElementById('item').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const unit = document.getElementById('unit').value;
  const priority = document.getElementById('priority').value;
  const category = document.getElementById('category').value;

  try {
    const response = await groceriesAPI.create({
      item,
      quantity,
      unit,
      priority,
      category,
    });

    if (response.success) {
      document.getElementById('groceryForm').reset();
      loadGroceries();
      alert('Grocery item added!');
    }
  } catch (error) {
    console.error('Error adding grocery:', error);
    alert('Error adding grocery');
  }
}

async function markPurchased(id) {
  try {
    const response = await groceriesAPI.markPurchased(id);
    if (response.success) {
      loadGroceries();
    }
  } catch (error) {
    console.error('Error marking purchased:', error);
  }
}

async function markUnpurchased(id) {
  try {
    await groceriesAPI.update(id, { purchased: false });
    loadGroceries();
  } catch (error) {
    console.error('Error updating:', error);
  }
}

async function deleteGrocery(id) {
  if (confirm('Are you sure?')) {
    try {
      const response = await groceriesAPI.delete(id);
      if (response.success) {
        loadGroceries();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }
}

document.getElementById('groceryForm').addEventListener('submit', addGrocery);

loadGroceries();

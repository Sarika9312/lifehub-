// Bills page
checkAuth();

async function loadBills() {
  try {
    const response = await billsAPI.getAll();
    const bills = response.bills || [];
    const dueSoon = response.dueSoon || [];
    const overdue = response.overdue || [];
    
    displayBills(bills);
    displayAlerts(overdue, dueSoon);
    
    document.getElementById('totalDue').textContent = formatCurrency(response.totalDue || 0);
  } catch (error) {
    console.error('Error loading bills:', error);
  }
}

function displayBills(bills) {
  const container = document.getElementById('billsList');
  
  if (!bills || bills.length === 0) {
    container.innerHTML = '<p>No bills</p>';
    return;
  }

  container.innerHTML = bills.map(bill => {
    const daysUntil = getDaysUntil(bill.dueDate);
    let statusClass = bill.paid ? 'status-paid' : (daysUntil < 0 ? 'status-overdue' : 'status-pending');
    
    return `
      <div class="list-item">
        <div class="item-info">
          <div class="item-title">${bill.type}</div>
          <div class="item-details">Due: ${formatDateDisplay(bill.dueDate)}</div>
        </div>
        <div class="item-actions">
          <span class="${statusClass}">${bill.paid ? 'Paid' : 'Pending'} • ${formatCurrency(bill.amount)}</span>
          ${!bill.paid ? `<button onclick="markBillPaid('${bill._id}')" class="btn btn-secondary small">Mark Paid</button>` : ''}
          <button onclick="deleteBill('${bill._id}')" class="btn btn-danger small">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function displayAlerts(overdue, dueSoon) {
  const overdueContainer = document.getElementById('overdueAlerts');
  const dueSoonContainer = document.getElementById('dueSoonAlerts');
  
  if (overdue && overdue.length > 0) {
    overdueContainer.innerHTML = `
      <h4>⚠️ Overdue Bills (${overdue.length})</h4>
      ${overdue.map(bill => `
        <div class="alert-item">
          ${bill.type}: ${formatCurrency(bill.amount)} - Due ${formatDateDisplay(bill.dueDate)}
        </div>
      `).join('')}
    `;
  } else {
    overdueContainer.innerHTML = '';
  }

  if (dueSoon && dueSoon.length > 0) {
    dueSoonContainer.innerHTML = `
      <h4>🔔 Due Soon (${dueSoon.length})</h4>
      ${dueSoon.map(bill => {
        const days = getDaysUntil(bill.dueDate);
        return `
          <div class="alert-item">
            ${bill.type}: ${formatCurrency(bill.amount)} - Due in ${days} day${days !== 1 ? 's' : ''}
          </div>
        `;
      }).join('')}
    `;
  } else {
    dueSoonContainer.innerHTML = '';
  }
}

async function addBill(e) {
  e.preventDefault();
  
  const type = document.getElementById('billType').value;
  const amount = parseFloat(document.getElementById('billAmount').value);
  const dueDate = document.getElementById('dueDate').value;
  const notes = document.getElementById('billNotes').value;

  try {
    const response = await billsAPI.create({
      type,
      amount,
      dueDate,
      notes
    });

    if (response.success) {
      document.getElementById('billForm').reset();
      loadBills();
      alert('Bill added successfully!');
    }
  } catch (error) {
    console.error('Error adding bill:', error);
    alert('Error adding bill');
  }
}

async function markBillPaid(id) {
  try {
    const response = await billsAPI.markPaid(id);
    if (response.success) {
      loadBills();
      alert('Bill marked as paid!');
    }
  } catch (error) {
    console.error('Error updating bill:', error);
  }
}

async function deleteBill(id) {
  if (confirm('Are you sure?')) {
    try {
      const response = await billsAPI.delete(id);
      if (response.success) {
        loadBills();
      }
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  }
}

document.getElementById('billForm').addEventListener('submit', addBill);

loadBills();

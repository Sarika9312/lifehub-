// Medicines page
checkAuth();

async function loadMedicines() {
  try {
    const response = await medicinesAPI.getAll();
    const medicines = response.medicines || [];
    displayMedicines(medicines);
  } catch (error) {
    console.error('Error loading medicines:', error);
  }
}

function displayMedicines(medicines) {
  const container = document.getElementById('medicinesList');
  
  if (!medicines || medicines.length === 0) {
    container.innerHTML = '<p>No active medicines</p>';
    return;
  }

  container.innerHTML = medicines.map(med => `
    <div class="list-item">
      <div class="item-info">
        <div class="item-title">${med.name}</div>
        <div class="item-details">
          Dosage: ${med.dosage} | Frequency: ${med.frequency}
          ${med.dosageTime && med.dosageTime.length > 0 ? `<br/>Times: ${med.dosageTime.join(', ')}` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button onclick="deleteMedicine('${med._id}')" class="btn btn-danger small">Delete</button>
      </div>
    </div>
  `).join('');
}

async function addMedicine(e) {
  e.preventDefault();
  
  const name = document.getElementById('medName').value;
  const dosage = document.getElementById('dosage').value;
  const frequency = document.getElementById('frequency').value;
  const startDate = document.getElementById('startDate').value || new Date().toISOString().split('T')[0];

  try {
    const response = await medicinesAPI.create({
      name,
      dosage,
      frequency,
      startDate,
      dosageTime: [],
    });

    if (response.success) {
      document.getElementById('medicineForm').reset();
      loadMedicines();
      alert('Medicine added successfully!');
    }
  } catch (error) {
    console.error('Error adding medicine:', error);
    alert('Error adding medicine');
  }
}

async function deleteMedicine(id) {
  if (confirm('Are you sure?')) {
    try {
      const response = await medicinesAPI.delete(id);
      if (response.success) {
        loadMedicines();
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  }
}

document.getElementById('startDate').valueAsDate = new Date();
document.getElementById('medicineForm').addEventListener('submit', addMedicine);

loadMedicines();

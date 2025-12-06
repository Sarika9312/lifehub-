// Documents page
checkAuth();

async function loadDocuments() {
  try {
    const response = await documentsAPI.getAll();
    const documents = response.documents || [];
    displayDocuments(documents);
  } catch (error) {
    console.error('Error loading documents:', error);
  }
}

function displayDocuments(documents) {
  const container = document.getElementById('documentsList');
  
  if (!documents || documents.length === 0) {
    container.innerHTML = '<p>No documents uploaded yet</p>';
    return;
  }

  container.innerHTML = documents.map(doc => `
    <div class="list-item">
      <div class="item-info">
        <div class="item-title">📄 ${doc.filename}</div>
        <div class="item-details">
          Category: ${doc.category} | Uploaded: ${formatDateDisplay(doc.createdAt)}
          ${doc.tags && doc.tags.length > 0 ? `<br/>Tags: ${doc.tags.join(', ')}` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button onclick="deleteDocument('${doc._id}')" class="btn btn-danger small">Delete</button>
      </div>
    </div>
  `).join('');
}

async function addDocument(e) {
  e.preventDefault();
  
  const filename = document.getElementById('docName').value;
  const category = document.getElementById('docCategory').value;
  const tagsStr = document.getElementById('docTags').value;
  const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t);

  try {
    const response = await documentsAPI.create({
      filename,
      filepath: `docs/${filename}`,
      category,
      tags,
      filesize: 0,
    });

    if (response.success) {
      document.getElementById('documentForm').reset();
      loadDocuments();
      alert('Document added successfully!');
    }
  } catch (error) {
    console.error('Error adding document:', error);
    alert('Error adding document');
  }
}

async function searchDocuments() {
  const query = document.getElementById('searchQuery').value;
  if (!query) {
    loadDocuments();
    return;
  }

  try {
    const response = await documentsAPI.search(query);
    const documents = response.documents || [];
    displayDocuments(documents);
  } catch (error) {
    console.error('Error searching:', error);
  }
}

async function deleteDocument(id) {
  if (confirm('Are you sure?')) {
    try {
      const response = await documentsAPI.delete(id);
      if (response.success) {
        loadDocuments();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }
}

document.getElementById('documentForm').addEventListener('submit', addDocument);

loadDocuments();

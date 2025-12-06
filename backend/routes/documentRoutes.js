const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  searchDocuments,
  deleteDocument,
} = require('../controllers/documentController');

router.post('/', protect, createDocument);
router.get('/', protect, getDocuments);
router.get('/search', protect, searchDocuments);
router.get('/:id', protect, getDocumentById);
router.put('/:id', protect, updateDocument);
router.delete('/:id', protect, deleteDocument);

module.exports = router;

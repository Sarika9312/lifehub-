const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} = require('../controllers/medicineController');

router.post('/', protect, createMedicine);
router.get('/', protect, getMedicines);
router.get('/:id', protect, getMedicineById);
router.put('/:id', protect, updateMedicine);
router.delete('/:id', protect, deleteMedicine);

module.exports = router;

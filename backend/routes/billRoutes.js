const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createBill,
  getBills,
  getBillById,
  updateBill,
  markBillPaid,
  deleteBill,
} = require('../controllers/billController');

router.post('/', protect, createBill);
router.get('/', protect, getBills);
router.get('/:id', protect, getBillById);
router.put('/:id', protect, updateBill);
router.patch('/:id/paid', protect, markBillPaid);
router.delete('/:id', protect, deleteBill);

module.exports = router;

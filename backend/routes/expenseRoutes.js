const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getMonthlySummary,
} = require('../controllers/expenseController');

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.get('/summary', protect, getMonthlySummary);
router.get('/:id', protect, getExpenseById);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;

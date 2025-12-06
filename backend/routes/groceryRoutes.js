const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createGrocery,
  getGroceries,
  getGroceryById,
  updateGrocery,
  markGroceryPurchased,
  deleteGrocery,
} = require('../controllers/groceryController');

router.post('/', protect, createGrocery);
router.get('/', protect, getGroceries);
router.get('/:id', protect, getGroceryById);
router.put('/:id', protect, updateGrocery);
router.patch('/:id/purchased', protect, markGroceryPurchased);
router.delete('/:id', protect, deleteGrocery);

module.exports = router;

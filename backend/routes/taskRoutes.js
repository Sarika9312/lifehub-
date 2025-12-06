const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  completeTask,
  deleteTask,
} = require('../controllers/taskController');

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, updateTask);
router.patch('/:id/complete', protect, completeTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;

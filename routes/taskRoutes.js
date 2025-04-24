const express = require('express');
const router = express.Router();
const { addTask, getTasks, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);
router.post('/', addTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);

module.exports = router;

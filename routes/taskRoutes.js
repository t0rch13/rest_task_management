const express = require('express');
const controller = require('../controllers/taskController.js');
const { authenticate } = require('../middleware/authenticate.js');

const router = express.Router();

// Index route
router.get('/', controller.index);

// Add task route
router.post('/', authenticate, controller.add);

// Complete task route
router.put('/:id/complete', authenticate, controller.complete);

// Delete task route
router.delete('/:id', authenticate, controller.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Index route
router.get('/', controller.index);

// Login routes
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

// Logout route
router.get('/logout', controller.logout);

module.exports = router;

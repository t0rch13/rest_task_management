const express = require('express');
const controller = require('../controllers/authController.js');
const {authenticate} = require('../middleware/authenticate.js');

const router = express.Router();

// Login routes
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

// Register routes
router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);

// Logout route
router.get('/logout', controller.logout);

module.exports = router;
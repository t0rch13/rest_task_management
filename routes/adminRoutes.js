const express = require('express');
const controller = require('../controllers/adminController.js');
const {authenticate} = require('../middleware/authenticate.js');

const router = express.Router();

router.get('/admin', authenticate, controller.getAdmin);
router.get('/admin/users', authenticate, controller.getUsers);
router.get('/admin/users/:id', authenticate, controller.getUser);
router.delete('/admin/users/:id/delete', authenticate, controller.deleteUser);
router.get('/admin/users/:id/edit', authenticate, controller.getEditUser);
router.post('/admin/users/:id/edit', authenticate, controller.postEditUser);

module.exports = router;




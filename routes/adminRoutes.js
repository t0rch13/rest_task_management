const express = require('express');
const controller = require('../controllers/adminController.js');
const {authenticate} = require('../middleware/authenticate.js');

const router = express.Router();

router.get('/admin', authenticate, controller.getAdmin);
router.get('/admin/editUser/:id', authenticate, controller.getEditUser);

router.put('/admin/editUser/:id', authenticate, controller.putEditUser);

router.delete('/admin/editUser/:id/delete', authenticate, controller.deleteUser);


module.exports = router;




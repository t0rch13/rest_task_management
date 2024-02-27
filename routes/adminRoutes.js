const express = require('express');
const controller = require('../controllers/adminController.js');
const {authenticate} = require('../middleware/authenticate.js');

const router = express.Router();

router.get('/admin', authenticate, controller.getAdmin);

router.post('/admin/editUsername', authenticate, controller.postEditUsername);
router.post('/admin/editEmail', authenticate, controller.postEditEmail);


router.delete('/admin/users/:id/delete', authenticate, controller.deleteUser);


module.exports = router;




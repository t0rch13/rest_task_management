const express = require('express');
const controller = require('../controllers/apiController.js');

const router = express.Router();

router.get('/articles', controller.getArticles);
router.post('/articles', controller.postArticles);

module.exports = router;

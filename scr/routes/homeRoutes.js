const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',homeController.index);
module.exports = router;
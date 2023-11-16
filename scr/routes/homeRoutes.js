const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middleware/auth.middleware');
router.get('/',authMiddleware.verifyToken,homeController.index);
module.exports = router;
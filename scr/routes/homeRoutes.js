const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',verifyToken,homeController.index);
module.exports = router;
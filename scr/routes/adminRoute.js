const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');


const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',verifyToken,hasRole(1), adminController.Admin_index)

module.exports = router;
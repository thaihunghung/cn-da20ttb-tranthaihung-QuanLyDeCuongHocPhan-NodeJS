const express = require('express');
const router = express.Router();
const {verifyToken, hasRole }  = require('../middleware/auth.middleware');
const logout = require('../controllers/loginController'); 
router.get('/', logout.process__logout);

module.exports = router;
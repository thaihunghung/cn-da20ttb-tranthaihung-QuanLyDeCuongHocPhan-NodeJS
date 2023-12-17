const express = require('express');
const router = express.Router();
const template = require('../controllers/TemplateController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/update',template.Template_Editing)

module.exports = router;
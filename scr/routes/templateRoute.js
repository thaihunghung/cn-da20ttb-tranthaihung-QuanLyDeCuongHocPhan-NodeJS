const express = require('express');
const router = express.Router();
const template = require('../controllers/TemplateController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',verifyToken,hasRole(1),template.Template_Get)
router.put('/update/:id',verifyToken,hasRole(1),template.Template_Update)
module.exports = router;
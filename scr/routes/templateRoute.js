const express = require('express');
const router = express.Router();
const template = require('../controllers/TemplateController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',template.Template_Get)
router.put('/update/:id',template.Template_Update)
module.exports = router;
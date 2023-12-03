const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',verifyToken,projectController.index);
router.post('/',projectController.project_Post_Save);
router.get('/create',verifyToken,projectController.User_Create_fileName);
router.post('/checkName',projectController.Check_File_Name);
router.get('/Update/:finame',projectController.project_Get_Update);

module.exports = router;
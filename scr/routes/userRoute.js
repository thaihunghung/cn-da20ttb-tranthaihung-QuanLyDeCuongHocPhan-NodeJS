const express = require('express');
const router = express.Router();
const userController = require('../controllers/projectController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',verifyToken,userController.index);
router.get('/create',verifyToken,userController.User_Create_fileName);
router.post('/checkName',userController.Check_File_Name);
module.exports = router;
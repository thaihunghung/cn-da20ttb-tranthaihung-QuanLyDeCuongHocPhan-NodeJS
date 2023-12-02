const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/',userController.index);
router.get('/create',userController.User_Create_fileName);
router.post('/checkName',userController.Check_File_Name);
router.get('/test',userController.index);
module.exports = router;
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');


router.get('/create',verifyToken,projectController.User_Create_fileName);
router.post('/checkName',projectController.Check_File_Name);
router.get('/update',projectController.project_Get_Update);

router.delete('/delete/:MaHP',projectController.project_Delete_PUT);
router.get('/',verifyToken,projectController.index);
router.post('/',projectController.project_Post_Save);
router.delete('/:fileName',projectController.delete_File_Name);
module.exports = router;
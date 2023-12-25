const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');

router.post('/pdf',projectController.project_export_pdf);
router.post('/pdf-CDR',projectController.project_export_pdf_CDR);
router.get('/create',verifyToken,projectController.User_Create_fileName);
router.post('/checkName',projectController.Check_File_Name);
router.get('/update',projectController.project_Get_Update);

router.delete('/delete/:MaHP',projectController.project_Delete_PUT);
router.delete('/delete_file/:fileName',projectController.delete_File_Name);
router.get('/',verifyToken,projectController.index);
router.post('/',projectController.project_Post_Save);

module.exports = router;
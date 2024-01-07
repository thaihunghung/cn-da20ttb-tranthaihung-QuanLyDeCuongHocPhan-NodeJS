const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, hasRole } = require('../middleware/auth.middleware');

router.get('/',verifyToken,projectController.index);
router.post('/',verifyToken,projectController.project_Post_Save);

router.post('/pdf',verifyToken,projectController.project_export_pdf);
router.post('/pdf-CDR',verifyToken,projectController.project_export_pdf_CDR);
router.get('/create',verifyToken,projectController.User_Create_fileName);
router.post('/checkName',projectController.Check_File_Name);
router.get('/update',verifyToken,projectController.project_Get_Update);

router.delete('/delete/:MaHP',verifyToken,projectController.project_Delete_PUT);
router.delete('/delete_file/:fileName',verifyToken,projectController.delete_File_Name);

module.exports = router;
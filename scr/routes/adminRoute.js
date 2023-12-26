const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');


const { verifyToken, hasRole } = require('../middleware/auth.middleware');
router.get('/',verifyToken,hasRole(1), adminController.Admin_index)
router.get('/program',verifyToken,hasRole(1), adminController.Admin_GET_Program)
router.get('/program/edit',verifyToken,hasRole(1), adminController.Admin_Edit_GET_Program)
router.put('/program/edit/:id',verifyToken,hasRole(1), adminController.Admin_Edit_PUT_Program)

router.get('/program/po',verifyToken,hasRole(1), adminController.Admin_GET_PO)
router.post('/program/po',verifyToken,hasRole(1), adminController.Admin_POST_PO)
router.put('/program/po/update/:id',verifyToken,hasRole(1), adminController.Admin_PUT_PO)
router.delete('/program/po/delete/:id',verifyToken,hasRole(1), adminController.Admin_DELETE_PO)

router.get('/program/plo',verifyToken,hasRole(1), adminController.Admin_GET_PLO)
router.post('/program/plo',verifyToken,hasRole(1), adminController.Admin_POST_PLO)
router.put('/program/plo/update/:id',verifyToken,hasRole(1), adminController.Admin_PUT_PLO)
router.delete('/program/plo/delete/:id',verifyToken,hasRole(1), adminController.Admin_DELETE_PLO)

router.get('/list-user/',verifyToken,hasRole(1), adminController.Admin_GET_LIST_USER)
router.post('/list-user/',verifyToken,hasRole(1), adminController.Admin_POST_LIST_USER)
router.put('/list-user//update/:id',verifyToken,hasRole(1), adminController.Admin_PUT_LIST_USER)
router.delete('/list-user/delete/:id',verifyToken,hasRole(1), adminController.Admin_DELETE_LIST_USER)

module.exports = router;

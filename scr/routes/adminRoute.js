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

router.get('/program/Matrix',verifyToken,hasRole(1), adminController.Admin_GET_Matrix)
router.post('/program/Matrix',verifyToken,hasRole(1), adminController.Admin_POST_UPDATE_Matrix)

router.get('/template/',verifyToken,hasRole(1), adminController.Admin_GET_TEMPLATE)
router.put('/template/update/:id',verifyToken,hasRole(1), adminController.Admin_PUT_TEMPLATE)

router.get('/autocomplete/',verifyToken,hasRole(1), adminController.Admin_GET_AUTOCOMPLETE)
router.put('/autocomplete/update/:id',verifyToken,hasRole(1), adminController.Admin_PUT_AUTOCOMPLETE)

router.get('/list-user/',verifyToken,hasRole(1), adminController.Admin_GET_LIST_USER)
router.post('/list-user/',verifyToken,hasRole(1), adminController.Admin_POST_LIST_USER)
router.delete('/list-user/delete/:id',verifyToken,hasRole(1), adminController.Admin_DELETE_LIST_USER)
router.delete('/list-user/user/delete/:id',verifyToken,hasRole(1), adminController.Admin_DELETE_CREATE_BY_USER)

module.exports = router;

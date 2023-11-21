const express = require('express');
const router = express.Router();
const chuongcontroller = require('../controllers/chuongController');
const {verifyToken, hasRole} = require('../middleware/auth.middleware');
router.get('/',chuongcontroller.ChuongVaTatCaNoiDung)
// router.post('/',chuongcontroller.ThemChuong);
router.get('/hi',verifyToken,hasRole(1),chuongcontroller.index);
module.exports = router;

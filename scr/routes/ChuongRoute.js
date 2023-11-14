const express = require('express');
const router = express.Router();
const chuongcontroller = require('../controllers/chuongController');

router.get('/',chuongcontroller.ChuongVaTatCaNoiDung)
// router.post('/',chuongcontroller.ThemChuong);
module.exports = router;

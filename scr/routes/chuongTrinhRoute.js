const express = require('express');
const router = express.Router();
const {verifyToken, hasRole} = require('../middleware/auth.middleware');
const chuongtrinh = require('../controllers/chuongTrinhController');

router.get('/',verifyToken,hasRole(1),chuongtrinh.ChuongTrinh_GET);
router.get('/hung',chuongtrinh.ChuongTrinh_TEST);
module.exports = router;
const express = require('express');
const HocPhanController = require('../controllers/HocPhanController');
const {verifyToken} = require('../middleware/auth.middleware');
const router = express.Router();
router.get('/', HocPhanController.HocPhanGet);
router.post('/',verifyToken,HocPhanController.HocPhanPostSave);
router.put('/:maMon',HocPhanController.HocPhanPut);
router.delete('/:maMon',HocPhanController.HocPhanDelete);
module.exports = router;
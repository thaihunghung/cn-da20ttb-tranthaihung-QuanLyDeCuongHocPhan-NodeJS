const express = require('express');
const router = express.Router();
const {verifyToken, hasRole }  = require('../middleware/auth.middleware');
const logincontroller = require('../controllers/loginController'); // Adjust the path as needed
router.get('/', logincontroller.login_get);
router.post('/', logincontroller.login_post);
router.get('/test', verifyToken, (req, res) => {
    res.json({hi:'hi'});
});
module.exports = router;
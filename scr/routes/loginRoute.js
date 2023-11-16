const express = require('express');
const router = express.Router();
const logincontroller = require('../controllers/loginController'); // Adjust the path as needed

router.get('/', logincontroller.login_get);
router.post('/', logincontroller.login_post);
router.get('/test', logincontroller.verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route'});
});
module.exports = router;
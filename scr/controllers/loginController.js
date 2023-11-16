const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const NguoiDung = require('../models/NguoiDung.model');
exports.login_get = (req, res, next) => {
    res.render('login/login');
}
exports.login_post = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    NguoiDung.findOne({ 
        username: username,
        password: password
    })
    .then((data) => {
        if(data) {
           var token = jwt.sign({
            username: data.username,
            role: data.role
           }, process.env.TOKEN_SECRET_KEY)
            return  res.json({ 
                token
             });
        } else {
            return res.json('that bai')
        }   
    })
    .catch((err) => {
        res.status(500).json('khong tim thay');
    })
    
}

exports.home_get = (req, res) => {
    res.render('home', { user: req.user }); // Pass user information to the view
  };

  exports.verifyToken = (req, res, next) => {
    if (req.headers && req.headers["authorization"]) {
        const token = req.headers && req.headers["authorization"].split(' ')[1];
        console.log(token);

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            console.log(decoded);

            // Additional verification logic can be added here
            // const user = await User.findById(decoded.userId);

            // if (!user) {
            //     return res.json({
            //         success: false,
            //         message: 'Unauthorized access!'
            //     });
            // }

            // req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.json({
                success: false,
                message: 'Failed to authenticate token'
            });
        }
    } else {
        res.json({
            success: false,
            message: 'Unauthorized access!'
        });
    }
};
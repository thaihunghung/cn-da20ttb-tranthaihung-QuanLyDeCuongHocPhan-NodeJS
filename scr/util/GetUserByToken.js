const jwt = require('jsonwebtoken');

function getUserByToken(req, res){
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'Token không tồn tại' });
    }
  // Giải mã token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
        req.decoded = decoded;
    });
    const username = req.decoded.username;
    
}
module.exports = getUserByToken;
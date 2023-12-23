const jwt = require('jsonwebtoken');
const User = require('../models/NguoiDung/NguoiDung.model');

function verifyToken(req, res, next)  {
  // Lấy token cookie
  const token = req.cookies.token;
  if (!token) {
      
      return res.redirect('/login');
  }

  // Giải mã token
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.redirect('/login');
      }
      req.decoded = decoded;
      next();
  });
}
function hasRole(requiredRoles) {
  return (req, res, next) => {
    const userRole = req.decoded.role;

  // Check if the user has the required role
  if (userRole === requiredRoles) {
      next(); 
  } else {
      res.status(403).json({ message: 'Access forbidden for this role' });
  }
  };
}
module.exports = { verifyToken, hasRole };
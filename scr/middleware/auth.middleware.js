const jwt = require('jsonwebtoken');
const User = require('../models/NguoiDung/NguoiDung.model'); // Adjust the path accordingly

function verifyToken(req, res, next)  {
  // Lấy token từ header, query parameter hoặc cookie
  const token = req.cookies.token;
  if (!token) {
      return res.status(403).json({ message: 'Token không tồn tại' });
  }

  // Giải mã token
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Token không hợp lệ' });
      }

      // Lưu thông tin người dùng được giải mã từ token vào request để sử dụng ở các middleware khác
      req.decoded = decoded;
      next();
  });
};
function hasRole(requiredRoles) {
  return (req, res, next) => {
    const userRole = req.decoded.role;

  // Check if the user has the required role
  if (userRole === requiredRoles) {
      next(); // User has the required role, proceed to the next middleware or route handler
  } else {
      res.status(403).json({ message: 'Access forbidden for this role' });
  }
  };
}
module.exports = { verifyToken, hasRole };
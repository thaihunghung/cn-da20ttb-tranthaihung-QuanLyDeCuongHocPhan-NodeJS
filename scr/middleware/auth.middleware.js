const jwt = require('jsonwebtoken');
const User = require('../models/NguoiDung.model'); // Adjust the path accordingly

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    const token = authorizationHeader.split(' ')[1];
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    try {
      const user = await User.findOne({ username: decoded.username });

      if (!user) {
        return res.status(403).json({ message: 'Token is not associated with a valid user' });
      }

      // Attach the user object (including roles) to the request
      req.user = user;

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

function hasRole(requiredRoles) {
  return (req, res, next) => {
    const userRoles = req.user.roles;

    // Check if the user has any of the required roles
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

    if (hasRequiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
  };
}

module.exports = { verifyToken, hasRole };
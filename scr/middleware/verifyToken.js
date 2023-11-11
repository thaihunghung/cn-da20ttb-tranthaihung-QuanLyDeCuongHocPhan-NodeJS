const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token is not valid
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid, and decoded contains the payload
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
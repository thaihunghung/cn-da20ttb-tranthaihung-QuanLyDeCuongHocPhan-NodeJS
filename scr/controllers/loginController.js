
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).lean();

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If the credentials are correct, generate and send back a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login_get = (req, res) => {
    res.render('login');
}
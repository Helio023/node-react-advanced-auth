const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.login = (req, res) => {
  res.send('Login');
};
exports.forgetPassword = (req, res) => {
  res.send('forgetPassword');
};
exports.resetPassword = (req, res) => {
  res.send('resetPassword');
};

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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid credentials');
    }

    res.status(200).json({
      status: 'success',
      token: 'jhdfgkjlkjdfg',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.forgetPassword = (req, res) => {
  res.send('forgetPassword');
};
exports.resetPassword = (req, res) => {
  res.send('resetPassword');
};

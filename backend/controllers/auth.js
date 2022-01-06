const User = require('../models/user');
const ErrorResponse = require('./../utils/errorResponde');

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
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return next(new ErrorResponse('Invalid credentials', 400));
    }

    res.status(200).json({
      status: 'success',
      token: 'jhdfgkjlkjdfg',
    });
  } catch (error) {
    next(error);
  }
  
};

exports.forgetPassword = (req, res) => {
  res.send('forgetPassword');
};
exports.resetPassword = (req, res) => {
  res.send('resetPassword');
};

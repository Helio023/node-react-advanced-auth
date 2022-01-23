const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const User = require('../models/user');
const ErrorResponse = require('./../utils/errorResponde');
const sendEmail = require('../utils/sendEmail');

const createToken = (user, statusCode, res) => {
  const token = user.signToken();

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

exports.register = async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
    });

    createToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 401));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    createToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('You are not logged in!', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('No user found', 404));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.message);
  }
};

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorResponse('Please provide the email', 403));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('No user with this email', 404));
    }

    const resetToken = user.getResetToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5000/api/auth/passwordreset/${resetToken}`;

    console.log(resetUrl);
    try {

      res.status(200).json({
        status: 'success',
        link: resetUrl,
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

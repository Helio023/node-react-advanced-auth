exports.private = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: "You've got access to this private route",
  });

  next()
};

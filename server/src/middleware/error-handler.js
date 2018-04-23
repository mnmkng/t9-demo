const DEFAULT_MESSAGE = "Unexpected server error.";

module.exports = function errorHandler (err, req, res, next) {
  const {status, message} = err;
  if (status) {
    res.status(status).json({
      status,
      message: message || DEFAULT_MESSAGE
    })
  } else {
    res.status(500).json({
      status: 500,
      message: DEFAULT_MESSAGE
    })
  }
};
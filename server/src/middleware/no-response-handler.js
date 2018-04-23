const DEFAULT_MESSAGE = "Not Found";

module.exports = function noResponseHandler(req, res, next) {
  res.status(404).json({
    status: 404,
    message: DEFAULT_MESSAGE
  })
};
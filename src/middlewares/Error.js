const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500,
  err.message = err.message || 'Internal Server Error'

  if (err.message.startsWith('CastError')) err = new ErrorHandler('Resource not found', 400)

  res.status(err.statusCode).json({ success: false, message: err.message })
}
const ErrorHandler = require('../utils/ErrorHandler')

const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

exports.validateDataSend = (req, res, next) => {
  if (!req.body.uuid) return next(new ErrorHandler('UUID is required.'))
  if (!req.body.fromEmail) return next(new ErrorHandler('From email is required.'))
  if (!req.body.toEmail) return next(new ErrorHandler('To email is required.'))
  if (!(regexEmail.test(req.body.fromEmail)) || !(regexEmail.test(req.body.toEmail))) return next(new ErrorHandler('Invalid email.'))
  next()
}
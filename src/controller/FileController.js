const ErrorHandler = require('../utils/ErrorHandler')
const { v4: uuidv4 } = require('uuid')
const File = require('../models/File')
const sendEmail = require('../utils/SendEmail')

exports.uploadFile = async (req, res, next) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      uuid: uuidv4(),
      size: req.file.size
    })
    const newFile = await file.save()
    res.status(201).json({
      success: true,
      message: 'Upload file successfully',
      file_url: `${process.env.APP_BASE_URL}/files/${newFile.uuid}`,
      file: file
    })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.sendFileToEmail = async (req, res, next) => {
  try {
    const file = await File.findOne({ uuid: req.body.uuid })
    if (!file) return next(new ErrorHandler('This file could not be found', 404))
    file.sender = req.body.fromEmail
    file.receiver = req.body.toEmail
    await file.save()
    sendEmail({
      from: req.body.fromEmail,
      to: req.body.toEmail,
      subject: 'File sharing 📁 | TempFiles',
      text: `${req.body.fromEmail} shared a file with you`,
      content: {
        fromEmail: req.body.fromEmail,
        size: parseInt(file.size / 1000) + ' KB',
        expires: '24 hours',
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      }
    })
    res.status(200).json({
      success: true,
      message: `File has shared to ${req.body.toEmail} successfully`,
      file: `${process.env.APP_BASE_URL}/files/${file.uuid}`
    })
  } catch (error) {
    next(new ErrorHandler(error.message))
  }
}

exports.getFileByUUID = async (req, res, next) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid })
    if (!file) return res.render('dowload.ejs', { error: 'This file could not be found.' })
    res.render('dowload.ejs', {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })
  } catch (error) {
    res.render('dowload.ejs', { error: 'Something went wrong.' })
  }
}

exports.downloadFile = async (req, res, next) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid })
    if (!file) return res.render('download', { error: 'This file could not be found.' })
    const filePath = `${__dirname}/../../${file.path}`
    res.download(filePath)
  } catch (error) {
    
  }
}
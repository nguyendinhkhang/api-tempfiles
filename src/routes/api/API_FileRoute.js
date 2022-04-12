const express = require('express')
const router = express.Router()
const MultipartUpload = require('../../middlewares/MultipartUpload')
const { uploadFile, sendFileToEmail } = require('../../controller/FileController')
const { validateDataSend } = require('../../middlewares/ValidatorReq')

router.route('/')
  .post(MultipartUpload, uploadFile)
router.route('/send')
  .post(validateDataSend, sendFileToEmail)

module.exports = router
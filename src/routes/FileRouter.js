const express = require('express')
router = express.Router()
const { getFileByUUID, downloadFile } = require('../controller/FileController')

router.route('/:uuid')
  .get(getFileByUUID)
router.route('/download/:uuid')
  .get(downloadFile)

module.exports = router

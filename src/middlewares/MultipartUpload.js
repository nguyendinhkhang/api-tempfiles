const multer = require('multer')
const path = require('path')

const MultipartUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'files-upload/'),
    filename: (req, file, callback) => {
      const filename = file.originalname.includes(' ')
        ? file.originalname.replace(/ /g, '-')
        : file.originalname
      callback(null, `${path.basename(filename, path.extname(filename))}-${Math.round(Math.random() * 1E9)}-${Date.now()}${path.extname(file.originalname)}`)
    }
  }),
  limits: { fileSize: 1000000 * 100 }
}).single('file')

module.exports = MultipartUpload
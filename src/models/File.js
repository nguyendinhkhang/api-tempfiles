const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new Schema({
  filename: {
    type: String,
    required: [true, 'Filename is required.']
  },
  path: {
    type: String,
    required: [true, 'Path is required.']
  },
  uuid: {
    type: String,
    required: [true, 'Path is required.']
  },
  size: {
    type: Number,
    required: [true, 'Size is required.']
  },
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('File', FileSchema)
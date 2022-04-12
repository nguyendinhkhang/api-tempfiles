const express = require('express')
const app = express()
const path = require('path')
const ErrorMiddleware = require('./middlewares/Error')
const FileRouter = require('./routes/FileRouter')
const API_FileRouter = require('./routes/api/API_FileRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/** Set View Engine */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/** Route */
app.use('/files', FileRouter)

/** API Route */
app.use('/api/files', API_FileRouter)

app.use(ErrorMiddleware)

module.exports = app
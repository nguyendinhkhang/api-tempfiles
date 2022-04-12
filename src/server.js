const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const connectDB = require('./configs/connectDB')
const mongoose = require('mongoose')

connectDB()

const app = require('./app')
const PORT = process.env.PORT || 4000

mongoose.connection.once('open', () => {
  console.log('Connected successfully to MongoDB!')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
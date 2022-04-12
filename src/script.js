const fs = require('fs')
const File = require('./models/File')
const connectDB = require('./configs/connectDB')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

connectDB()

const fetchData = async () => {
  const files = await File.find({ createdAt: { $lt: new Date(Date.now() - process.env.FILE_EXPIRES * 24 * 60 * 60 * 1000) } })
  if (files) {
    for (const file of files) {
      try {
        fs.unlinkSync(`${__dirname}/../${file.path}`)
        console.log(__dirname)
        await file.remove()
        console.log(`Successfully deleted ${file.filename}`)
      } catch (error) {
        console.log(`Error while deleting file ${error}`)
      }
    }
  }
  console.log('Job done!')
}

fetchData().then(process.exit)


const mongoose = require('mongoose')
global.database = mongoose

module.exports = () => {
  const connectionString = process.env.DB_URL
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    dbName: process.env.DB_NAME
  }

  return global.database.connect(connectionString, opts)
}

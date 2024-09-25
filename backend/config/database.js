const mongoose = require('mongoose')

module.exports = () => {
  const mongoURI = process.env.DB_URI;
  const options = {};

  // Connect to MongoDB
  mongoose.connect(mongoURI, options)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

  module.exports = mongoose;
}

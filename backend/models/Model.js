const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: String,
  fileUrl: String, // Cloudinary URL
});

module.exports = mongoose.model('Model', modelSchema);

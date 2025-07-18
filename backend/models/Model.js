const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: String,
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Model', modelSchema);

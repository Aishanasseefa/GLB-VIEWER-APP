const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Model = require('../models/Model');

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const model = new Model({
      name: req.file.originalname,
      fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    });
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all models
router.get('/', async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete model by ID
router.delete('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ message: 'Model not found' });

    // Delete file from uploads folder
    const filePath = path.join(__dirname, '..', 'uploads', path.basename(model.fileUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from MongoDB
    await model.deleteOne();
    res.json({ message: 'Model deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

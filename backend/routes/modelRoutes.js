const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Model = require('../models/Model');
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'glb_models',
    resource_type: 'auto',
    public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/\.[^/.]+$/, ""),
  },
});

const upload = multer({ storage });

// Upload model
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const model = new Model({
      name: req.file.originalname,
      fileUrl: req.file.path,  // Cloudinary URL
    });
    await model.save();
    res.json(model);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all models
router.get('/', async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: 'Fetching models failed' });
  }
});

// Delete model
router.delete('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ error: 'Model not found' });

    // Extract public_id from Cloudinary URL
    const publicId = model.fileUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`glb_models/${publicId}`, { resource_type: 'raw' });

    await model.deleteOne();
    res.json({ message: 'Model deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;

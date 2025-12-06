const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  filesize: {
    type: Number,
  },
  mimetype: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: ['Identification', 'Financial', 'Medical', 'Property', 'Insurance', 'Legal', 'Other'],
    default: 'Other',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Document', documentSchema);

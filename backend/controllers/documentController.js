const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  try {
    const { filename, filepath, filesize, mimetype, tags, category } = req.body;

    if (!filename || !filepath) {
      return res.status(400).json({ message: 'Filename and filepath are required' });
    }

    const document = await Document.create({
      userId: req.user.id,
      filename,
      filepath,
      filesize,
      mimetype,
      tags: tags || [],
      category: category || 'Other',
    });

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const { category, tag } = req.query;
    const filter = { userId: req.user.id };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (tag) {
      filter.tags = tag;
    }

    const documents = await Document.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      documents,
      count: documents.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    let document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    document = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;

    const documents = await Document.find({
      userId: req.user.id,
      $or: [
        { filename: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      documents,
      count: documents.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Document deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

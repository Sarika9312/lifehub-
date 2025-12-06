const Grocery = require('../models/Grocery');

exports.createGrocery = async (req, res) => {
  try {
    const { item, quantity, unit, priority, category } = req.body;

    if (!item || !quantity) {
      return res.status(400).json({ message: 'Item and quantity are required' });
    }

    const grocery = await Grocery.create({
      userId: req.user.id,
      item,
      quantity,
      unit: unit || 'pieces',
      priority: priority || 'Medium',
      category: category || 'Other',
    });

    res.status(201).json({
      success: true,
      grocery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGroceries = async (req, res) => {
  try {
    const { purchased } = req.query;
    const filter = { userId: req.user.id };

    if (purchased !== undefined) {
      filter.purchased = purchased === 'true';
    } else {
      filter.purchased = false;
    }

    const groceries = await Grocery.find(filter).sort({ priority: -1, createdAt: -1 });

    const lowStock = groceries.filter((g) => g.quantity <= 2);

    res.status(200).json({
      success: true,
      groceries,
      lowStock,
      count: groceries.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGroceryById = async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    if (grocery.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      grocery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGrocery = async (req, res) => {
  try {
    let grocery = await Grocery.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    if (grocery.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      grocery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markGroceryPurchased = async (req, res) => {
  try {
    let grocery = await Grocery.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    if (grocery.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    grocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      { purchased: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      grocery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    if (grocery.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Grocery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Grocery item deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Bill = require('../models/Bill');

exports.createBill = async (req, res) => {
  try {
    const { type, amount, dueDate, notes } = req.body;

    if (!type || !amount || !dueDate) {
      return res.status(400).json({ message: 'Type, amount, and dueDate are required' });
    }

    const bill = await Bill.create({
      userId: req.user.id,
      type,
      amount,
      dueDate,
      notes,
    });

    res.status(201).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user.id }).sort({ dueDate: 1 });

    const today = new Date();
    const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const dueSoon = bills.filter(
      (bill) => bill.dueDate >= today && bill.dueDate <= sevenDaysLater && !bill.paid
    );

    const overdue = bills.filter((bill) => bill.dueDate < today && !bill.paid);

    res.status(200).json({
      success: true,
      bills,
      dueSoon,
      overdue,
      totalDue: bills.filter((b) => !b.paid).reduce((sum, b) => sum + b.amount, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBill = async (req, res) => {
  try {
    let bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markBillPaid = async (req, res) => {
  try {
    let bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    bill = await Bill.findByIdAndUpdate(req.params.id, { paid: true }, { new: true });

    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Bill.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Bill deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

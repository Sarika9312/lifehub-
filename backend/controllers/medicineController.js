const Medicine = require('../models/Medicine');

exports.createMedicine = async (req, res) => {
  try {
    const { name, dosage, frequency, dosageTime, startDate, endDate, notes } = req.body;

    if (!name || !dosage || !frequency) {
      return res.status(400).json({ message: 'Name, dosage, and frequency are required' });
    }

    const medicine = await Medicine.create({
      userId: req.user.id,
      name,
      dosage,
      frequency,
      dosageTime,
      startDate: startDate || new Date(),
      endDate,
      notes,
    });

    res.status(201).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user.id }).sort({ startDate: 1 });

    const today = new Date();
    const activeMedicines = medicines.filter(
      (med) => (!med.endDate || med.endDate >= today)
    );

    res.status(200).json({
      success: true,
      medicines: activeMedicines,
      count: activeMedicines.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    let medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Medicine.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Medicine deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

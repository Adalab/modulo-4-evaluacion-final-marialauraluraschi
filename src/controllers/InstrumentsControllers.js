const Instrument = require('../models/instrument.model');
const Family = require('../models/family.model');
const mongoose = require('mongoose');

const getInstruments = async (req, res) => {
  try {
    const result = await Instrument.find().populate('family');
    res.json(result);
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
  }
};

const detailInstrument = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.render('notFound');
  }

  try {
    const instrument = await Instrument.findById(id).populate('family');
    if (!instrument) {
      return res.render('notFound');
    } else {
      return res.render('detailInstrument', { instrument });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      error: error,
    });
  }
};

const filterByFamily = async (req, res) => {
  try {
    const family = await Family.findOne({ familyName: req.query.family });
    const instruments = await Instrument.find({ family: family._id }).populate(
      'family'
    );
    res.json(instruments);
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
  }
};

const createInstrument = async (req, res) => {
  const result = await Instrument.create(req.body);
  console.log(result);
  res.json({
    success: true,
    doc: result,
  });
};

const updateInstrument = async (req, res) => {
  const newDoc = await Instrument.findOneAndUpdate(
    { _id: req.params.instrumentId },
    { $set: req.body },
    { new: true }
  );
  if (newDoc === null) {
    return res.json({
      success: false,
      message: 'documento no encontrado',
    });
  }
  res.json({
    success: true,
    doc: newDoc,
  });
};

const deleteInstrument = async (req, res) => {
  try {
    const result = await Instrument.deleteOne({ _id: req.params.instrumentId });
    console.log(result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Instrumento no encontrado' });
    }
    res.status(200).json({
      message: 'Instrumento eliminado exitosamente ',
      instrumentId: req.params.instrumentId,
    });
  } catch (error) {
    res.status(501).json({ message: error });
  }
};

module.exports = {
  getInstruments,
  detailInstrument,
  createInstrument,
  updateInstrument,
  deleteInstrument,
  filterByFamily,
};

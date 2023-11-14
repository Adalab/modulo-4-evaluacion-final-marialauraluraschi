const Instrument = require('../models/instrument.model');
const Family = require('../models/family.model');

const getInstruments = async (req, res) => {
  try {
    const result = await Instrument.find();
    res.json(result);
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
  }
};
const filterByFamily = async (req, res) => {
  try {
    const family = await Family.findOne({ name: req.params.family });
    const instruments = await Instrument.find({ family: family._id }).populate(
      'family',
      'name -_id'
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
  createInstrument,
  updateInstrument,
  deleteInstrument,
  filterByFamily,
};

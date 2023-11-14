const Instrument = require('../models/instrument.model');
const Family = require('../models/family.model');

const getFamily = async (req, res) => {
  try {
    const result = await Instrument.find().populate('family');
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: String(error) });
  }
};
module.exports = {
  getFamily,
};

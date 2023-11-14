const Family = require('../models/family.model');

const getFamily = async (req, res) => {
  try {
    const result = await Family.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: String(error) });
  }
};

module.exports = {
  getFamily,
};

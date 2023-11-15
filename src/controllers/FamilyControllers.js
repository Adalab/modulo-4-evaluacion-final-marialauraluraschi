const Family = require('../models/family.model');

const getFamily = async (req, res) => {
  try {
    const result = await Family.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: String(error) });
  }
};

const detailFamily = async (req, res) => {
  const name = req.query.name;

  try {
    const family = await Family.findOne({ familyName: name });
    if (!family) {
      return res.render('notFound');
    } else {
      return res.render('detailFamily', { family });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  getFamily,
  detailFamily,
};

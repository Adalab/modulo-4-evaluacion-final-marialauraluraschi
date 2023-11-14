const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema(
  {
    family: { type: String },
    description: { type: String },
  },

  {
    collection: 'Family',
  }
);
const Family = mongoose.model('Family', familySchema);
module.exports = Family;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema(
  {
    familyName: { type: String },
    familyDesc: { type: String },
  },

  {
    collection: 'Family',
  }
);
const Family = mongoose.model('Family', familySchema);
module.exports = Family;

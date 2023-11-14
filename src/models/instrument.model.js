const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentSchema = new Schema(
  {
    name: { type: String, require: true },
    family: { type: Schema.Types.ObjectId, ref: 'Family' },
    description: { type: String },
    regionOrigin: { type: String },
    pic: { type: String },
    audio: { type: String },
  },

  {
    collection: 'Instrument',
  }
);
const Instrument = mongoose.model('Instrument', instrumentSchema);
module.exports = Instrument;

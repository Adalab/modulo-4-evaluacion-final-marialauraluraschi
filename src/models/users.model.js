const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
  },
  { collection: 'Users' }
);
const User = mongoose.model('Users', usersSchema);
module.exports = User;

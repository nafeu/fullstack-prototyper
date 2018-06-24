const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   lowercase: true,
  //   required: [true, "can't be blank"],
  //   match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  //   index: true
  // },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  role: {
    type: String,
    enum: ['admin', 'roleA', 'roleB', 'roleC'],
    default: 'roleA'
  },
  active: {
    type: Boolean,
    default: true
  },
  requiresReset: {
    type: Boolean,
    default: false
  },
  hash: String
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
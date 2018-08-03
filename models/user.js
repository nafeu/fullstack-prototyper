const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  emailVerified: {
    type: Boolean,
    default: false
  },
  hash: String
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
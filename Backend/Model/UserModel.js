const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Manager', 'Team Lead', 'Employee'],
    default: 'Employee',
  },
}, {
  timestamps: true,
});


const UserCollection = mongoose.model("Users", UserSchema);

module.exports = UserCollection;
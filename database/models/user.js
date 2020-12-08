
const mongoose = require('mongoose')
const { Schema } = mongoose
// create user 
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true })


const User = mongoose.model('user', UserSchema)

module.exports = User
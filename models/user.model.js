import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter the userName'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter the password']
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User

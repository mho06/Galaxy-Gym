const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static login method
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error('Incorrect email');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error('Incorrect password');

  return user;
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, minlength: 3 },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user', required: true }
}, { timestamps: true });

userSchema.methods.setPassword = async function (plainPassword) {
  const saltRounds = 12;
  this.passwordHash = await bcrypt.hash(plainPassword, saltRounds);
};

userSchema.methods.validatePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);

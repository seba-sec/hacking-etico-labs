const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, minlength: 3 },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' }
}, { timestamps: true });

UserSchema.methods.setPassword = async function (plain) {
  const saltRounds = 12;
  this.passwordHash = await bcrypt.hash(plain, saltRounds);
};

UserSchema.methods.validatePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);

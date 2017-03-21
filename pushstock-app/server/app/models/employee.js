const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');


//================================
// User Schema
//================================

const EmployeeSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    required: false
  },
  role: {
    type: String,
    enum: ['Worker', 'Manager', 'Admin'],
    required: false
  },
  resetPasswordToken: { type: String, required: false},
  resetPasswordExpires: { type: Date, required: false}
},
{
  timestamps: true
});

// Pre-save of user to database, hash password if password is modified or new
EmployeeSchema.pre('save', function(next) {
  const user = this,
  SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
EmployeeSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

module.exports = mongoose.model('Employee', EmployeeSchema);

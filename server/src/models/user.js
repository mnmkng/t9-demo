const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function (next) {

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    })
  })

});

userSchema.methods.comparePassword =
  function comparePassword (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
  };

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;



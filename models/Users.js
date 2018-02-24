var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    highscore: Number
  });


  var User = mongoose.model('User', UserSchema);

  module.exports = User;
// var mongoose = require('mongoose');

// // create a schema
// var userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   meta: {
//     age: Number,
//     website: String
//   }
// });

// var User = mongoose.model('User', userSchema);

// // make this available to our other files
// module.exports = User;

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options){
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name
    };
    return returnJson;
  }
});

UserSchema.methods.authenticated = function(password){
  var user = this;
  var isAuthenticated = bcrypt.compareSync(password, user.password);
  return isAuthenticated ? user: false;
};

UserSchema.pre('save', function(next){
  if(!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);

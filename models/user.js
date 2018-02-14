const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//USER SCHEMA
const UserSchema = mongoose.Schema({
  first_name: {
    type:String
  },
  last_name: {
    type:String
  },
  email: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  skills: {
    type:[String],
  },
  eoi:{
    type:[String],
  },
  phone:{
    type:String
  },
  isActive:{
    type:Boolean
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}
module.exports.getUserByEmail = function(email, callback){
  const query = {email:email};
  User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      if(err){
        throw(err)
      }else{
        newUser.password = hash;
        newUser.save(callback);
      }
    });
  });
}

module.exports.updateUser = function(user, callback){
  this.getUserById(user.id, callback);
  .save(callback);
}

module.exports.getAllUsers = function(callback){
  User.find({}, callback);
}

module.exports.getUsersBySkill = function(callback){
  User.find({}, callback);
}

module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err,isMatch)=>{
    if(err){
      throw err;
    }
    callback(null, isMatch);
  });
}

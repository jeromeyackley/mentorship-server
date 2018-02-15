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
  aoi:{
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

module.exports.updateUser = function(id, newUser, callback){
  User.findById(id, (err, user)=>{
    user.skills = newUser.skills;
    user.aoi = newUser.aoi;
    user.first_name = newUser.first_name;
    user.last_name = newUser.last_name;
    user.phone = newUser.phone;
    user.isActive = newUser.isActive;
    user.email = newUser.email;

    user.save(callback);
  });
//   Tank.findById(id, function (err, tank) {
//   if (err) return handleError(err);
//
//   tank.size = 'large';
//   tank.save(function (err, updatedTank) {
//     if (err) return handleError(err);
//     res.send(updatedTank);
//   });
// });
}

module.exports.getAllUsers = function(id,callback){
  const oid = mongoose.Types.ObjectId(id);
  User.find({ _id: { $ne: oid }}, callback);
}

module.exports.getUsersBySkill = function(name,callback){
  User.find({ skills: name }, callback);
}

module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err,isMatch)=>{
    if(err){
      throw err;
    }
    callback(null, isMatch);
  });
}

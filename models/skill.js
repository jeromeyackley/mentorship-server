const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//USER SCHEMA
const SkillSchema = mongoose.Schema({
  name: {
    type:String
  }
});

const Skill = module.exports = mongoose.model('Skill', SkillSchema);

module.exports.getSkillsById = function(id, callback){
  Skill.find({_id: id}, callback);
}
module.exports.addSkill = function(newSkill, callback){
  newSkill.save(callback);
}
module.exports.getAllSkills = function(callback){
  Skill.find({}, callback);
}

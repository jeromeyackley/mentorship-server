const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//USER SCHEMA
const TestimonialSchema = mongoose.Schema({
  receiver_id: {
    type:String
  },
  from: {
    type:String
  },
  text: {
    type:String
  }
});

const Testimonial = module.exports = mongoose.model('Testimonial', TestimonialSchema);

module.exports.getAllTestimonials = function(callback){
  Testimonial.find({}, callback);
}
module.exports.addTestimonial = function(newTestimonial, callback){
  newTestimonial.save(callback);
}
module.exports.getTestimonialsForUser = function(receiver_id, callback){
  Testimonial.find({receiver_id: receiver_id}, callback);
}

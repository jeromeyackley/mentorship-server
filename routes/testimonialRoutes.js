const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonial.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database.js');

// GET ALL TESTIMONIALS
router.route('/')
.get((req,res,next)=>{
  Testimonial.getAllTestimonials((err, testimonials)=>{
    if(err){
      res.json({
        testimonials:[],
        success:false,
        message:'failed to get testimonials'
      });
    }else{
      res.json({
        testimonials:testimonials,
        success:true,
        message:'got testimonials'
      });
    }
  })
});

// ADD TESTIMONIAL
router.route('/')
.post((req,res,next)=>{
  let newTestimonial = new Testimonial({
    receiver_id:req.body.receiver_id,
    from:req.body.from,
    text:req.body.text
  });
  Testimonial.addTestimonial(newTestimonial, (err, result)=>{
    if(err){
      res.json({
        success:false,
        message:'failed to add a testimonial'
      });
    }else{
      res.json({
        success:true,
        message:'testimonial added'
      });
    }
  });
});

// GET TESTIMONIALS FOR USER
router.route('/for_user/:id')
.get((req,res,next)=>{
  console.log(req);
  let receiver_id = req.params.id;
  Testimonial.getTestimonialsForUser(receiver_id, (err, testimonials)=>{
    if(err){
      res.json({
        testimonials: [],
        success:false,
        message:'failed to get testimonials'
      });
    }else{
      res.json({
        testimonials: testimonials,
        success:true,
        message:'got testimonials'
      });
    }
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Skill = require('../models/skill.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database.js');

//GET ALL SKILLS
router.route('/')
.get((req,res,next)=>{
  Skill.getAllSkills((err, skills)=>{
    if(err){
      res.json({
        skills:[],
        success:false,
        message:'failed to get skills'
      });
    }else{
      res.json({
        skills:skills,
        success:true,
        message:'got skills'
      });
    }
  })
});

//GET ALL USERS BY SKILL
router.route(':id/users')
  .get(passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    User.getUsersBySkill((err, users)=>{
      if(err){
        res.json({
          users:[],
          success:false,
          message:'failed to get users'
        });
      }else{
        res.json({
          users:users,
          success:true,
          message:'got users'
        });
      }
    })
  });

// ADD SKILL
router.route('/')
.post((req,res,next)=>{
  let newSkill = new Skill({
    name:req.body.name
  });
  Skill.addSkill(newSkill, (err, result)=>{
    if(err){
      res.json({
        success:false,
        message:'failed to add skill'
      });
    }else{
      res.json({
        success:true,
        message:'skill added'
      });
    }
  });
});

module.exports = router;

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

// ADD SKILL
router.route('/add')
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
        message:'skill added',
        skill:result
      });
    }
  });
});


//GET SKILLS BY USER ID
router.route('/')
.post((req,res,next)=>{
  const list = req.body.id_list;
  Skill.getSkillsbyId(list,(err, skills)=>{
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


module.exports = router;

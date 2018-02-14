const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database.js');

//REGISTER
router.route('/register')
.post((req,res,next)=>{
  let newUser = new User({
    first_name:req.body.firstName,
    last_name:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone,
    skills:[],
    eoi:[],
    isActive:true
  });
  User.addUser(newUser, (err, user)=>{
    if(err){
      res.json({
        success:false,
        message:'failed to register user'
      });
    }else{
      res.json({
        success:true,
        message:'user registered',
        user:{
          email:req.body.email,
          password:req.body.password
        }
      });
    }
  });
});

//AUTHENTICATE
router.route('/auth')
.post((req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log('posted login: ' + email);
  User.getUserByEmail(email, (err, user)=>{
    if(err){
      throw err;
    }
    if(!user){
      return res.json({success:false, message:'user not found'})
    }
    console.log(user._id);
    User.comparePassword(password, user.password, (err, isMatch)=>{
      if(err){
        throw err;
      }
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret,
          {
            expiresIn: 604800 // one week
          });

          res.json(
            {
              success:true,
              token: 'JWT ' + token,
              user:{
                id:user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                isActive: user.isActive,
                skills: user.skills,
                eoi: user.eoi
              }
            });
      }else{
        res.json({success:false, message:'wrong password'});
      }
    });
  });
});

//GET ALL USERS
router.route('/')
.get(passport.authenticate('jwt', {session:false}),(req,res,next)=>{
  User.getAllUsers((err, users)=>{
    if(err){
      res.json({
        users:[],
        success:false,
        message:'400 - failed to get users'
      });
    }else{
      res.json({
        users:users,
        success:true,
        message:'200 - got users'
      });
    }
  })
});

//GET USER
router.route('/:id')
.get(passport.authenticate('jwt', {session:false}),(req,res,next)=>{
  User.getUserById(req.params.id, (err, user)=>{
    if(err){
      res.json({
        user:{},
        success:false,
        message:'400 - failed to get a user'
      });
    }else{
      res.json({
        user:user,
        success:true,
        message:'200 - got a user, lucky you'
      });
    }
  })
});

//TODO: This update doesn't work.
//UPDATE USER
router.route('/:id')
  .put(passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    let updateUser = new User({
      first_name:req.body.firstName,
      last_name:req.body.lastName,
      email:req.body.email,
      phone:req.body.phone,
      skills:req.body.skills,
      eoi:req.body.eoi,
      isActive:req.body.isActive,
      _id:req.params.id
    });
    User.getUserById(req.params.id, (err, user)=>{
      user
      User.updateUser(updateUser, (err, user)=>{
        if(err){
          res.json({
            success:false,
            message:'failed to register user'
          });
        }else{
          res.json({
            success:true,
            message:'user registered',
            user:{
              email:req.body.email,
              password:req.body.password
            }
          });
        }
      });
    })
  });

module.exports = router;

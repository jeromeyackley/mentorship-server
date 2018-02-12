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
    password:req.body.password
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
        message:'user registered'
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
                email: user.email
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
.post(passport.authenticate('jwt', {session:false}),(req,res,next)=>{
  const id = req.body.id;
  console.log('posted: ' + id);
  User.getAllUsers(id, (err, users)=>{
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

module.exports = router;

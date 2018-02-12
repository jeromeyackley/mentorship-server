const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.js');
const config = require('../config/database');

module.exports = function(passport){
  let options = {};
  options.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt");
  options.secretOrKey = config.secret;
  passport.use(new jwtStrategy(options, (jwt_payload, done)=>{
    User.getUserById(jwt_payload.data._id, (err, user)=>{
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      }else{
        return done(null, false);
      }
    });
  }));

}

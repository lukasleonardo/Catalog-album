const User = require('../user/user.service')
var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = function(passport){
  passport.serializeUser((user,done)=>{
    done(null,user.username)
  });
  
  passport.deserializeUser((username,done)=>{
    try {
      const user = User.findOneUser({ username: username })
      return done(null,user)
    } catch (err) {
      console.log(err)
      return done(err,user)
    }
  });
}


passport.use(new LocalStrategy({
  usernameField:'username',
  passwordField:'password'
},
  function(username, password, done) {
    User.findOneUser({ username: username }, function (err, user) {
      try{
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)){
          return done(null,false)
        }
        return done(null,user)
      }catch(err){
        console.log(err)
        return done(err,false)
      }
    });
  }

));

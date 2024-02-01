const User = require('../user/user.service')
var passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const userService = require('../user/user.service');

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


passport.use(new BasicStrategy({
  usernameField:'username',
  passwordField:'password'
},
  async function(username, password, done) {  
      try{
        const user = await userService.findOneUser(username)
        if (!user) { return done(null, false,{message:'usuario não encontrado'}); }
        if (!bcrypt.compareSync(password, user.password)){
          return done(null,false,{message:'Senah incorreta'})
        }
        return done(null,user)
      }catch(err){
        console.log(err)
        return done(err,false)
      }
    
  }

))

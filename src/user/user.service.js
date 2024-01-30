const User = require('../model/user')
var passport = require('passport')
class userService{

  createUser(user){
   const newUser = User.create(user)
    return newUser 
  }


  getUsers(){
    const users = User.find()
    return users
  }
  

  findOneUser(username){
    const newUser = User.findOne({username:username})
    return newUser 
  }

  updateUser(id,update){
    const uptUser = User.findByIdAndUpdate(id, update)
    return uptUser
  }

  deleteUser(id){
    return User.findByIdAndDelete(id)
  }

  login(username,password){
    passport.authenticate('local', { failureRedirect: '/login' })
  }
}

module.exports = new userService()

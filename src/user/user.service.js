const User = require('../model/user')

class userService{
  async getUsers(){
    const users = await User.find()
    return users
  }
  
  async createUser(user){
    const newUser = await User.create(user)
    return newUser 
  }

  async findOneUser(username){
    const newUser = await User.find({username:username})
    return newUser 
  }

  async login(username,password){
    passport.authenticate('local', { failureRedirect: '/login' })
  }
}

module.exports = new userService()

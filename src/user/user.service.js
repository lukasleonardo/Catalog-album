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
}

module.exports = new userService()

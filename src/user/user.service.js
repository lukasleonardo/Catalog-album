const User = require('../model/user')
var passport = require('passport')
const bcrypt = require('bcrypt');
class userService{

  createUser(user){
    const {name,password,username,email} = user
    const saltRounds = 10
    const createUser = {
      name:name,
      password: bcrypt.hashSync(password,saltRounds),
      username:username,
      email:email
    }
    const newUser = User.create(createUser)
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

  async login(username,password){
    const user = await User.findOne({username:username})
    const res = await this.verify(password, user)
    return res
}


  verify(password,user) {
    if (!user) { return false;}
    if (!bcrypt.compareSync(password, user.password)){
      console.log("falha ao logar")
    return  false}
    return user
  }





}
module.exports = new userService()

const {Schema, model, models} = require('mongoose')

const UserSchema = new Schema({
  name:{
    type:String,
    required:[true, 'name is required']
  },
  username:{
    type: String,
    unique:[true, 'Username already in use!'],
    required:[true,'Username is required!'],
    match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters"]
  },
  password:{
    type: String,
    required:[true,'Password is required!'],
    match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Password invalid, it should contain 8-20 alphanumeric letters"]
  },

})
const User = models.User || model('User', UserSchema);

module.exports = User 
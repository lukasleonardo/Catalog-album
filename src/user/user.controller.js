const router = require('express').Router()
const userService = require('./user.service')
const {notFoundException, duplicateKeyException} = require('../utils/httpError')

//get all
router.get('/',async (req,res)=>{
  const users = await userService.getUsers()
  if(users.length == 0){res.send('No users found!')}
  res.send(users)
})
//getbyUsername
router.get('/:username',async ( req,res)=>{
  const username = req.params.username
  const user = await userService.findOneUser(username)
  if(!user){
    const erro = new notFoundException('User not found!') 
    res.status(erro.code).send(erro.message)
  }
  res.send(user)
})

//create
router.post('/',async (req,res)=>{
  const username = req.params.username
  const user = await userService.findOneUser(username)
  if(user){
    const erro = new duplicateKeyException('User already exists!') 
    res.status(erro.code).send(erro.message)
  }
  const userDto ={
    name:req.body.name,
    username:req.body.username,
    password:req.body.password,
    email:req.body.email
  }
  res.send(await userService.createUser(userDto))
})

// update
router.put('/:username', async (req,res)=>{
  const username = req.params.username
  const user = await userService.findOneUser(username)
  if(user){
    const userDto ={
      name:req.body.name,
      username:req.body.username,
      password:req.body.password,
      email:req.body.email
    }
    const result = await userService.updateUser(user.id, userDto)
    res.send(result)
  }
  const erro = new notFoundException('User not found!') 
  res.status(erro.code).send(erro.message)
});
// delete
router.delete('/:username', async (req,res)=>{
  const username = req.params.username
  const user = await userService.findOneUser(username)
  if(user){
    res.send(await userService.deleteUser(user.id))
  }
  const erro = new notFoundException('User not found!') 
  res.status(erro.code).send(erro.message)
});

module.exports = router
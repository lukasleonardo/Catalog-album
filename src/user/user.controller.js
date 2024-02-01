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
  const user = await userService.findOneUser(req.params.username)
  if(!user){
    const erro = new notFoundException('User not found!') 
    res.status(erro.code).send(erro.message)
  }
  res.send(user)
})

//create
router.post('/',async (req,res)=>{
  const user = await userService.findOneUser(req.body.username)
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
  const user = await userService.findOneUser(req.params.username)
  if(!user){
    const erro = new notFoundException('User not found!') 
    res.status(erro.code).send(erro.message)
  }
  res.send(await userService.updateUser(user.id, req.body))
});
// delete
router.delete('/:username', async (req,res)=>{
  const user = await userService.findOneUser(req.params.username)
  if(!user){
    const erro = new notFoundException('User not found!') 
    res.status(erro.code).send(erro.message)
  }
  res.send(await userService.deleteUser(user.id))
});


// router.post('/login',async(req,res)=>{
//   const username = req.body.username
//   const password = req.body.password
//   const result = await userService.login(username,password)
//   res.send(result)
// })
module.exports = router
const express = 'express'
const router = express.Router()
const User = require('../model/user')
const userService = require('./user.service')

router.get('/users',(req,res)=>{
  userService.getUsers()
})

router.post('/users',(req,res)=>{
  userService.createUser(req.body)
})

module.exports = router
const router = require('express').Router()
const User = require('../model/user')
const userService = require('./user.service')

router.get('/',(req,res)=>{
  userService.getUsers()
})

router.post('/',(req,res)=>{
  userService.createUser(req.body)
})

router.post('/', 
  function(req, res) {
    res.redirect('/');
  });

module.exports = router
const router = require('express').Router()
const userService = require('../user/user.service')
const { forbiddenException } = require('../utils/httpError')


router.post('/',async (req,res)=>{
  const username = req.body.username
  const password = req.body.password
  const result = await userService.login(username,password)
  if(result == false){
    const erro = new forbiddenException('Failed to authenticate')
    res.status(erro.code).send(erro.message)
  }
  res.send(result)
})



module.exports = router
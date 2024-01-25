const express = 'express'
const router = express.Router()
const connection = require('../database/database')


router.get('/albums',(req,res)=>{
})
router.post('/album')
router.delete('/album/:id')
router.get('/album/:name',(req,res)=>{

})
router.put('/album/:name',(req,res)=>{

})

module.exports = router
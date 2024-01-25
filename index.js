require('dotenv').config() 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const connectDatabase = require('./src/database/database')

//body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//


//home
app.get('/', (req,res)=>{
  res.send('oi')
})

app.listen(PORT, ()=>{
  console.log('servidor rodando na porta: '+ PORT)
})
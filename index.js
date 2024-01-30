//environment variables
require('dotenv').config() 
//express initialization
const express = require('express')
const app = express()
//routers
const albumRouter = require('./src/album/album.controller')
const userRouter = require('./src/user/user.controller')
//mongodb connection
const connectDatabase = require('./src/database/database')
//strategy e session
var passport = require('passport')
var session = require('express-session');
require('./src/auth/local_strategy')(passport)

//body parser to deal with json
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//auth middleware
function authMiddleware(req,res,next){
  if(req.isAuthenticated()){return next()}
  res.send('falha na autenticação')

}

//session definition
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //5min session
  cookie: { maxAge:300000 ,secure: true }
}));
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/user',authMiddleware,userRouter)
app.use('/album',authMiddleware,albumRouter)

//home
app.get('/', (req,res)=>{
  res.send('oi')
})

app.listen(process.env.PORT, ()=>{
  console.log('servidor rodando na porta: '+ process.env.PORT)
})
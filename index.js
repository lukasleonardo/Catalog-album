//environment variables
require('dotenv').config()

//express initialization
const express = require('express')
const app = express()
//routers
const albumRouter = require('./src/album/album.controller')
const userRouter = require('./src/user/user.controller')
const authRouter = require('./src/auth/auth.controller')
//error lib
const erro = require('./src/utils/httpError') 
//mongodb connection
const connectDatabase = require('./src/database/database')
//strategy e session
var passport = require('passport')
var session = require('express-session');
require('./src/auth/basic_strategy')(passport)
//body parser to deal with json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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
//auth middleware
const basicMiddleware = passport.authenticate('basic',{session:false})
//routes
app.use('/login',authRouter)
app.use('/user',basicMiddleware,userRouter)
app.use('/album',basicMiddleware,albumRouter)



app.listen(process.env.PORT, ()=>{
  console.log('servidor rodando na porta: '+ process.env.PORT)
})
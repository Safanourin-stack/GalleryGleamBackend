require('dotenv').config()
const router = require('./Routes/routing')
const express = require('express')
const cors = require('cors')
//importing dbconnection
require('./DBcollection/dbcon')
 
const jwtMiddle = require('./Middlewares/jwtMiddleware')

const app =express()

app.use(cors())//for security purpose
//configuring json middleware
app.use(express.json())
// app.use(jwtMiddle)
app.use(router)

app.use('/Uploads',express.static('./Uploads'))

const PORT = 3000

app.listen(PORT,()=>{
  console.log('server started at '+PORT);
  
})

app.get('/',(req,res)=>{
   res.status(200).send('<h1>HELLO</h2>')
 
  
})
const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
exports.register=async(req,res)=>{
 
 const {username,password,email} = req.body
 console.log(username,password,email)
 const existingUser =await  users.findOne({email})
 try{
  if(!existingUser){
   
    const newUser = new users({
      username,password,email
    })
    await newUser.save()
    res.status(200).json(newUser)
   }
   else{
    res.status(404).json("User Already Exist")
   }
 }
 catch(err){
  res.status(404).json(err)
 }
   
  

}



exports.login=async(req,res)=>{
 
  const {email,password}=req.body
  console.log(email,password);
const  existingUser =await users.findOne({email,password})
try{ if(existingUser)
  {  
    const token =jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
    res.status(200).json({token,username:existingUser.username})
  }
  else{
    res.status(404).json("login failed...invalid email / password!!")
  }}
  catch(err){
     res.status(404).json(err)
  }
 
 
}
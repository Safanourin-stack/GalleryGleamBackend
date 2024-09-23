const mongoose = require('mongoose')

const connstring =process.env.DATABASE

const connection = mongoose.connect(connstring)


connection.then(()=>{
  console.log("Server connected to mongodb");
  
}).catch((err)=>{
   console.log(err);
   
})


const multer = require("multer")


const storage = multer.diskStorage({

  destination:(req,file,callback)=>{
       callback(null,'./Uploads')
  },
  filename:(req,file,callback)=>{
    const filename =`Image-${Date.now()}-${file.originalname}`
    callback(null,filename)
  }
})

const fileFilter =(req,file,callback)=>{

  if(file.mimetype === 'image/jpg' || file.mimetype==="image/jpeg" || file.mimetype ==="image/png")
  {
    callback(null,true)
  }
  else
  {
    callback(null,false)
    return callback(new Error("please upload file with following extensions - jpg ,jpeg,png - only"))
  }
}

const multerconfig =multer({
  storage,fileFilter
})

module.exports =multerconfig
const express = require('express')
const userLogin = require('../Controllers/userLoginController')
const newPhoto = require('../Controllers/photoController')
const route = express.Router()
const jwtMiddle=require('../Middlewares/jwtMiddleware')
const multerMiddle = require('../Middlewares/multerMiddleware')


route.post('/reg',userLogin.register)
route.post("/log",userLogin.login)
route.post("/dis",jwtMiddle,multerMiddle.single('ImageUrl'),newPhoto.addPhoto)
route.get("/dis",jwtMiddle,newPhoto.getuserPhoto)
route.get("/fav",newPhoto.getAllphotos)
route.delete("/dis/:id",jwtMiddle,newPhoto.deletephoto)
route.put("/updatephoto/:id",jwtMiddle,multerMiddle.single('ImageUrl'),newPhoto.editPhoto)

module.exports = route
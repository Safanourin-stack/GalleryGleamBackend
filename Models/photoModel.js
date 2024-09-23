const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  ImageUrl: {  
    type: String,
    required: true
   
  }
});


const photos = mongoose.model('photos', photoSchema);

module.exports = photos;

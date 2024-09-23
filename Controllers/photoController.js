const photos = require('../Models/photoModel');

exports.addPhoto = async (req, res) => {
  const { title } = req.body;
  const ImageUrl = req.file.filename; // Extract the uploaded file from req.file
  const userId = req.payload; // Ensure this is correctly set in your JWT middleware
  console.log(title, ImageUrl);

  

  try {
    const existingPhoto = await photos.findOne({title});

    if (existingPhoto) {
       res.status(406).json("Photo already exists");
    } else {
      const newPhoto = new photos({
        title,
        ImageUrl, // Use filename for ImageUrl since it's stored locally
        userId
      });

      await newPhoto.save();
       res.status(201).json(newPhoto);
    }
  } catch (err) {
    console.log(err);
     res.status(400).json(err);
  }
};

exports.getuserPhoto=async(req,res)=>{

  const userId=req.payload.userId
  
  try{
    const userphoto= await photos.find({userId})
    res.status(200).json(userphoto)
  }
  catch(error){
    res.status(400).json(error)
  }
}

exports.getAllphotos=async(req,res)=>{

  try{


const allphotos = await photos.find()
res.status(200).json(allphotos)
  }
  catch(err)
  {
    res.status(400).json(err)
  }

}

exports.deletephoto=async(req,res)=>{

  const {id} = req.params
  try{const result= await photos.findByIdAndDelete({_id:id})
   res.status(200).json("Photo deleted")
  }
  catch(err)
  {
     console.log(err);
     res.status(400).json(err)
  }
}


exports.editPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const ImageUrl = req.file ? req.file.filename : req.body.ImageUrl; // Handle uploaded file or existing image

    // Ensure both fields are present
    if (!title || !ImageUrl) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const result = await photos.findByIdAndUpdate(
      { _id: id },
      { title, ImageUrl },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};



const uploadFile = async(req,res) => {
  try{
    if(!req.file){
      return res.status(400).json({message: "No file uploaded"});
    }
    res.status(200).json({message: "File uploaded successfully",
      url: req.file.path
    });

  }catch(err){
    res.status(500).json({message: "Error in uploading file", error: err.message});
  }
}
export default uploadFile;
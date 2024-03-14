const Albumpage = require("../models/albums");

exports.main = async (req, res, next) => {
    try {
        console.log("BEFORE")
        //const albums = await Albumpage.find({title: {$regex:".", $options: 'i'}});
       console.log("AFTER")
        //res.json({albums})

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
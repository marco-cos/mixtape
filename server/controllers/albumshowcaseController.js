const Albumpage = require("../models/albums");


exports.main = async (req, res, next) => {
  console.log("INA")

    try {
        const albums = await Albumpage.find({});
        res.json({albums})

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
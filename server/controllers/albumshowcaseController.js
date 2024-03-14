const Albumpage = require("../models/albums");

console.log("in comntroller jka")

exports.main = async (req, res, next) => {
    try {
        const albums = await Albumpage.find({});
        res.json({albums})

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
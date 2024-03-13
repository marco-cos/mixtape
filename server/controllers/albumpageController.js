const Albumpage = require("../models/albums");

exports.Albumpage = async (req, res, next) => {
  try {
    const { query } = req.body;
    const albums = await Albumpage.findOne({"title": {$regex:query, $options: 'i'}});

    res.json({albums});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const User = require("../models/user");
const Album = require("../models/albums");

exports.Search = async (req, res, next) => {
  try {
    const { query } = req.body;
    const users = await User.find({username: {$regex:query, $options: 'i'}});
    const albums = await Album.find({$or: [{ title: { $regex: query, $options: 'i' } }, { artist: { $regex: query, $options: 'i' } } ]});

    res.json({
      users: users,
      albums: albums
    });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

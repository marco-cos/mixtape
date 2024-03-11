const User = require("../models/user");

exports.Search = async (req, res, next) => {
  try {
    const { query } = req.body;
    const users = await User.find({username: {$regex:query, $options: 'i'}});
    res.json(users);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

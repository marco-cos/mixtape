const Albumpage = require("../models/albums");
const Review = require("../models/review");
const User = require("../models/user");

exports.getalbuminf = async (req, res, next) => {
  try {
    const { query } = req.body;
    const albums = await Albumpage.findOne({title: {$regex:query, $options: 'i'}});
    let reviewsArray = [];

    for (let i = 0; i < albums.reviews.length; i++) {
        const reviewID = albums.reviews[i].toString();
        const reviewObj = (await Review.findById(reviewID)).toObject();
        const reviewerID = reviewObj.reviewer.toString();
        const reviewer = await User.findById(reviewerID);
        reviewObj.ID=reviewID;
        reviewObj.reviewer= reviewer.username;
        reviewsArray.push(reviewObj); 
    }
    res.json({albums: albums,
            reviews: reviewsArray
    });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.unlike = async (req, res) => {
  console.log("IN UNLIKE")
  try {
    const { reviewID, userID } = req.body; 
    console.log(reviewID,userID);
    await Review.updateOne({ _id: reviewID },{ $pull: { likes: userID } });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.like = async (req, res) => {
  console.log("IN LIKE")
  try {
    const { reviewID, userID } = req.body; 
    console.log(reviewID,userID);
    await Review.updateOne({ _id: reviewID },{ $push: { likes: userID } });


  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


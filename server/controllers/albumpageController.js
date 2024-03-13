const Albumpage = require("../models/albums");
const Review = require("../models/review");
const User = require("../models/user");

exports.Albumpage = async (req, res, next) => {
  try {
    const { query } = req.body;
    const albums = await Albumpage.findById(query);
    let reviewsArray = [];

    for (let i = 0; i < albums.reviews.length; i++) {
        const reviewID = albums.reviews[i].toString();
        const reviewObj = (await Review.findById(reviewID)).toObject();
        const reviewerID = reviewObj.reviewer.toString();
        const reviewer = await User.findById(reviewerID);
    
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


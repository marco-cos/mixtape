const User = require('../models/user');
const Review = require('../models/review');

module.exports.review = async(req, res) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.Like = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId }});
            res.status(200).json("post liked!");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("post unliked");
        } 
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getUserReviews = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const reviews = await Review.find({ reviewer: user._id });
        res.status(200).json(posts);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}


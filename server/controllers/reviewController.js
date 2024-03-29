const User = require('../models/user');
const Review = require('../models/review');
const Albums = require('../models/albums');

module.exports.createReview = async(req, res) => {
    try{
        const {albumName, rating, content, reviewer,likes, favsong, leastfavsong} = req.body;
        const name = req.body.albumName;
        // const id = req.body.userID;
    
        console.log(name);
        // const existinguser = await User.findOne({})
        const existingalbum = await Albums.findOne({title: {$regex: name, $options: 'i'}});
        // const existingalbum = await Albums.findOne({title: req.body.albumName});
        if (!existingalbum){
            // we only want to review existing albums
            return res.status(500).json({ error: "cannot review an album that does not exist" });
        }
        console.log(existingalbum);
        const newReview = new Review({
            album: existingalbum._id,
            albumName,
            stars: rating,
            content,
            reviewer,
            likes,
            favSong: favsong,
            leastFavSong:leastfavsong,
        });
        console.log(newReview.album);
        existingalbum.reviews.push(newReview._id);

        await existingalbum.save();

        //Fail here
        const savedReview = await newReview.save();

        res.status(200).json(savedReview);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


module.exports.like = async (req, res) => {
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

module.exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name")
            .sort({ creationDate: -1 });
        res.json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getUserReviews = async (req, res) => {
    try {

        console.log("TEST")
        username = req.params.username
        const user = await User.findOne({username});
        const reviews = await Review.find({ reviewer: user._id }).populate('reviewer', '_id name');

        // const album = (await Albums.findById(reviews.album)).toObject();

        var ret = []
        for (let i = 0; i < reviews.length;i++) {
            var ID = reviews[i].album.toString()
            var album = await Albums.findById(ID)
            const reviewandalb = {
                review: reviews[i],
                album: album
            }
            ret[i] = reviewandalb;
        }

        res.status(200).json(ret);
    } 
    catch (error) {
        res.status(500).json({ error: "could not get reviews" });
    }
}

module.exports.comment = async (req, res) => {
    try {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        };

        const updatedReview = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        )
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .exec();

        res.json(updatedReview);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
    
}
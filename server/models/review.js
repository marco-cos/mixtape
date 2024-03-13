const mongoose = require('mongoose')
const {Schema} = mongoose


const reviewSchema = new Schema({
    content: { type: String, default: ''},
    creationDate: {type: Date, default: Date.now},
    // album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
    favSong: String,
    leastFavSong: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    stars: Number,
    albumName: {type: String, ref: 'albumName'},
    rating: {type: String, ref: 'rating'},
    likes: {type: Number, default: 0, ref:'likes'},
    //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    userID: { type: String, ref:'userID', required: true },
    reviewText: { type: String, ref: 'reviewText'}
});
const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
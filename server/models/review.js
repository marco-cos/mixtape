const mongoose = require('mongoose')
const {Schema} = mongoose
const { ReviewReactionModel } = require('./comment.js')

const reviewSchema = new Schema({
    content: { type: String, default: ''},
    creationDate: {type: Date, default: Date.now},
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
    favSong: String,
    leastFavSong: String,
    likes: {
        type: Array, default: []
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    reviewer: { type: String, required: true }
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
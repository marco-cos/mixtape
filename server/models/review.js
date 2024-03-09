const mongoose = require('mongoose')
const {Schema} = mongoose
const { ReviewReactionModel } = require('./reviewReaction.js')

const reviewSchema = new Schema({
    id: Number,
    content: { type: String, default: ''},
    creationDate: {type: Date, default: Date.now},
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
    favSong: String,
    leastFavSong: String,
    // reactions: [ReviewReactionModel]
})

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
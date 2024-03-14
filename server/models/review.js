const mongoose = require('mongoose')
const {Schema} = mongoose


const reviewSchema = new Schema({
    content: { type: String, default: ''},
    creationDate: {type: Date, default: Date.now},
    // album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
    favSong: {type: String, default:''},
    leastFavSong: {type: String, default:''},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default:[],
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    stars: {type: Number, default:5},
    albumName: {type: String, ref: 'albumName', default:''},
    rating: {type: String, ref: 'rating', default:''},
    //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    userID: { type: String, ref:'userID' },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        default:'',
    }
});
const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
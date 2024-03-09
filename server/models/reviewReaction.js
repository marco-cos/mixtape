const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewReactionSchema = new Schema({
    reactor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, default: '', maxLength: 100}
})


const ReviewReactionModel = mongoose.model('reviewReaction', reviewReactionSchema);
module.exports = ReviewReactionModel;
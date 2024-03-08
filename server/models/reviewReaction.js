const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewReactionSchema = new Schema({
    review: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'},
    reactor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, default: '', maxLength: 100}
})


const reviewReactionModel = mongoose.model('reviewReaction', reviewReactionSchema);
module.exports = reviewReactionModel;
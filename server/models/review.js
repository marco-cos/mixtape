const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new Schema({
    id: Number,
    content: { type: String, default: '', maxLength: 200},
    creationDate: {type: Date, default: Date.now},
    reviewer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'}
    
})

const ReviewModel = mongoose.model('Review', reviewSchemaSchema);
module.exports = ReviewModel;
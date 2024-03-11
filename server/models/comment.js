const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, required: true}
});


const CommentModel = mongoose.model('comment', commentSchema);
module.exports = CommentModel;
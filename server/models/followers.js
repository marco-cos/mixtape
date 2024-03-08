const mongoose = require('mongoose')
const {Schema} = mongoose

const followerSchema = new Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const FollowerModel = mongoose.model('Follower', followerSchema);
module.exports = FollowerModel;
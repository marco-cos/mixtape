const mongoose = require('mongoose')
const {Schema} = mongoose

const albumSchema = new Schema({
    title: String,
    artist: String,
    cover: Buffer,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    // follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const AlbumModel = mongoose.model('Album', albumSchema);
module.exports = AlbumModel;
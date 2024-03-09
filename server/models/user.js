const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require("bcryptjs");
const ReviewModel = require('./review.js');
const { FollowerModel } = require('./followers.js').schema;
const { AlbumModel } = require('./albums.js').schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    favArtist : String,
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }], 
    favSong: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 
    // followers: [{ type: Schema.Types.ObjectId, ref: 'Album' }], 

    // following: [FollowerModel],
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
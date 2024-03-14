const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require("bcryptjs");

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
    bio: { 
        type: String,
        default: "Add Bio Here"
    },
    profilePic: {
        type: String
    },
    favArtist: { 
        type: String,
        default: "Add Favorite Artist Here"
    },
    favSong: { 
        type: String,
        default: "Add Favorite Song Here"
    },
    favAlbum: { 
        type: String,
        default: "Add Favorite Album Here"
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }], 

})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
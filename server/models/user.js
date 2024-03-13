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
        default: "I love music"
    },
    profilePic: {
        type: String
    },
    favArtist: { 
        type: String,
        default: "Taylor Swift"
    },
    favSong: { 
        type: String,
        default: " SuperShy by NewJeans"
    },
    favAlbum: { 
        type: String,
        default: "Folklore by Taylor Swift"
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }], 

})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
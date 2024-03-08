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
    }
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
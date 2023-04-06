const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");

const UserSchema = new mongoose.Schema({

    email: String,
    password: String,

})

//register model
const User = mongoose.model("users", UserSchema)


//make model accessible to outside files
module.exports = User;
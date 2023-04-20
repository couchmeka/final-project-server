const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");

const UserSchema = new mongoose.Schema({

    email: { type: String, require: true, lowercase: true, unique: true},
    password: { type: String, require: true },
    id: { type: String , default: uuidv4}


})

//register model
const User = mongoose.model("users", UserSchema)


//make model accessible to outside files
module.exports = User;
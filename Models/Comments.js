const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");

const commentSchema = new mongoose.Schema({

    comment: String,
    createdBy: String

})

//register model
const Comment = mongoose.model("comments", commentSchema)


//make model accessible to outside files
module.exports = Comment;
const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");
const Comment = require("../Models/Comments");

const ticketSchema = new mongoose.Schema({

    title: String,
    text: String,
    author: String,
    categories: [String],
    id: { type: String, default: uuidv4},
    createdAt: { type: Date, default: Date.now},
    comments: {type: Object, default: Comment}
    

})

//register model
const Ticket = mongoose.model("tickets", ticketSchema)


//make model accessible to outside files
module.exports = Ticket;
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


const mongoDB = process.env.ATLAS_URI

// Wait for database to connect, logging an error if there is a problem 



async function mongooseConnect() {
    try {
      await mongoose.connect(mongoDB); 
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = {
      mongooseConnect
  };
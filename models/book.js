const mongoose = require('mongoose');

//SCHEMA
const bookSchema = new mongoose.Schema({
    // structure the keys / properties in our document
    title: String, 
    isBookGood: Boolean,
    author:String
}) 

//Register the Model 
const book = mongoose.model('Book', bookSchema);

//Export the model 
module.exports = book;

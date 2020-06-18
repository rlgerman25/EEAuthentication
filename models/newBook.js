const mongoose = require("mongoose");  

//BOOK SCHEMA SETUP
const  bookCreationSchema = new mongoose.Schema({
	bookName: String,
	bookAuthor: String,
	bookImage: String,
	bookFavoritePart: String
});

const NewBook = mongoose.model("NewBook", bookCreationSchema);

module.exports = NewBook;
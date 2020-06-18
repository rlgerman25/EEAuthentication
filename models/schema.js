const mongoose = require("mongoose");

//Q&A SCHEMA SETUP
const questionsAndAnswersSchema = new mongoose.Schema({
	question: String,
	image: String,
	url: String
});

const QA = mongoose.model("QA", questionsAndAnswersSchema);

//ALUMNI SCHEMA SETUP
const alumniCreationSchema = new mongoose.Schema({
	alumniName: String,
	alumniImage: String,
	alumniDescription: String
});

const Alumn = model("Alumn", alumniCreationSchema);

//BOOK SCHEMA SETUP
const  bookCreationSchema = new mongoose.Schema({
	bookName: String,
	bookAuthor: String,
	bookImage: String,
	bookFavoritePart: String
});

const NewBook = model("NewBook", bookCreationSchema);


//FILE EXPORTS

module.exports = QA; 
module.exports = Alumn;
module.exports = NewBook;


const mongoose = require("mongoose");

const questionsAndAnswersSchema = new mongoose.Schema({
	question: String,
	image: String,
	url: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "commentQA"
		}
	]
});

const QA = mongoose.model("QA", questionsAndAnswersSchema);

module.exports = QA;
const mongoose = require("mongoose");  

//ALUMNI SCHEMA SETUP
const alumniCreationSchema = new mongoose.Schema({
	alumniName: String,
	alumniImage: String,
	alumniDescription: String, 
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CommentAlumn"
		}
	]
});

const Alumn = mongoose.model("Alumn", alumniCreationSchema);

module.exports = Alumn;
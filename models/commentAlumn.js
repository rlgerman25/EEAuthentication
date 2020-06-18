var mongoose = require("mongoose");

var commentAlumnSchema = mongoose.Schema({
    textAlumn: String,
    authorAlumn: String
});

module.exports = mongoose.model("CommentAlumn", commentAlumnSchema);
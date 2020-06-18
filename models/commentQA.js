const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: String,
    author: String
});

const CommentQA = mongoose.model("Commentqa", commentSchema);

module.exports = CommentQA;
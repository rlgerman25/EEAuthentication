const mongoose = require("mongoose");
// Requiring plugin - passport
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})
//Using plugin in the app
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
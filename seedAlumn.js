var mongoose    = require ("mongoose"),
    Alumn       = require("./models/alumn.js"),
    CommentAlumn = require("./models/commentAlumn.js")

    var newAlumns = [
        {
            alumniName: "Harry Potter",
            alumniImage: "https://timedotcom.files.wordpress.com/2014/07/301386_full1.jpg",
            alumniDescription: "I am the main character"
        },
        {
            alumniName: "Hermione Granger",
            alumniImage: "https://i.pinimg.com/originals/69/b7/d9/69b7d94d8b8800a75b966824566f0c81.jpg",
            alumniDescription: "I am arguably the most beautiful woman on earth"
        },
        {
            alumniName: "Ronald Weasley",
            alumniImage: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg",
            alumniDescription: "I am a ginger and famous guy"
        }
    ]

    function seedAlumn() {
        Alumn.deleteMany({}, function(err){
            if(err) {
                console.log(err)
            } else {
                console.log("Removed all alumns :(");
            }
        });
        //Add Alumni
        newAlumns.forEach(function(oneAlumn) {
            Alumn.create(oneAlumn, function(err, createdAlumn) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Added an alumn :)");
                    //Create a comment on each campground
                    CommentAlumn.create(
                        {
                            textAlumn: "I am back B%^&*#",
                            authorAlumn: "Boldemort"
                        }, function(err, commentAlumn) {
                            if(err) {
                                console.log(err)
                            } else {
                            createdAlumn.comments.push(commentAlumn)
                                createdAlumn.save();
                            }
                        }
                    )
                }
            }); 
        });

    }
    
    module.exports = seedAlumn;
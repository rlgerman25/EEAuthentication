const mongoose       = require("mongoose");
const QA             = require("./models/qaSchema.js");
const Commentqa      = require("./models/commentQA.js")

var data = [
        {   question: "Are you friends with Sasquash?",
            image: "https://nu.aeon.co/images/fb911487-7bbe-4752-b655-3c8b0d745801/idea_sized-bigfoot_gimli_patterson.jpg",
            url: "https://nu.aeon.co/images/fb911487-7bbe-4752-b655-3c8b0d745801/idea_sized-bigfoot_gimli_patterson.jpg"
        },
        {   question: "Where you a good boy this year?",
            image: "https://resize.hswstatic.com/w_907/gif/santa-claus-orig.jpg",
            url: "No link needed"
        },
        {   question: "Is the Grinch a big bullshitter?",
            image: "https://cdn.vox-cdn.com/thumbor/6E2RLMtEznao9a7ETgb7wHgRB_0=/0x0:545x409/1200x800/filters:focal(229x161:315x247)/cdn.vox-cdn.com/uploads/chorus_image/image/63593633/film_review___the_grinch_79908628_e1541651135332.0.jpg",
            url: "bla bla bla"
        }
];

function QAseedDB() {
    //Remove all campgrounds
    QA.deleteMany({}, function(err) {
        if(err){
            console.log(err);
        } 
        console.log("removed questions");
        //add new questions
        data.forEach(function(seed) {
            QA.create(seed, function(err, question){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a new question");
                    //Create a comment for each question
                    Commentqa.create(
                        {
                            text: "I saw Sasquash and Santa once",
                            author:  "Manny Machado"
                        }
                    ), function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            QA.comments.push(comment);
                            QA.save();
                            console.log("Created a new comment"); 
                        }
                    }
                }
            });
        });
    });
    
    
    //add some comments
}

module.exports = QAseedDB;

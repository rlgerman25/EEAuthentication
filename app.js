
const	bodyParser 	= require("body-parser"),
		express 	= require("express"),
		mongoose 	= require("mongoose"),
		passport = require("passport"),
    	LocalStrategy = require("passport-local"),
		path 		= require("path"),
		ejs 		= require("ejs"),
		QA			= require("./models/qaSchema.js"), 
		Alumn		= require("./models/alumn.js"),
		NewBook		= require("./models/newBook.js"),
		QAseedDB	= require("./seedsQA"),
		seedAlumn	= require("./seedAlumn"),
		User 		= require("./models/user.js"), 
		seedDB		= require("./seeds");


seedDB()		
//QAseedDB(); 
//seedAlumn();
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/authDB", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I am the master of my faith, I am the captain of my soul",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
 // This next line authenticates the user at login
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PASSING NAVBAR LOGIN MIDDLEWARE GLOBALLY
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// End of passport logic

//Set a folder for styles and js extensions
app.use('/public', express.static('public'));

//EJS EXTENSIONS
app.set("view engine", "ejs");

// "/" => LANDING PAGE
app.get("/", function(req, res){
	//res.sendFile("landingPage.ejs", {root: path.join(__dirname, "./views/")});
	res.render("index");
});

//Q&A ROUTES
app.get("/q&a", function(req, res){
	//Get all questions from DB
	QA.find({}, function(err, allQuestions){
		if(err){
			console.log(err);
		} else {
			res.render("questions_answers.ejs", {allQuestions: allQuestions})
		}
	})
});

app.post("/q&a", function(req, res){
	var question = req.body.question;
	var image = req.body.image;
	var url = req.body.url;
	var newQuestion = {question: question, image: image, url: url}
	QA.create(newQuestion, function(err, newlyCreatedQuestion){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/q&a");
		}
	});	
});

app.get("/q&a/new", isLoggedIn, function(req, res){
	res.render("qanew");
});

app.get("/q&a/:id", function(req, res){
	QA.findById(req.params.id, function(err, foundQuestion){
		if(err) {
			console.log(err);
		} else {
			res.render("qashow", {question: foundQuestion});
		}
	});
});

//END Q&A ROUTES


//ALUMNI CONNECTION ROUTES
app.get("/alumni", function(req, res){
	Alumn.find({}, function(err, allAlumni){
		if(err){
			console.log(err);
		} else {
			res.render("alumni", {alumns: allAlumni});
		}
	});
});

app.post("/alumni", function(req, res){
	var alumniName = req.body.alumniName;
	var alumniImage = req.body.alumniImage;
	var alumniDescription = req.body.alumniDescription;
	var newAlumn = {alumniName:alumniName, alumniImage: alumniImage, alumniDescription: alumniDescription}
	//Create new Alumn
	Alumn.create(newAlumn, function(err, newlyCreated) {
		if(err) {
			console.log(err)
		} else {
			res.redirect("/alumni");
		}
	});
	
});

app.get("/alumni/new", function(req, res){
	res.render("alumninew");
});

app.get("/alumni/:id", function(req, res){
	Alumn.findById(req.params.id, function(err, foundAlumn){
		if(err) {
			console.log(err);
		} else {
			res.render("alumniShow", {alumn: foundAlumn});
		}
	});
});

//END ALUMNI ROUTES

//BOOK SELLING/EXCHANGING ROUTES
app.get("/books", function(req, res){
	NewBook.find({}, function(err, newlyCreatedBook){
		if(err) {
			console.log(err);
		} else {
			res.render("books", { bookList: newlyCreatedBook });
		}
	});
});

app.post("/books", function(req, res){
	var bookName = req.body.bookName;
	var bookAuthor = req.body.bookAuthor;
	var bookImage = req.body.bookImage;
	var bookFavoritePart = req.body.bookFavoritePart;
	var newBook = {bookName: bookName, bookAuthor:bookAuthor, bookImage: bookImage, bookFavoritePart: bookFavoritePart}
	NewBook.create(newBook, function(err, newlyCreatedBook){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/books");
		}
	});
});

app.get("/books/new", function(req, res){
	res.render("bookNew");
});

app.get("/books/:id", function(req, res){
	NewBook.findById(req.params.id, function(err, foundBook){
		if(err) {
			console.log(err);
		} else {
			res.render("bookShow", {book: foundBook});
		}
	});	
});

//END BOOKS ROUTES


//RESOURCES ROUTES - TBD
app.get("/resources", function(req, res){
	res.render("resources");
});

// ===========
// Auth Routes
// ===========

app.get("/register", function(req, res) {
	res.render("register")
})

app.post("/register", function(req, res) {
	// The logic here comes from passport in user.js
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/q&a")
		})

	})
	User.register()
})
// Render login page
app.get("/login", function(req, res) {
	res.render("login");
})
// handling login process - uses passport as middleware 
app.post("/login", passport.authenticate("local", 
	{
		// Success - Redirect here
		successRedirect: "/q&a",
		// Unsuccessful - Redirect there
		failureRedirect: "/login"
	}), function(req, res) {
})

app.get("/logout", function(req, res) {
	req.logOut();
	res.redirect("/q&a");
})

// ==================
// End of Auth Routes
// ==================

// ==================
// Authentication middleware
// ==================
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login')
}


//CATCH ALL ROUTE
app.get("*", function(req, res){
	res.redirect("/")
});

//DO NOT DELETE!
// // "/" => Folklore Timeline
// app.get("/folklore", function(req, res){
// 	res.sendFile("folkloreTimeline.ejs", {root: path.join(__dirname, "./views/")});
// });

console.log("****************");
app.listen(port, () => console.log("Server is runing..."));
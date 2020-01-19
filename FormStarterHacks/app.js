var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 3000;

// connects to local database
mongoose.connect('mongodb://localhost/journal', function(err) { if (err) throw err; console.log('success!'); });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//tells program what model looks like
var NoteSchema = new mongoose.Schema({
	title: String,
	content: String,
	state: String,
});

var Note = mongoose.model("Note", NoteSchema);

//need id
app.post("/removeNote", (req, res) => {
	Note.deleteOne({"_id": req.body.note.id}, (e, res) => {
		if(e) { console.log(e); }
	});
});

//update display after this is called
app.post("/createNote", (req, res) => {

	Note.create({
		title: req.body.note.title,
		content: req.body.note.content,
		state: req.body.note.state,
	}, (e, createdEntry) => {
		if(e) { console.log(e); 
		} else { 
			console.log(createdEntry); 
	}});
});

app.get("/getAllNotes", (req, res) => {
	var result = Note.find({}, (e, foundEntries) => {
		if(e) {
			console.log(e);
		} else {
			console.log(foundEntries);
		}

	});

	res.render('file_name', {entries: result});
});

app.get("/search/:title", (req, res) => {
	// send this findNotesWithTitle(req.params.title);
	var result = Note.find({title: title}, (error, foundEntry) => {
		if(error) {
			console.log(error);
		} else {
			console.log(foundEntry);
		}
	});

	res.render('file_name', {entries: result});
});

app.get("/", (req, res) => {
	res.render("createNote.ejs");
	
});

app.get("/:name", (req, res) => {
	res.send("hello " + req.params.name);
});

app.listen(port, function () {
  console.log("Server Has Started!");
});


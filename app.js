// Importing libraries
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initializing server
var app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/")));
app.listen(port, function() {
    console.log("App listening on PORT: " + port);
});

// Sending HTML pages to user based on URL
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Sending notes from database file
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

// Saving new note to database file
app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', function(err, data) {
        let notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = notes.length + 1;
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), 'utf8', () => {
            res.json(true)
        });
    });
});

// Deleting note from database file based on id
app.delete("/api/notes/:id", function(req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', function(err, data) {
        let notes = JSON.parse(data);
        notes.splice(req.params.id - 1, 1);
        notes.forEach((note, index) => {note.id = index;});
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), 'utf8', () => {
            res.json(true)
        });
    });
});
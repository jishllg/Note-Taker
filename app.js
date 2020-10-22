// Importing libraries
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initializing server
var app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
    // fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', function(error, data) {
    //     if (error) throw error;
    //     res.sendFile(data);
    // });
});

app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', function(err, data) {
        let notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = notes.length() + 1;
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
    });
});

// app.post("/api/notes/:id", function(req, res) {
//     fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', function(err, data) {
//         let notes = JSON.parse(data);
//         let newNote = req.body;
//         newNote.id = notes.length() + 1;
//         notes.push(newNote);
//         fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
//     });
// });
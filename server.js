const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

//var http = require("http");

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        res.json(JSON.parse(jsonString));
    });
});

app.post("/api/notes", function (req, res) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        var notes = JSON.parse(jsonString);

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.random().toString(36).substr(7)
        };

        notes.push(newNote);
        let NotesJSON = JSON.stringify(notes);

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            //console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    });

});

app.delete('/api/notes/:id', function (req, res) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        const notes = JSON.parse(jsonString);

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.random().toString(36).substr(7)
        };

        notes.splice(req.params.id, 1);

        let NotesJSON = JSON.stringify(notes);

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    });

});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
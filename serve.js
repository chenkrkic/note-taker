const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const http = require("http");

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Unable to read file:", err)
            return
        }
        console.log('File data:', jsonString)
        response.json(JSON.parse(jsonString));
    });
});

app.post("/api/notes", function (request, response) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Unable to read file:", err)
            return
        }
        console.log('File data:', jsonString);

        var notes = JSON.parse(jsonString);

        const newNote = {
            title: request.body.title,
            text: request.body.text,
            id: Math.random().toString(36).substring(7)
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

    })

});

app.delete('/api/notes/:id', function (request, response) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);

        var notes = JSON.parse(jsonString);

        const newNote = {
            title: request.body.title,
            text: request.body.text,
            id: Math.random().toString(36).substring(7)
        };


        notes.splice(request.params.id, 1);

        let NotesJSON = JSON.stringify(notes);

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            //console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});

app.listen(PORT, () => {
    console.log("API server is on PORT" + PORT);
});

const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");

const PORT = process.env.PORT || 3001;


app.get("/notes", (req, res) => {
    response.sendFile(path.join(__dirname, "..", "..", "notes.html"));
    console.log("Your Notes!");

});


app.get("/", (req, res) => {
    response.sendFile(path.join(__dirname, "index.html"));
    console.log("Your index!");
});

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "..", "..", "..", "db.json"), function (err, data) {
        console.log("API Notes!");
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
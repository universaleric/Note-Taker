const express = require('express');
const path = require('path');
const db = require("./db/db.json");
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 2424;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.post('/api/notes', (req, res) => {
    const newNotes = req.body;

    let newNote = {
        id: "24",
        title: newNotes.title,
        text: newNotes.text
    }

    db.push(newNote);
    console.log(db);

    WriteToFile();
    res.json(db);
})

function WriteToFile() {
    const fileName = "./db/db.json";
    let fileStr = JSON.stringify(db);
    fs.writeFile(fileName, fileStr, (err) =>
    err ? console.log(err) : console.log("Updating db.json..."));
}




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
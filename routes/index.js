const routes = require("express").Router();
const fs = require('fs');
const {writeFile, readFile} = fs.promises
const { v4: uuidv4 } = require('uuid');

routes.get('/notes', async(req, res) =>{
    const data = await readFile("db/db.json")
    res.send(data)
});

routes.post('/notes', async(req, res) =>{
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    const data = await readFile("db/db.json")
    const db = JSON.parse(data)
    db.push(newNote)
    await writeFile("db/db.json", JSON.stringify(db))
    res.json(db)
});

module.exports = routes
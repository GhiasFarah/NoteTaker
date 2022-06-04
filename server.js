const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
// Helper method for generating unique ids
// const uuid = require('./uuid');



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));``

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for 
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.json(notes);

  // Log our request to the terminal
  console.info(`${req.method} request received to get `);
});

// GET request for a single 
app.get('/api/notes/:id', (req, res) => {
  if (req.body && req.params.id) {
    console.info(`${req.method} request received to get a single a `);
    const Id = req.params.id;
    for (let i = 0; i < notes.length; i++) {
      
      if (notes.id === Id) {
        res.json(notes[i]);
        return;
      }
    }
    res.json(' ID not found');
  }
});

// POST request to add a 
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  // console.info(`${req.method} request received to add a `);

  // Destructuring assignment for the items in req.body
  req.body.id = Math.floor(Math.random() * 1000000000).toString()
  note = {
    title: req.title,
    body: req.body,
    id: req.body.id
  }

 notes.push(req.body)
 res.json(notes);
 fs.writeFileSync('./db/db.json', JSON.stringify(notes))


});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

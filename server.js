const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // import db from models/index.js
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add new player to database with POST method
app.post('/players', (req, res) => {
  let newPlayer = {
    name: req.body.name,
    position: req.body.position,
    year: Number(req.body.year)
  };

  db.player
    .create(newPlayer)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
});

// Retrived all players
app.get('/players', (req, res) => {
  db.player.findAll().then(result => res.status(200).send(result));
});

// Retrived one player
app.get('/player/:id', (req, res) => {
  const { id } = req.body;
  db.player
    .findOne({ where: { id } })
    .then(result => res.status(200).send(result));
});

// Edit player name
app.put('/players/:id', (req, res) => {
  db.player
    .update({ name: req.body.name }, { where: { id: Number(req.params.id) } })
    .then(() => res.status(200).send(req.body));
});

// Delete player from id
app.delete('/players/:id', (req, res) => {
  db.player
    .destroy({ where: { id: Number(req.params.id) } })
    .then(() => res.send('Player deleted!'));
});

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000...');
  });
});

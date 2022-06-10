const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fight = require('./fight')

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  const result = fight(req.body)
  console.log('result', result);
  // res.send(result)
  res.send('R')

});

app.listen(process.env.PORT || 8080);

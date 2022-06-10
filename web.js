const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fight = require('./fight')

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});
const example = {
  "_links": {
    "self": {
      "href": "https://foo.com"
    }
  },
  "arena": {
    "dims": [4, 3],
    "state": {
      "https://foo.com": {
        "x": 0,
        "y": 0,
        "direction": "N",
        "wasHit": false,
        "score": 0
      }
    }
  }
}
const DIRECTIONS = {
  North: "N",
  West: "W",
  South: "S",
  East: "E"
}

const MOVES = {
  Forward: "F",
  Throw: "T",
  TurnLeft: "L",
  TurnRight: "R"
}

app.post('/', function (req, res) {
  const result = fight(req.body)
  console.log('fight', result);
  res.send(result)

});

app.listen(process.env.PORT || 8080);

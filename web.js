const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

const myUrl = 'https://hackathon-1120-wtpnck3waq-uc.a.run.app/'
app.post('/', function (req, res) {
  // console.log(JSON.stringify(req.body));
  const myState = req.body.arena.state[myUrl]
  console.log("🚀 ~ file: web.js ~ line 47 ~ myState", JSON.stringify(myState))
  const [arenaX, arenaY] = req.body.arena.dims
  console.log("🚀 ~ file: web.js ~ line 49 ~ arenaY", arenaY)
  console.log("🚀 ~ file: web.js ~ line 49 ~ arenaX", arenaX)
  const othersState = Object.entries(req.body.arena.state).filter(([key]) => key !== myUrl).map(([key, val]) => {
    return { ...val, player: key }
  })
  console.log("🚀 ~ file: web.js ~ line 54 ~ othersState ~ othersState", othersState.length)
  const { x, y, direction, wasHit, score } = myState
  // 1. Face to the right direction (Do not stuck)
  // 2. Attack if there is someone in my direction
  // 3. If no one close, move
  // faceToCorrectDirection()
  //function faceToCorrectDirection() {
  if (y === 0 && direction === DIRECTIONS.North) {
    if (x === 0) {
      return res.send(MOVES.TurnRight)
    }

    if (x === areaX) {
      return res.send(MOVES.TurnLeft)
    }
  }

  if (y === arenaY && direction === DIRECTIONS.South) {
    if (x === 0) {
      return res.send(MOVES.TurnLeft)
    }

    if (x === areaX) {
      return res.send(MOVES.TurnRight)
    }
  }

  if (x === 0 && direction === DIRECTIONS.West) {
    return res.send(MOVES.TurnLeft)
  }

  if (x === arenaX && direction === DIRECTIONS.East) {
    return res.send(MOVES.TurnLeft)
  }
  // }

  res.send(MOVES.Throw);
});

app.listen(process.env.PORT || 8080);

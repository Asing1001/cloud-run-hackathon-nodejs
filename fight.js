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

module.exports = function fight({ _links, arena }) {
  const myUrl = _links.self.href
  console.log("🚀 ~ file: fight.js ~ line 37 ~ fight ~ myUrl", myUrl)
  const myState = arena.state[myUrl]
  console.log("🚀 ~ file: fight.js ~ line 39 ~ fight ~ myState", myState)
  const [arenaX, arenaY] = arena.dims
  const othersState = Object.entries(arena.state).filter(([key]) => key !== myUrl).map(([key, val]) => {
    return { ...val, player: key }
  })
  const { x, y, direction, wasHit, score } = myState
  // 1. Face to the right direction (Do not stuck)
  // 2. Attack if there is someone in my direction
  // 3. If no one close, move
  // faceToCorrectDirection()
  //function faceToCorrectDirection() {
  if (y === 0 && direction === DIRECTIONS.North) {
    if (x === 0) {
      return MOVES.TurnRight
    }

    return MOVES.TurnLeft
  }

  if (y === arenaY && direction === DIRECTIONS.South) {
    if (x === 0) {
      return MOVES.TurnLeft
    }

    return MOVES.TurnRight
  }

  if (x === 0 && direction === DIRECTIONS.West) {
    return MOVES.TurnLeft
  }

  if (x === arenaX && direction === DIRECTIONS.East) {
    return MOVES.TurnLeft
  }
  // faceToCorrectDirection}

  // Target the player, 
  const THROW_DISTANCE = 3
  const nearPlayers = othersState.filter((other) => {
    return (Math.abs(other.x - x) <= THROW_DISTANCE && other.y === y) || (Math.abs(other.y - y) <= THROW_DISTANCE && other.x === x)
  })
  const canThrow = nearPlayers.some(other => {
    if (direction === DIRECTIONS.East) {
      return other.y === y && other.x > x
    }
    if (direction === DIRECTIONS.West) {
      return other.y === y && x > other.x
    }
    if (direction === DIRECTIONS.North) {
      return other.x === x && y > other.y
    }
    if (direction === DIRECTIONS.South) {
      return other.x === x && y < other.y
    }
  })

  if (nearPlayers.length > 0 && !canThrow) {
    if (wasHit) {
      //where is that player?

    }
    return MOVES.TurnLeft
  }



  if (canThrow) {
    return MOVES.Throw;
  } else {
    let newx, newy
    if (direction === DIRECTIONS.North) {
      newy = y + 1
    }
    if (direction === DIRECTIONS.South) {
      newy = y - 1
    }
    if (direction === DIRECTIONS.East) {
      newx = x + 1
    }
    if (direction === DIRECTIONS.West) {
      newx = x - 1
    }
    console.log(newx, newy);
    return (MOVES.Forward)
  }
}
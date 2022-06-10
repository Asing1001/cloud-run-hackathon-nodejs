
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
  const myState = arena.state[myUrl]
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
    return other.x - x <= THROW_DISTANCE || other.y - y <= THROW_DISTANCE
  })
  const canThrow = nearPlayers.some(other => {
    if (direction === DIRECTIONS.East) {
      return other.y === y && other.x > x && other.x - x <= THROW_DISTANCE
    }
    if (direction === DIRECTIONS.West) {
      return other.y === y && x > other.x && x - other.x <= THROW_DISTANCE
    }
    if (direction === DIRECTIONS.North) {
      return other.x === x && y > other.y && y - other.y <= THROW_DISTANCE
    }
    if (direction === DIRECTIONS.South) {
      return other.x === x && y < other.y && y - other.y <= THROW_DISTANCE
    }
  })

  if (canThrow) {
    return MOVES.Throw;
  } else {
    return (MOVES.Forward)
  }
}
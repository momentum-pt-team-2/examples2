import Player from './Player'
import Coin from './Coin'
import Hazard from './Hazard'
import { randInt } from './randomUtils'

class Game {
  constructor (canvas) {
    this.screen = canvas.getContext('2d')

    this.size = {
      x: canvas.width,
      y: canvas.height
    }

    this.borders = {
      top: (this.size.y - 200) / 2,
      left: (this.size.x - 200) / 2,
      bottom: (this.size.y - 200) / 2 + 200,
      right: (this.size.x - 200) / 2 + 200
    }

    this.score = 0

    this.hazardStart = false

    this.bodies = []

    this.bodies.push(new Player(
      this,
      { x: this.borders.left + 40, y: this.borders.bottom - 40 },
      { x: 50, y: 50 }
    ))

    this.bodies.push(new Coin(
      this,
      { x: this.borders.left + 160, y: this.borders.top + 40 },
      { x: 30, y: 30 }
    ))

    this.msSinceLastEnemy = 0
  }

  update (ms) {
    if (ms - this.msSinceLastEnemy > 1000 && this.hazardStart) {
      this.msSinceLastEnemy = ms
      this.addHazard()
    }

    for (let body of this.bodies) {
      body.update(ms)
    }
  }

  draw (ms) {
    this.screen.fillStyle = '#003459'
    this.screen.fillRect(0, 0, this.size.x, this.size.y)

    this.screen.strokeStyle = '#FFFFFF'
    this.screen.lineWidth = 10
    this.screen.strokeRect(
      this.borders.left,
      this.borders.top,
      200,
      200
    )

    this.screen.fillStyle = '#009FB7'
    this.screen.font = '144px sans-serif'
    this.screen.textAlign = 'center'
    this.screen.fillText(this.score, this.size.x / 2, this.size.y / 2 + 50)

    for (let body of this.bodies) {
      body.draw(ms)
    }
  }

  tick (ms) {
    this.update(ms)
    this.draw(ms)
    window.requestAnimationFrame(() => this.tick())
  }

  addBody (body) {
    this.bodies.push(body)
  }

  removeBody (body) {
    if (this.bodies.includes(body)) {
      this.bodies.splice(this.bodies.indexOf(body), 1)
      return true
    } else {
      return false
    }
  }

  addNewCoin (oldCoin) {
    this.hazardStart = true
    let newX = oldCoin.center.x
    let newY = oldCoin.center.y

    while (newX === oldCoin.center.x || newY === oldCoin.center.y) {
      newX = this.borders.left + 40 + (randInt(0, 3) * 60)
      newY = this.borders.top + 40 + (randInt(0, 3) * 60)
    }

    this.addBody(new Coin(this, { x: newX, y: newY }, { x: 30, y: 30 }))
  }

  addHazard () {
    const edge = randInt(0, 4)
    const speed = 5
    let position
    let velocity

    if (edge === 0) {
      position = { x: this.size.x / 2 + 60 * randInt(-1, 2), y: 0 }
      velocity = { x: 0, y: speed }
    } else if (edge === 1) {
      position = { x: this.size.x, y: this.size.y / 2 + 60 * randInt(-1, 2) }
      velocity = { x: -speed, y: 0 }
    } else if (edge === 2) {
      position = { x: this.size.x / 2 + 60 * randInt(-1, 2), y: this.size.y }
      velocity = { x: 0, y: -speed }
    } else {
      position = { x: 0, y: this.size.y / 2 + 60 * randInt(-1, 2) }
      velocity = { x: speed, y: 0 }
    }

    this.addBody(new Hazard(
      this, position, { x: 40, y: 40 }, velocity))
  }

  tallyCoin () {
    this.score += 2
  }

  takePenalty () {
    if (this.score > 5) {
      this.score -= 5
    } else {
      this.score = 0
    }
  }
}

export default Game

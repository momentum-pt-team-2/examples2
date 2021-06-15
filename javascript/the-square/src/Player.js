import Body from './Body'
import Keyboarder from './Keyboarder'

class Player extends Body {
  constructor (game, center, size) {
    super(game, center, size)
    this.keyboarder = new Keyboarder()

    this.keyboarder.on(Keyboarder.KEYS.UP, this.moveUp.bind(this))
    this.keyboarder.on(Keyboarder.KEYS.DOWN, this.moveDown.bind(this))
    this.keyboarder.on(Keyboarder.KEYS.LEFT, this.moveLeft.bind(this))
    this.keyboarder.on(Keyboarder.KEYS.RIGHT, this.moveRight.bind(this))
  }

  moveRight () {
    if (this.center.x + 60 < this.game.borders.right) {
      this.center.x += 60
    }
  }

  moveLeft () {
    if (this.center.x - 60 > this.game.borders.left) {
      this.center.x -= 60
    }
  }

  moveUp () {
    if (this.center.y - 60 > this.game.borders.top) {
      this.center.y -= 60
    }
  }

  moveDown () {
    if (this.center.y + 60 < this.game.borders.bottom) {
      this.center.y += 60
    }
  }

  update () {
    const collidingBodies = this.game.bodies.filter((body) => this.isColliding(body))
    // collidingBodies.forEach(function (body) {
    //   body.collide(this)
    // }.bind(this))
    collidingBodies.forEach((body) => body.collide(this))
  }
}

export default Player

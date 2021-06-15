import Body from './Body'

class Hazard extends Body {
  constructor (game, center, size, velocity) {
    super(game, center, size)
    this.velocity = velocity
    this.color = '#FF6F59'
  }

  outOfBounds () {
    return this.center.x < 0 ||
      this.center.x > this.game.size.x ||
      this.center.y < 0 ||
      this.center.y > this.game.size.y
  }

  update () {
    this.center.x += this.velocity.x
    this.center.y += this.velocity.y

    if (this.outOfBounds()) {
      this.game.removeBody(this)
    }
  }

  collide () {
    this.game.takePenalty()
    this.game.removeBody(this)
  }
}

export default Hazard

class Body {
  constructor (game, center, size) {
    this.game = game
    this.center = center
    this.size = size
    this.color = '#FFFFFF'
  }

  update () {}

  collide (other) {}

  draw () {
    this.game.screen.fillStyle = this.color
    this.game.screen.fillRect(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    )
  }

  isColliding (other) {
    return !(
      this === other ||
        this.center.x + this.size.x / 2 < other.center.x - other.size.x / 2 ||
        this.center.y + this.size.y / 2 < other.center.y - other.size.y / 2 ||
        this.center.x - this.size.x / 2 > other.center.x + other.size.x / 2 ||
        this.center.y - this.size.y / 2 > other.center.y + other.size.y / 2
    )
  }
}

export default Body

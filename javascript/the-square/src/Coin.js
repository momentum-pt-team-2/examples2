import Body from './Body'

class Coin extends Body {
  constructor (game, center, size) {
    super(game, center, size)
    this.color = '#FED766'
  }

  collide () {
    this.game.tallyCoin()
    this.game.removeBody(this)
    this.game.addNewCoin(this)
    this.game.addHazard()
  }
}

export default Coin

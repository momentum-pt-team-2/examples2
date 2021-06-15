import Die from './Die'

class DiceRoll {
  constructor (desc) {
    if (desc.includes('+')) {
      // this.dice = desc.split('+').map(groupDesc => new DiceRoll(groupDesc))

      let descList = desc.split('+')
      this.dice = []
      for (let groupDesc of descList) {
        this.dice.push(new DiceRoll(groupDesc))
      }
    } else {
      let [numDice, dieSize] = desc.split('d').map(n => parseInt(n, 10))
      this.dice = []
      for (var i = 0; i < numDice; i++) {
        this.dice.push(new Die(dieSize))
      }
    }
  }

  roll () {
    // let sum = 0
    // for (var die of this.dice) {
    //   sum += die.roll()
    // }
    // return sum

    return this.dice
      .map(die => die.roll())
      .reduce((sum, res) => sum + res)
  }
}

export default DiceRoll

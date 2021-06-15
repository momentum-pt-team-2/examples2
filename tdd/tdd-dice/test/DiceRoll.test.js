/* globals test, expect */

import Die from '../src/Die'
import DiceRoll from '../src/DiceRoll'

const NUM_ITERATIONS = 50

test('2d6 is parsed into 2 6-sided dice', () => {
  let diceroll = new DiceRoll('2d6')
  expect(diceroll.dice).toEqual(
    [new Die(6), new Die(6)]
  )
})

test('2d6 returns results between 2 and 12', () => {
  let dice = new DiceRoll('2d6')
  for (let i = 0; i < NUM_ITERATIONS; i++) {
    let result = dice.roll()
    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThanOrEqual(12)
  }
})

test('2d6+1d12 is parsed into 2 6-sided dice and 1 12-sided die', () => {
  let diceroll = new DiceRoll('2d6+1d12')
  expect(diceroll.dice).toEqual(
    [new DiceRoll('2d6'), new DiceRoll('1d12')]
  )
})

test('2d6+1d12 returns results between 3 and 24', () => {
  let dice = new DiceRoll('2d6+1d12')
  for (let i = 0; i < NUM_ITERATIONS; i++) {
    let result = dice.roll()
    expect(result).toBeGreaterThanOrEqual(3)
    expect(result).toBeLessThanOrEqual(24)
  }
})

// test('4d6 drop 1 returns results between 3 and 18', () => {
//   let dice = new DiceRoll('4d6')
//   for (let i = 0; i < NUM_ITERATIONS; i++) {
//     let result = dice.drop(1).roll()
//     expect(result).toBeGreaterThanOrEqual(3)
//     expect(result).toBeLessThanOrEqual(18)
//   }
// })

/* globals test, expect */

import Die from '../src/Die'

const NUM_ITERATIONS = 50

test('rolls are constrained to die size', () => {
  for (let i = 0; i < NUM_ITERATIONS; i++) {
    let dieSize = Math.floor(Math.random() * 100) + 1
    let die = new Die(dieSize)
    for (let j = 0; j < NUM_ITERATIONS; j++) {
      let result = die.roll()
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(dieSize)
    }
  }
})

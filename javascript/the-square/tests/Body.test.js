/* global test, expect */

import Body from '../src/Body'

test('Bodies collide', () => {
  var body1 = new Body(null, {x: 100, y: 100}, {x: 10, y: 10})
  var body2 = new Body(null, {x: 100, y: 120}, {x: 10, y: 60})
  expect(body1.isColliding(body2)).toBe(true)
})

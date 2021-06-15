/* globals test, expect */

import makeChange from './makeChange'

function addCoins (coins) {
  return (
    (coins.quarters || 0) * 25 +
    (coins.dimes || 0) * 10 +
    (coins.nickels || 0) * 5 +
    (coins.pennies || 0)) / 100
}

function floor (number, decimals) {
  return Math.floor(number * (10 ** decimals)) / (10 ** decimals)
}

test('making change for $0 returns empty object', () => {
  let money = 0
  let expectedOutput = {}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.01 returns 1 penny', () => {
  let money = 0.01
  let expectedOutput = {pennies: 1}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.02 returns 2 pennies', () => {
  let money = 0.02
  let expectedOutput = {pennies: 2}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.05 returns 1 nickel', () => {
  let money = 0.05
  let expectedOutput = {nickels: 1}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.07 returns 1 nickel and 2 pennies', () => {
  let money = 0.07
  let expectedOutput = {nickels: 1, pennies: 2}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.10 returns 1 dime', () => {
  let money = 0.10
  let expectedOutput = {dimes: 1}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.17 returns 1 dime, 1 nickel, and 2 pennies', () => {
  let money = 0.17
  let expectedOutput = {dimes: 1, nickels: 1, pennies: 2}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.24 return 2 dimes and 4 pennies', () => {
  let money = 0.24
  let expectedOutput = {dimes: 2, pennies: 4}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.25 returns 1 quarter', () => {
  let money = 0.25
  let expectedOutput = {quarters: 1}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.29 returns 1 quarter and 4 pennies', () => {
  let money = 0.29
  let expectedOutput = {quarters: 1, pennies: 4}
  expect(makeChange(money)).toEqual(expectedOutput)
})

test('making change for 0.29 in Vogon money works correctly', () => {
  let money = 0.29
  let expectedOutput = {vablasters: 2, chobars: 3}
  expect(makeChange(money, [[13, 'vablasters'], [1, 'chobars']])).toEqual(expectedOutput)
})

test('change returned equals amount asked for', () => {
  for (let i = 0; i < 100; i++) {
    const amount = i / 100
    expect(addCoins(makeChange(amount))).toEqual(amount)
  }
})

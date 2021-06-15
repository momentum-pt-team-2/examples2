/*
 * argument amount - amount of money to make change for
 *                   should have no more than 2 decimal places
 *          coins - optional array argument with coin values
 * returns change - object with pennies, nickels, etc
 */
function makeChange (amount, coins) {
  if (typeof (coins) === 'undefined') {
    coins = [[25, 'quarters'], [10, 'dimes'], [5, 'nickels'], [1, 'pennies']]
  }

  let cents = Math.round(amount * 100)
  let change = {}

  function addCoins (coinAmount, coinName) {
    if (cents >= coinAmount) {
      change[coinName] = Math.floor(cents / coinAmount)
      cents -= (coinAmount * change[coinName])
    }
  }

  for (let coin of coins) {
    addCoins(coin[0], coin[1])
  }

  return change
}

export default makeChange

const randInt = function (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

const randomPick = function (array) {
  return array[Math.floor(Math.random() * array.length)]
}

export { randInt, randomPick }

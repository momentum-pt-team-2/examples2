import moment from 'moment'

class Clock {
  constructor (element) {
    this.element = element
  }
  display () {
    var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    var displayText = `The current ${`datetime is ${currentTime}.`}`
    this.element.innerHTML = makeBigAndRed(displayText)
  }
  run () {
    this.display()
    setTimeout(() => this.run(), 1000)
  }
}

function makeBigAndRed (text) {
  return `<span style="color: red; font-size: 2em">${text}</span>`
}

export default Clock

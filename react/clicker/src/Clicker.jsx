import React from 'react'

class Clicker extends React.Component {
  constructor () {
    super()
    this.state = {
      clicks: 0
    }
  }

  clickButton () {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }))
  }

  render () {
    return (<div>
      <h1>Hello!</h1>
      <p>You have clicked this button {this.state.clicks} times.</p>
      <button onClick={this.clickButton.bind(this)}>Click me</button>
    </div>)
  }
}

export default Clicker

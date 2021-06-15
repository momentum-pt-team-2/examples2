import React, {Component} from 'react'
import 'shoelace-css/dist/shoelace.css'
import './App.css'
import textOptions from './textOptions'
import { textToWordSet } from './util'
import ShrinkOptions from './components/ShrinkOptions'
import request from 'superagent'

class App extends Component {
  constructor () {
    super()
    this.state = {
      text: 'Today we are going to learn to test React with smoke tests, snapshot tests, and Enzyme, because each has a different purpose when testing React components.',
      options: [],
      textOptions: textOptions.slice()
    }

    this.setOption = this.setOption.bind(this)
    this.searchForSynonyms = this.searchForSynonyms.bind(this)
  }

  updateText (event) {
    this.setState({text: event.target.value})
  }

  setOption (optionToChange, event) {
    const checked = event.target.checked
    let options = this.state.options.slice()
    if (checked) {
      options = options.concat(optionToChange)
    } else {
      options = options.filter(option => option !== optionToChange)
    }

    this.setState({
      options: options
    })
  }

  searchForSynonyms () {
    // break up text into words
    const words = [...textToWordSet(this.state.text)]

    // for each word.length >= 7
    const longWords = words.filter(word => word.length >= 7)
    longWords.forEach(origWord => {
    // contact synonym source (API) with the word
      request.get(`https://api.datamuse.com/words?rel_syn=${origWord}`)
        .then(response => {
          // add synonyms which are shorter than the word & have score > 400 to textOptions
          let synonyms = response.body
          synonyms = synonyms.filter(syn => {
            return syn.word.length < origWord.length && syn.score > 400
          })
          synonyms.forEach(syn => this.addSynonymToTextOptions(origWord, syn.word))
        })
    })
  }

  addSynonymToTextOptions (origWord, synonym) {
    const newOption = {
      id: `syn-${origWord}-${synonym}`,
      label: `Replace "${origWord}" with "${synonym}"`,
      fn: text => text.replace(new RegExp(`\\b${origWord}\\b`), synonym)
    }
    this.setState(prevState => {
      return {
        textOptions: prevState.textOptions.concat(newOption)
      }
    })
  }

  shrinkText () {
    let {text, options} = this.state

    if (!text) {
      return ''
    }

    let opObj
    options.forEach(option => {
      opObj = this.state.textOptions.find(o => o.id === option)
      if (opObj) {
        text = opObj.fn(text)
      }
    })

    return text
  }

  render () {
    const text = this.state.text
    const shrunkText = this.shrinkText()

    let lengthInfo
    if (text) {
      lengthInfo = <span>{text.length} characters</span>
    } else {
      lengthInfo = <span>No text entered</span>
    }

    return (
      <div className='App container'>
        <h1>TweetShrink</h1>
        <div className='row'>
          <div className='col'>
            <textarea
              className='TextEntry-textbox'
              placeholder='What do you want to shrink?'
              onChange={this
                .updateText
                .bind(this)}
              value={text} />
          </div>
          <div className='col'>
            <div className='TextEntry-shrunk-text'>
              {shrunkText}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {lengthInfo}
          </div>
          <div className='col'>
            {shrunkText && `${shrunkText.length} characters`}
          </div>
        </div>
        <div className='mar-b-sm mar-t-sm'>
          <button onClick={this.searchForSynonyms}>Search for synonyms</button>
        </div>
        <ShrinkOptions textOptions={this.state.textOptions} onOptionChange={this.setOption} />
      </div>
    )
  }
}

export default App

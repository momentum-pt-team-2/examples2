/* globals test, expect */

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { mount } from 'enzyme'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('shows title of app', () => {
  const wrapper = mount(<App />)
  expect(wrapper.text()).toContain('TweetShrink')
})

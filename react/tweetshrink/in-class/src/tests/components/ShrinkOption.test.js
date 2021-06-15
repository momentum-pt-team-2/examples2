/* globals test, expect */

import React from 'react'
import ReactDOM from 'react-dom'
import ShrinkOption from '../../components/ShrinkOption'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ShrinkOption />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('does not change inadvertenly', () => {
  const component = renderer.create(
    <ShrinkOption id={'spaces'} label={'Eliminate extra spaces'} onOptionChange={() => null} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders a checkbox and shows label', () => {
  const wrapper = shallow(<ShrinkOption id={'spaces'} label={'Eliminate extra spaces'} />)
  expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1)
  expect(wrapper.text()).toContain('Eliminate extra spaces')
})

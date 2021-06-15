/* globals test, expect */

import React from 'react'
import ShrinkOptions from '../../components/ShrinkOptions'
import { mount } from 'enzyme'

test('outputs checkboxes and labels', () => {
  const textOptions = [
    {id: 'test1', label: 'Test 1'},
    {id: 'test2', label: 'Test 2'}
  ]
  const wrapper = mount(<ShrinkOptions textOptions={textOptions} onOptionChange={() => null} />)
  expect(wrapper.find('input[type="checkbox"]')).toHaveLength(textOptions.length)

  textOptions.forEach(option => {
    expect(wrapper.text()).toContain(option.label)
  })
})

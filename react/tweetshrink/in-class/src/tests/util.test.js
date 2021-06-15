/* globals expect, test, describe */

import { textToWordSet } from '../util'

describe('textToWordSet', () => {
  test('can split text into component words', () => {
    const text = 'We hold these truths to be self-evident: that all men and women are created equal; that they are endowed'
    expect(textToWordSet(text)).toEqual(new Set([
      'we', 'hold', 'these', 'truths', 'to', 'be', 'self-evident',
      'that', 'all', 'men', 'and', 'women', 'are', 'created', 'equal',
      'they', 'endowed'
    ]))
  })
})

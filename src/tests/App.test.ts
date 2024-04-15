import { expect, test, describe, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { getRandColour, styleObject } from '@/App.vue'
import { beforeEach } from 'node:test'

console.log(styleObject)

test('outputs a random colour from an array', () => {
  expect(getRandColour()).toBeTypeOf('string')
})

describe('NumberRenderer', () => {
  it('renders even numbers', () => {
    const object = mount(styleObject)

    expect(object)
  })
})

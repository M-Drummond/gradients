import { expect, test } from 'vitest'

import { getRandColour } from '@/App.vue'

test('outputs a random colour from an array', () => {
  expect(getRandColour()).toBeTypeOf('string')
})

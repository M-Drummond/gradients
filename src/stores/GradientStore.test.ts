import { setActivePinia, createPinia } from 'pinia'
import { expect, test, describe, beforeEach, it } from 'vitest'
import { useGradientStore } from '@/stores/GradientStore'

describe('Gradient Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mode is set to a string', () => {
    const gs = useGradientStore()
    expect(gs.mode).toBeTypeOf('string')
  })
  it('getMinPos returns', () => {
    const gs = useGradientStore()
    expect(gs.getMinPos).toReturn
  })
  it('getMinPos returns != null', () => {
    const gs = useGradientStore()
    expect(gs.getMinPos).not.null
  })
})

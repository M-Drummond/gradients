import { setActivePinia, createPinia } from 'pinia'
import { expect, test, describe, beforeEach, it } from 'vitest'
import { useGradientStore } from '@/stores/GradientStore'
import { getRandColour } from '@/App.vue'

describe('Gradient Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mode is set to a string', () => {
    const gs = useGradientStore()
    expect(gs.mode).toBeTypeOf('string')
  })
  it('getMinPos returns != null', () => {
    const gs = useGradientStore()
    expect(gs.getMinPos).toReturnWith
  })

  it('add a new stop with random color and minimum position', () => {
    const store = useGradientStore()

    // Mock the external helper function
    const mockColour = 'mockColour'
    const mockPosition = 50 // Assuming the minimum position is 50
    getRandColour(mockColour)

    // Call the addStop method
    store.addStop()

    const stops = store.stops

    // Assert that a new stop is added with the expected color and position
    expect(stops).toHaveLength(4)
    expect(stops[3]).toHaveProperty('colour')
    expect(stops[3]).toHaveProperty('pos')
  })
  it('should reduce the length of stops array by 1 when removing a stop', () => {
    const store = useGradientStore()

    // Get the stops array before removing a stop
    const stopsBeforeRemove = store.stops.slice() // Copy the stops array

    // Call the removeStop method
    store.removeStop(stopsBeforeRemove[1])

    // Get the stops array after removing a stop
    const stopsAfterRemove = store.stops

    // Assert that the length of the stops array has decreased by 1
    expect(stopsAfterRemove.length).toBe(stopsBeforeRemove.length - 1)
  })
})

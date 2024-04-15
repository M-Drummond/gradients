import { setActivePinia, createPinia } from 'pinia'
import { expect, test, describe, beforeEach, it } from 'vitest'
import { useGradientStore } from '@/stores/GradientStore'
import { getRandColour } from '@/App.vue'

describe('Gradient Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('stops array is present', () => {
    const gs = useGradientStore()
    const stops = gs.stops
    expect(stops.length).toBeGreaterThan(1)
  })
  it('mode is set and able to be set to a string', () => {
    const gs = useGradientStore()
    gs.setMode('testString')
    expect(gs.mode).toBeTypeOf('string')
  })
  it('getMinPos returns != null', () => {
    const gs = useGradientStore()
    expect(gs.getMinPos).toReturnWith
  })

  it('add a new stop', () => {
    const store = useGradientStore()

    // get a copy of the array in the store
    const stopsBeforeAdd = store.stops.slice()

    // add a stop to the stored stops array
    store.addStop()

    // check the length of the items in the stored stops array
    const stopsAfterAdd = store.stops

    // Assert that the length of the stops array has increased by 1 and has the corect properties
    expect(stopsAfterAdd.length).toBe(stopsBeforeAdd.length + 1)
    expect(stopsAfterAdd[stopsAfterAdd.length - 1]).toHaveProperty('colour')
    expect(stopsAfterAdd[stopsAfterAdd.length - 1]).toHaveProperty('pos')
  })
  it('should reduce the length of stops array by 1 when removing a stop', () => {
    const store = useGradientStore()

    // Get the stops array before removing a stop
    const stopsBeforeRemove = store.stops.slice()

    // Call the removeStop method
    store.removeStop(stopsBeforeRemove[1])

    // Get the stops array after removing a stop
    const stopsAfterRemove = store.stops

    // Assert that the length of the stops array has decreased by 1
    expect(stopsAfterRemove.length).toBe(stopsBeforeRemove.length - 1)
  })
})

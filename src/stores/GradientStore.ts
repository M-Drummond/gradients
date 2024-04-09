import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getRandColour } from '@/App.vue'

export const useGradientStore = defineStore('gradient', {
  state: () => ({
    stops: ref([
      {
        colour: getRandColour(),
        pos: 0
      },
      {
        colour: getRandColour(),
        pos: 50
      },
      {
        colour: getRandColour(),
        pos: 100
      }
    ])
  }),
  actions: {
    removeStop(stop: stop) {
      const index = this.stops.findIndex((e) => e.colour === stop.colour)
      if (index !== -1) {
        this.stops.splice(index, 1)
      }
    },
    addStop() {
      const newStop: stop = {
        colour: getRandColour(),
        pos: 75
      }
      this.stops.push(newStop)
    }
  }
  // return { count, stops }

  // return { count, doubleCount, increment }
})

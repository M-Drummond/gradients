import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getRandColour } from '@/App.vue'

import type { Stop } from '@/types/Stop.ts'

export const useGradientStore = defineStore('gradient', {
  state: () => {
    return {
      mode: ref('linear'),
      stops: ref([
        {
          colour: getRandColour(),
          pos: 0
        },
        {
          colour: getRandColour(),
          pos: 33
        },
        {
          colour: getRandColour(),
          pos: 66
        }
      ])
    }
  },
  actions: {
    setMode(selectedMode: string) {
      console.log(selectedMode)
      this.mode = selectedMode
    },
    removeStop(stop: Stop) {
      const index = this.stops.findIndex((e) => e.colour === stop.colour)
      if (index !== -1) {
        this.stops.splice(index, 1)
      }
    },
    addStop() {
      const newStop: Stop = {
        colour: getRandColour(),
        pos: 75
      }
      this.stops.push(newStop)
    }
  }
})

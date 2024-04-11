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
      const index = this.stops.findIndex((e) => e === stop)
      if (index !== -1) {
        this.stops.splice(index, 1)
      }
      return this.stops.length
    },
    getMinPos() {
      const stops = this.stops
      const min = Math.min(this.stops[stops.length - 1].pos + 5, 100)
      return min
    },

    addStop() {
      const newStop: Stop = {
        colour: getRandColour() as string,
        pos: this.getMinPos() as number
      }
      this.stops.push(newStop)
    }
  }
})

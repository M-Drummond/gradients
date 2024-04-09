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
          pos: 0,
          pickerActive: false,
          pickerDisabled: false
        },
        {
          colour: getRandColour(),
          pos: 33,
          pickerActive: false,
          pickerDisabled: false
        },
        {
          colour: getRandColour(),
          pos: 66,
          pickerActive: false,
          pickerDisabled: false
        }
      ])
    }
  },
  actions: {
    setMode(selectedMode: string) {
      console.log(selectedMode)
      this.mode = selectedMode
    },
    activatePicker(stop: Stop) {
      this.stops.forEach((p) => {
        if (p !== stop) {
          p.pickerDisabled = true
        }
      })
    },
    removeStop(stop: Stop) {
      const index = this.stops.findIndex((e) => e === stop)
      if (index !== -1) {
        this.stops.splice(index, 1)
      }
    },
    getMinPos() {
      const stops = this.stops
      const min = Math.min(this.stops[stops.length - 1].pos + 5, 100)
      return min
    },

    addStop() {
      const newStop: Stop = {
        colour: getRandColour() as string,
        pos: this.getMinPos() as number,
        pickerActive: false
      }
      this.stops.push(newStop)
    }
  }
})

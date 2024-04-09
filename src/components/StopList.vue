<script setup lang="ts">
import { useGradientStore } from '@/stores/GradientStore'
import CopyButton from '@/components/CopyButton.vue'
import RemoveButton from '@/components/RemoveButton.vue'

import Slider from '@vueform/slider'

const gs = useGradientStore()
const stops = gs.stops
const addStop = gs.addStop
const removeStop = gs.removeStop
</script>

<template>
  <div class="flex flex-col w-full px-4 mb-4 border-8 border-black md:mr-4">
    <div v-for="stop in stops" :key="stop.colour" class="relative py-1 overflow-hidden group">
      <div class="relative h-[100px] w-full">
        <input @click="gs.activatePicker(stop)" :value="stop.colour" type="color" class="colorPicker" />

      </div>

      <div class="p-4">
        <Slider showTooltip="'focus'" v-model="stop.pos" :max="100" :min="0" :lazy="false" />
      </div>

      <CopyButton :stop />

      <RemoveButton :stop :stops />
    </div>

    <button @click="addStop(stop)"
      class="py-4 my-4 transition-all border border-black border-solid rounded-lg hover:bg-black hover:text-white add-button left-4 top-4">
      Add Stop
    </button>
  </div>
</template>

<style scoped>
.colorPicker {
  @apply absolute inset-0 mt-0 appearance-none border-0 p-0 m-0;
  border: 0;
  /* width: 110%; */
  /* left: -2%; */
  height: 100%;
  width: 100%;
  appearance: auto;
  background-color: transparent;
  border: initial;
  outline: initial;
  color: initial;
}

.copy-button:not(:active) {
  box-shadow: 4px 4px 0px currentColor;
}

.add-button {
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.85);
}

.add-button:hover {
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.5);
}

.remove-button {
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.85);
}
</style>

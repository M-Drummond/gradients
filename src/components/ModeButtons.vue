<script setup lang="ts">
import { useGradientStore } from '@/stores/GradientStore'
const gs = useGradientStore()
const setMode = gs.setMode

const modes = [
  { value: 'linear', id: 0 },
  { value: 'radial', id: 1 },
  { value: 'conic', id: 2 }
]
</script>

<template>
  <div class="flex flex-row justify-between p-4 space-x-4 border-8 border-black">
    <button
      v-for="mode in modes"
      :key="mode.id"
      @click="setMode(mode.value)"
      class="w-full p-4 capitalize transition-all border border-black border-solid rounded-lg hover:shadow-button-hover shadow-base left-4 top-4 hover:bg-black hover:text-white"
      :class="gs.mode === mode.value ? 'bg-black text-white ' : 'text-black bg-white'"
    >
      {{ mode.value }}
    </button>
  </div>
</template>

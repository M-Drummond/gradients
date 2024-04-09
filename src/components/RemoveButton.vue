<script setup lang="ts">
import { useGradientStore } from '@/stores/GradientStore'

import type { Stop } from '@/types/Stop'

const gs = useGradientStore()
const removeStop = gs.removeStop

defineProps({
  stops: {
    type: Array,
    required: true
  },
  stop: {
    type: Object,
    required: true
  }
})


</script>

<script lang="ts"></script>

<template>
  <button v-if="stops.length > 1" @click="removeStop(stop as Stop)"
    class="remove-button top-4 bg-white p-1 border border-black rounded-lg absolute transition-all right-[-15%] group-hover:right-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</template>
<style scoped></style>

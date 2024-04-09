<script setup lang="ts">
import { copy } from '../utils/Copy'
import type { Stop } from '@/types/Stop'

defineProps({
  stop: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <button @click="copy(stop.colour)"
    class="copy-button absolute z-30 p-2 border delay-200 border-black border-solid bg-white rounded-lg top-4 hover:bg-black hover:text-white transition-all left-[-25%] group-hover:left-4"
    v-text="stop.colour"></button>
</template>
<style scoped></style>

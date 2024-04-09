<script setup lang="ts">
import { notificationVisible, lastCopied } from '@/App.vue'
</script>

<script lang="ts"></script>

<template>
  <div class="fixed bottom-0 z-50 w-full h-24 overflow-hidden">
    <div
      @click="notificationVisible = false"
      id="notifications"
      :class="notificationVisible ? 'translate-y-0' : 'translate-y-[150%]'"
      class="absolute px-4 py-2 text-xs font-bold transition-all bg-white border border-black cursor-pointer shadow-base rounded-xl bottom-4 right-4"
    >
      {{ lastCopied }} Copied to Clipboard
    </div>
  </div>
</template>
<style scoped></style>

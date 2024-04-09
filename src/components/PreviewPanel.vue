<script setup lang="ts">
defineProps({
  styleObject: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div id="preview" :style="styleObject" class="border border-8 border-black">
    <div class="relative z-20">
      <button
        @click="copy(styleObject)"
        class="absolute right-0 mr-2 md:mr-5 ml-auto left-auto mt-[-10px] md:mt-4 md:w-[120px] copy-button"
        v-text="'Copy CSS'"
      />
    </div>
  </div>
</template>

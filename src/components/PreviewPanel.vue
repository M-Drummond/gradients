<script setup lang="ts">
import { copy } from '@/utils/Copy'

defineProps({
  css: {
    type: String,
  },
  styleObject: {
    type: Object,
    required: true
  }
}) 
</script>
<template>
  <div id="preview" :style="styleObject" class="border-8 border-black border-solid">
    <div class="relative z-20">
      <button @click="copy('div { background: ' + css + '} ')"
        class="absolute right-0 py-2 shadow-base mr-2 md:mr-5 ml-auto left-auto mt-[-10px] md:mt-4 md:w-[120px] copy-button  border border-black border-solid bg-white rounded-lg top-4 hover:bg-black hover:text-white transition-all">Copy
        CSS</button>
    </div>
  </div>
</template>


<style scoped>
#preview {
  min-height: 125px;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@media screen and (min-width: 960px) {
  #preview {
    min-height: 250px;
  }
}
</style>
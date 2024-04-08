<script setup lang="ts">

import { ref, computed, watch } from 'vue';
import { useGradientStore } from '@/stores/GradientStore.ts'

import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

const gs = useGradientStore();

console.log(gs)

import Slider from '@vueform/slider'


const repeating = ref(false)

const midpoint = ref(33)

const startColour = ref("#ff0000")

const endColour = ref("#00ff00")

const angle = ref(145)

const styleObject = computed(() => ({
  background: `${repeating.value ? 'repeating-' : ''}linear-gradient(${angle.value}deg, ${startColour.value} ${midpoint.value}%, ${endColour.value})`
}));

</script>

<template>
  <div class="h-full min-h-screen px-2 pt-2 md:px-0 frame" :style="styleObject">
    <header
      class="p-4 mx-auto mt-8  font-sans font-bold tracking-wider text-center border-white text-black uppercase bg-white border-t-8 rounded-t-[10px]  text-x xl:max-w-screen-xl xl:border-x-8 xl:border-white shadow-main lg:text-2xl">
      Gradient
      Generator
    </header>
    <main
      class="mx-auto font-sans font-bold xl:max-w-screen-xl xl:border-x-8 xl:border-white shadow-main  rounded-b-[10px] ">

      <div id="preview" :style="styleObject">
        <div class="z-20 bg-white border-b-8 border-white border-solid ">

        </div>
      </div>
      <div v-text="styleObject" id="code"
        class="p-4 font-mono font-normal text-white bg-gray-900 border-white border-solid border-y-8">

      </div>
      <div id="ui-panel" class="flex flex-col bg-white border-b-8 md:flex-row border-b-white">

        <div class="top-0 z-20 flex flex-col w-full p-8 pb-12 space-y-12 ">
          <p class="">
            Angle
          </p>
          <Slider v-model="angle" :max="360" :lazy="false" />
          <p class="">
            midpoint
          </p>
          <Slider v-model="midpoint" :max="100" :lazy="false" />
          <p class="">
            Repeat
          </p>
          <input v-model="repeating" type="checkbox" />

          <!-- {{ angle }} -->
          <!-- <Slider v-model="value" /> -->
        </div>

        <div
          class="relative min-h-[150px] md:min-h-[250px] z-20 flex flex-col w-full bg-white border-white border-solid border-x-8 ">
          <p class="absolute z-30 p-2 bg-white rounded-lg shadow-base left-4 top-4" v-text="startColour"></p>
          <input v-model="startColour" type="color" value="#ff0000" class="colorPicker" />
          <!-- {{ angle }} -->
          <!-- <Slider v-model="value" /> -->
        </div>

        <div class="relative min-h-[150px] md:min-h-[250px] z-20 flex flex-col w-full ">
          <p class="absolute z-30 p-2 bg-white rounded-lg shadow-base left-4 top-4" v-text="endColour"></p>
          <input v-model="endColour" type="color" value="#00ff00" class="colorPicker" />
          <!-- {{ angle }} -->
          <!-- <Slider v-model="value" /> -->
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
#preview {
  min-height: 250px;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.colorPicker {
  @apply absolute inset-0 mt-0 appearance-none border-0 p-0 m-0;
  border: 0;
  /* width: 110%; */
  /* left: -2%; */
  height: 100%;
  width: 100%;
}

.shadow-base {
  box-shadow: 4px 4px 0px rgba(0, 0, 0, .85);
}

.shadow-main {
  box-shadow: 7px 7px 0px rgba(0, 0, 0, .85);
}
</style>

<style src="@vueform/slider/themes/default.css"></style>

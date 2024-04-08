<script setup lang="ts">

import { ref, computed, watch, onMounted } from 'vue';
import { useGradientStore } from '@/stores/GradientStore.ts'


const gs = useGradientStore();

console.log(gs)

import Slider from '@vueform/slider'

const repeating = ref(false)

const radialMode = ref(true)

const midpoint = ref(33)

const startColour = ref("#bef3fe")

const endColour = ref("#b3ff80")

const angle = ref(145)

const notificationVisible = ref(false)

const lastCopied = ref("")

const styleObject = computed(() => {
  if (radialMode.value) {
    return {
      background: `${repeating.value ? 'repeating-' : ''}linear-gradient(${angle.value}deg, ${startColour.value} ${midpoint.value}%, ${endColour.value})`
    };
  } else {
    return {
      background: `${repeating.value ? 'repeating-' : ''}radial-gradient(${startColour.value} ${midpoint.value}%, ${endColour.value})`
    };
  }
});

function copy(x) {
  console.log(x)
  navigator.clipboard.writeText(x);
  notificationVisible.value = true
  lastCopied.value = x
  setTimeout(() => {
    notificationVisible.value = false
  }, 1500);
}

const presetColours = [
  "#b3ff80", '#d36fc5', '#bef3fe', '#c79adf', '#f9b4c5', '#f9edb4', '#e2bcfb', '#7f6fd3', '#b6f7b5', '#b6d7f7', '#1c8cfd'
]

onMounted(() => {
  const randStart = presetColours[Math.round(Math.random() * 10)]
  const randEnd = presetColours[Math.round(Math.random() * 10)]
  startColour.value = randStart
  endColour.value = randEnd
})
</script>

<template>
  <div class="h-full min-h-screen px-2 pt-2 pb-8 font-sans font-bold md:px-0 frame" :style="styleObject">
    <header
      class="p-4 mx-auto mt-8 font-sans font-bold tracking-wider text-center text-black uppercase bg-white border-t border-black border-x text-x xl:max-w-screen-xl shadow-main lg:text-2xl">
      Gradient
      Generator
    </header>
    <main
      class="px-2 pb-2 mx-auto font-sans font-bold bg-white border-b border-black rounded-bl-8 xl:max-w-screen-xl border-x shadow-main ">

      <div id="preview" :style="styleObject" class="border border-8 border-black">
        <div class="relative z-20 ">
          <button @click="copy(styleObject)" class="absolute right-0 mr-5 ml-auto left-auto mt-4 w-[120px] copy-button"
            v-text="'Copy CSS'" />
        </div>
      </div>
      <div v-text="styleObject" id="code"
        class="p-4 font-mono font-normal text-white bg-gray-900 border-white border-solid border-y-8">

      </div>
      <div id="ui-panel" class="flex flex-col mb-4 bg-white border-b-8 border-black md:flex-row">

        <div class="top-0 z-20 flex flex-col order-last w-full md:order-1">
          <div class="px-8 pb-4 border-t-8 border-black border-solid border-x-8">
            <p class="py-4 mb-12 ">
              Angle
            </p>
            <Slider class="slider" v-model="angle" :disabled="!radialMode" :max="360" :lazy="false" />
          </div>
          <div class="px-8 pb-8 border-b-8 border-black border-solid border-x-8">
            <p class="mb-12">
              Midpont
            </p>
            <Slider v-model="midpoint" :max="100" :lazy="false" />

          </div>
          <div class="flex flex-col px-4 pt-4 pb-8 mb-0 space-y-8 border-black border-solid border-x-8">
            <p>Config:</p>
            <button @click=" repeating = !repeating" class="flex flex-row items-center">
              <div class="mr-2.5 grid h-5 w-5 place-items-center bg-white outline outline-2 outline-black">
                <transition>
                  <svg v-show="repeating" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="relative top-[-2px] left-[-2px] w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </transition>

              </div>
              <span v-text="'Repeat Gradient'"></span>
            </button>
            <button @click=" radialMode = !radialMode" class="flex flex-row items-center">
              <div class="mr-2.5 grid h-5 w-5 place-items-center bg-white outline outline-2 outline-black">
                <transition>
                  <svg v-show="!radialMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="relative top-[-2px] left-[-2px] w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </transition>

              </div>
              <span v-text="'Radial Mode'"></span>

            </button>
          </div>
          <!-- {{ angle }} -->
          <!-- <Slider v-model="value" /> -->
        </div>

        <div
          class="relative min-h-[150px] md:min-h-[250px] z-20 flex flex-col w-full bg-white border-black border-solid md:border-x-8 md:border-t-8">
          <button @click="copy(startColour)" class="copy-button" v-text="startColour"></button>
          <input v-model="startColour" type="color" value="#ff0000" class="colorPicker" />
          <!-- {{ angle }} -->
          <!-- <Slider v-model="value" /> -->
        </div>

        <div class="relative min-h-[150px] md:min-h-[250px] z-20 flex flex-col w-full md:border-t-8 border-black">
          <button @click="copy(endColour)" class="copy-button" v-text="endColour">
          </button>
          <input v-model="endColour" type="color" value="#00ff00" class="colorPicker" />
          <!-- {{ angle }} -->
          <!-- <Slider v-model="value" /> -->
        </div>

      </div>
    </main>
    <div class="fixed bottom-0 z-50 w-full h-24 overflow-hidden">
      <div @click="notificationVisible = false" id="notifications"
        :class="notificationVisible ? 'translate-y-0' : 'translate-y-[150%]'"
        class="absolute px-4 py-2 text-xs font-bold transition-all bg-white border border-black cursor-pointer shadow-base rounded-xl bottom-4 right-4">
        {{ lastCopied }} Copied to Clipboard
      </div>
    </div>
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
  appearance: auto;
  background-color: transparent;
  border: initial;
  outline: initial;
  color: initial;
}

.shadow-base {
  box-shadow: 4px 4px 0px rgba(0, 0, 0, .85);
}

.shadow-button {
  box-shadow: 4px 4px 0px currentColor;
}

.shadow-main {
  box-shadow: 7px 7px 0px rgba(0, 0, 0, .85);
}

:root {
  --slider-connect-bg: #3B82F6;
  --slider-tooltip-bg: #3B82F6;
  --slider-handle-ring-color: #3B82F630;
  --slider-tooltip-bg: #{$startColour.value};
}

root {
  --slider-tooltip-bg: #{ sliderStyleObject };
}

.copy-button {
  @apply absolute z-30 p-2 border border-black border-solid bg-white rounded-lg left-4 top-4 hover:bg-black hover:text-white transition-all;
}

.copy-button:not(:active) {
  @apply shadow-button;
}

.copy-button:active {
  @apply translate-y-[3px];
  box-shadow: unset;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>

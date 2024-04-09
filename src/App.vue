<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGradientStore } from '@/stores/GradientStore'

import PreviewPanel from '@/components/PreviewPanel.vue'
import CodePanel from '@/components/CodePanel.vue'
import StopList from '@/components/StopList.vue'
import ModeButtons from '@/components/ModeButtons.vue'
import AppHeader from '@/components/AppHeader.vue'
import NotificationArea from '@/components/NotificationArea.vue'

import Slider from '@vueform/slider'

const gs = useGradientStore()
const stops = gs.stops
const repeating = ref(false)

const angle = ref(Math.ceil(Math.round(Math.random() * 360)), 360)

const styleObject = computed(() => {
  if (gs.mode === 'linear') {
    return {
      'background': `${repeating.value ? 'repeating-' : ''}linear-gradient(${angle.value}deg, ${stopsAsString.value})`
    }
  } else if (gs.mode === 'radial') {
    return {
      'background': `${repeating.value ? 'repeating-' : ''}radial-gradient(${stopsAsString.value})`
    }
  } else if (gs.mode === 'conic') {
    return {
      'background': `${repeating.value ? 'repeating-' : ''}conic-gradient(${stopsAsStringConic.value})`
    }
  }
  return {}
})

const css = computed(() => {
  if (gs.mode === 'linear') {
    return `${repeating.value ? 'repeating-' : ''}linear-gradient(${angle.value}deg, ${stopsAsString.value})`;
  } else if (gs.mode === 'radial') {
    return `${repeating.value ? 'repeating-' : ''}radial-gradient(${stopsAsString.value})`;
  } else if (gs.mode === 'conic') {
    return `${repeating.value ? 'repeating-' : ''}conic-gradient(${stopsAsStringConic.value})`;
  }
  return '';
});

const stopsAsString = computed(() => {
  return stops.map((stop) => ` ${stop.colour} ${stop.pos}%`)
})

const stopsAsStringConic = computed(() => {
  return stops.map((stop) => ` ${stop.colour} ${stop.pos * 3.6}deg `)
})
</script>

<script lang="ts">
export const lastCopied = ref('')
export const notificationVisible = ref(false)

const presetColours = [
  '#b3ff80',
  '#d36fc5',
  '#bef3fe',
  '#c79adf',
  '#f9b4c5',
  '#f9edb4',
  '#e2bcfb',
  '#7f6fd3',
  '#b6f7b5',
  '#b6d7f7',
  '#1c8cfd'
]

export function getRandColour() {
  return presetColours[Math.round(Math.random() * 10)].toString()
}



</script>

<template>
  <div class="h-full min-h-screen px-2 pb-8 font-sans font-bold md:pt-2 md:px-0 frame" :style="styleObject">
    <AppHeader />

    <main
      class="px-2 pb-2 mx-auto font-sans font-bold bg-white border-b border-black rounded-bl-8 xl:max-w-screen-xl border-x shadow-main">
      <div class="sticky top-0 z-50 bg-white">
        <PreviewPanel :styleObject :css />
        <CodePanel :css :styleObject />
      </div>

      <div id="ui-panel" class="flex flex-col items-stretch mb-4 bg-white border-black md:flex-row">
        <div class="top-0 z-20 flex flex-col order-last w-full md:order-1">
          <div class="px-4 pb-4 border-8 border-black border-solid">
            <div :class="gs.mode === 'conic' ? 'opacity-50 pointer-events-none' : ''">
              <p class="py-4 mb-2">Angle</p>
              <Slider showTooltip="'focus'" class="slider" v-model="angle" :max="360" :lazy="false" />
            </div>
          </div>

          <div class="flex flex-col px-4 py-8 mb-0 space-y-8 border-b-8 border-black border-solid border-x-8">
            <button @click="repeating = !repeating" class="flex flex-row items-center">
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

            <ModeButtons />

          </div>
          <p class="mt-4 text-xs text-right">&copy; MD {{ new Date().getFullYear() }}</p>
        </div>

        <StopList />

      </div>
    </main>
    <NotificationArea />
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

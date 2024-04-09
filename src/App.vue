<script setup lang="ts">

import { ref, computed } from 'vue';
// import { useGradientStore } from '@/stores/GradientStore.ts'

import PreviewPanel from '@/components/PreviewPanel.vue'

import CodePanel from '@/components/CodePanel.vue'

import StopList from '@/components/StopList.vue'

import ModeButtons from '@/components/ModeButtons.vue'

import AppHeader from '@/components/AppHeader.vue'

import NotificationArea from '@/components/NotificationArea.vue'

// const gs = useGradientStore();

// console.log(gs)

import Slider from '@vueform/slider'

const repeating = ref(false)

const angle = ref(145)

const styleObject = computed(() => {
  if (mode.value === 'linear') {
    return {
      background: `${repeating.value ? 'repeating-' : ''}linear-gradient(${angle.value}deg,  ${stopsAsString.value})`
    };
  } else if (mode.value === 'radial') {
    return {
      background: `${repeating.value ? 'repeating-' : ''}radial-gradient(  ${stopsAsString.value}) `
    };
  } else {
    return {
      background: `${repeating.value ? 'repeating-' : ''}conic-gradient( ${stopsAsStringConic.value} )`
    };
  }
});

interface stop {
  pos: Number
  colour: String
}

const stopsAsString = computed(() => {
  return stops.value.map(stop => ` ${stop.colour} ${stop.pos}%`);
});


const stopsAsStringConic = computed(() => {
  return stops.value.map(stop => ` ${stop.colour} ${stop.pos * 3.6}deg `);
});

</script>

<script lang="ts">

export const mode = ref<string>('linear')
export const lastCopied = ref("")
export const notificationVisible = ref(false)

const presetColours = [
  "#b3ff80", '#d36fc5', '#bef3fe', '#c79adf', '#f9b4c5', '#f9edb4', '#e2bcfb', '#7f6fd3', '#b6f7b5', '#b6d7f7', '#1c8cfd'
]


export const stops = ref([
  {
    colour: getRandColour(),
    pos: 0,
  },
  {
    colour: getRandColour(),
    pos: 50,
  },
  {
    colour: getRandColour(),
    pos: 100,
  }
])

function getRandColour() {
  return presetColours[Math.round(Math.random() * 10)]
}

export function copy(x) {
  console.log(x)
  navigator.clipboard.writeText(x);
  notificationVisible.value = true
  lastCopied.value = x
  setTimeout(() => {
    notificationVisible.value = false
  }, 1500);
}

export function removeStop(stop: stop) {
  const index = stops.value.findIndex((e) => e.colour === stop.colour);
  if (index !== -1) {
    stops.value.splice(index, 1);
  }
}

export function addStop() {
  const newStop: stop = {
    colour: getRandColour(),
    pos: 75
  }
  stops.value.push(newStop)
}

</script>

<template>


  <div class="h-full min-h-screen px-2 pb-8 font-sans font-bold md:pt-2 md:px-0 frame" :style="styleObject">

    <AppHeader />

    <main
      class="px-2 pb-2 mx-auto font-sans font-bold bg-white border-b border-black rounded-bl-8 xl:max-w-screen-xl border-x shadow-main ">

      <div class="sticky top-0 z-50 bg-white">

        <PreviewPanel :styleObject />

        <CodePanel :styleObject />

      </div>


      <div id="ui-panel" class="flex flex-col items-stretch mb-4 bg-white border-black md:flex-row">

        <div class="top-0 z-20 flex flex-col order-last w-full md:order-1">
          <div class="px-4 pb-4 border-8 border-black border-solid ">
            <div :class="mode === 'conic' ? 'opacity-50 pointer-events-none' : ''">
              <p class="py-4 mb-12 ">
                Angle
              </p>
              <Slider showTooltip="'focus'" class="slider" v-model="angle" :max="360" :lazy="false" />
            </div>
          </div>

          <div class="flex flex-col px-4 py-8 mb-0 space-y-8 border-b-8 border-black border-solid border-x-8">

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

            <ModeButtons />

          </div>
          <p class="mt-4 text-xs text-right"> &copy; MD {{ new Date().getFullYear() }} </p>
        </div>

        <StopList />

      </div>
    </main>
    <NotificationArea />
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

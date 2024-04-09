<script setup lang="ts">

import { ref, computed, watch, onMounted } from 'vue';
import { useGradientStore } from '@/stores/GradientStore.ts'


const gs = useGradientStore();

console.log(gs)

import Slider from '@vueform/slider'

const repeating = ref(false)

const mode = ref<string>('linear')

const midpoint = ref(33)

const startColour = ref("#bef3fe")

const endColour = ref("#b3ff80")

const angle = ref(145)

const notificationVisible = ref(false)

const lastCopied = ref("")

const presetColours = [
  "#b3ff80", '#d36fc5', '#bef3fe', '#c79adf', '#f9b4c5', '#f9edb4', '#e2bcfb', '#7f6fd3', '#b6f7b5', '#b6d7f7', '#1c8cfd'
]

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

const stops = ref([
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


const stopsAsString = computed(() => {
  // format: 
  // linear-gradient(45deg, #fca 25%, #000 25%)
  return stops.value.map(stop => ` ${stop.colour} ${stop.pos}%`);
});


const stopsAsStringConic = computed(() => {
  // format: 
  // linear-gradient(45deg, #fca 25%, #000 25%)
  return stops.value.map(stop => ` ${stop.colour} ${stop.pos * 3.6}deg `);
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


function getRandColour() {
  return presetColours[Math.round(Math.random() * 10)]
}

onMounted(() => {
  const randStart = getRandColour
  const randEnd = getRandColour
  startColour.value = randStart
  endColour.value = randEnd

})


function removeStop(stop) {
  const index = stops.value.findIndex((e) => e.colour === stop.colour);
  if (index !== -1) {
    stops.value.splice(index, 1);
  }
}

function addStop() {
  const newStop: stop = {
    colour: getRandColour(),
    pos: 75
  }
  stops.value.push(newStop)
}

</script>

<template>


  <div class="h-full min-h-screen px-2 pb-8 font-sans font-bold md:pt-2 md:px-0 frame" :style="styleObject">
    <header
      class="p-4 mx-auto pt-2 md:mt-8 font-sans font-black   xl:tracking-[20px] tracking-widest text-center text-black uppercase bg-white border-t border-black width border-x text-x xl:max-w-screen-xl shadow-main lg:text-2xl">
      Gradient
      Generator
    </header>
    <main
      class="px-2 pb-2 mx-auto font-sans font-bold bg-white border-b border-black rounded-bl-8 xl:max-w-screen-xl border-x shadow-main ">

      <div class="sticky top-0 z-50 bg-white">
        <div id="preview" :style="styleObject" class="border border-8 border-black ">
          <div class="relative z-20 ">
            <button @click="copy(styleObject)"
              class="absolute right-0 mr-2 md:mr-5 ml-auto left-auto mt-[-10px] md:mt-4 md:w-[120px] copy-button"
              v-text="'Copy CSS'" />
          </div>
        </div>

        <div v-text="styleObject" id="code"
          class="p-4 font-mono text-xs font-normal text-white bg-gray-900 border-white border-solid sm:text-base border-y-8">

        </div>


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
            <div class="flex flex-row justify-between p-4 space-x-4 border-8 border-black ">
              <button @click="mode = 'linear'" class="mode-button" :class="mode == 'linear' ? 'active' : ''">

                <span>Linear</span>

              </button>
              <button @click="mode = 'radial'" class="mode-button" :class="mode == 'radial' ? 'active' : ''">

                <span>Radial</span>

              </button>
              <button @click="mode = 'conic'" class="mode-button" :class="mode == 'conic' ? 'active' : ''">

                <span>Conic</span>

              </button>
            </div>
          </div>
          <p class="mt-4 text-xs text-right"> &copy; MD {{ new Date().getFullYear() }} </p>
        </div>

        <div class="flex flex-col w-full px-4 mb-4 border-8 border-black md:mr-4">
          <div v-for="stop in  stops" :key="stop.colour" class="relative py-1 overflow-hidden group">

            <div class="relative h-[200px] w-full">
              <input v-model="stop.colour" type="color" class="colorPicker" />
            </div>

            <div class="p-4">
              <Slider showTooltip="'focus'" v-model="stop.pos" :max="100" :lazy="false" />
            </div>

            <button @click="copy(stop.colour)" class="copy-button left-[-25%] group-hover:left-4" v-text="stop.colour">
            </button>

            <button v-if="stops.length >= 1" @click="removeStop(stop)"
              class="remove-button   right-[-15%] group-hover:right-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

            </button>

          </div>

          <button @click="addStop(stop)" class="add-button">Add Stop
          </button>

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

.copy-button {
  @apply absolute z-30 p-2 border border-black border-solid bg-white rounded-lg top-4 hover:bg-black hover:text-white transition-all;
}

.copy-button:not(:active) {
  @apply shadow-button;
}

button {
  transition: all;
  @apply text-xs md:text-base
}

button:active {
  @apply translate-y-[3px];
  box-shadow: unset;
}


.add-button {
  @apply border border-black py-2 shadow-base my-4 border-solid bg-black rounded-lg left-4 top-4 hover:bg-white hover:text-black text-white transition-all;
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, .5)
}

.mode-button {
  @apply border p-4 w-full shadow-base border-black border-solid bg-white rounded-lg left-4 top-4 hover:bg-black hover:text-white transition-all
}

.mode-button.active {
  @apply bg-black text-white;
  box-shadow: 4px 4px 0 0 rgba(0, 0, 0, .5)
}

.remove-button {
  @apply top-4 bg-white p-1 border border-black shadow-base rounded-lg absolute transition-all
}
</style>

<style src="@vueform/slider/themes/default.css"></style>

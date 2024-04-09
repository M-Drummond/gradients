<script setup lang="ts">

import { useGradientStore } from '@/stores/GradientStore';

const gs = useGradientStore();
const stops = gs.stops
const addStop = gs.addStop
const removeStop = gs.removeStop

import Slider from '@vueform/slider'
import { copy } from '../App.vue'



</script>


<template>
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

</template>


<style scoped></style>

<script setup lang="ts">
import { mode } from '@/App.vue'

</script>

<script lang="ts">

</script>

<template>
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

</template>
<style scoped></style>

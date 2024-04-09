<script setup lang="ts">

defineProps({
    styleObject: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div v-text="styleObject" id="code"
        class="p-4 font-mono text-xs font-normal text-white bg-gray-900 border-white border-solid sm:text-base border-y-8">

    </div>

</template>
<script setup lang="ts">
defineProps<{ flag?: string, showIcon?: boolean }>()
</script>

<template>
  <span v-if="showIcon" :class="flag ? `bg-red-700`: `bg-green-700`"
        class="inline-block w-20 h-[12px] rounded-none mr-1"></span>
  <span>{{ flag }}</span>
</template>

<style scoped>

</style>

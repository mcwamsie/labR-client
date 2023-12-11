<script lang="ts" setup>
import {mdiAlertOutline} from "@mdi/js";

defineProps({
  error: {
    type: [String, Array],
    required: true
  }
})
</script>

<template>
  <div class="bg-red-200 border-red-700 border text-red-700 p-4 mb-6 flex items-center gap-3">
    <svg-icon
        :path="mdiAlertOutline"
        :size="24"
        type="mdi"
    />
    <div class="flex flex-col gap-0">
      <span class="font-black">Error:</span>
      <span>
        {{ typeof error === 'string' ? error : error.join(" ") }}
      </span>
    </div>

  </div>
</template>

<style scoped>

</style>

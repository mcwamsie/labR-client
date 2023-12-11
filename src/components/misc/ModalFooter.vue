<script lang="ts" setup>

import {mdiSync} from "@mdi/js";

defineProps<{ submitting: boolean, disabled?: boolean }>()

</script>

<template>
  <div class="px-4 flex justify-end py-3 items-center border-t-[1px] border-[#dee2e6] border-solid">
    <slot name="default">
      <button
          :disabled="submitting || disabled"
          class="w-[150px] flex justify-center disabled:opacity-80 disabled:cursor-progress disabled:bg-gray-500 items-center h-[40px] bg-primary text-[14px] text-white font-bold focus:bg-blue-700">
        <span v-if="!submitting" class="font-bold">Submit</span>
        <svg-icon
            v-else
            :path="mdiSync"
            :size="14"
            class="animate-spin"
            type="mdi"
        />
      </button>
    </slot>
  </div>
</template>

<style scoped>

</style>

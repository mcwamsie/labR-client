<script lang="ts" setup>
import {computed} from "vue";

const emit = defineEmits(["close", "submit"])
const props = defineProps<{ title: string, open: boolean, fullScreen?: boolean }>()

const cssClass = computed(() => {
  let classes = ""
  if (props.open) classes += " open"
  if (props.fullScreen) classes += " full-screen"
  return classes
})
</script>

<template>
  <form :class="cssClass" class="modal" novalidate @submit.prevent="emit('submit')">
    <slot name="header">
      <div class="px-4 py-2 flex justify-between items-center border-b-[1px] border-[#dee2e6] border-solid">
        <h4 class="text-[18px] font-bold">{{ title }}</h4>
        <button aria-label="Close" class="text-2xl px-2" type="button" @click="emit('close')">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </slot>
    <div class="p-4 flex flex-col flex-grow max-h-full overflow-hidden">
      <div class="flex-grow flex flex-col max-h-full overflow-x-auto pr-3">
        <slot name="default"/>
      </div>
    </div>
    <slot name="footer"></slot>
  </form>
  <div :class="open ? 'show': ''" class="modal-backdrop"/>
</template>

<style scoped>

</style>

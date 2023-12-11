<script lang="ts" setup>
import {CardItem} from "@/models/homepage.model.ts";

defineProps<{ cardItem: CardItem }>()
</script>

<template>
  <div class="bg-white border-solid border-neutral-100 p-2 flex border-[1px]">
    <div :class="cardItem.background" class="flex-grow flex items-center gap-3 p-2">
      <div class="w-40 h-40 rounded bg-white flex items-center justify-center">
        <svg-icon :class="cardItem.iconColor" :path="cardItem.icon" :size="20"/>
      </div>
      <div class="flex flex-col flex-grow">
        <h6 :class="cardItem.textColor" class="font-bold text-[12px]">{{ cardItem.count }} {{ cardItem.title }}</h6>
        <span class="text-neutral-800 text-[10px] font-[500]">{{ cardItem.description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

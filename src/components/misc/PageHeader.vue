<script setup lang="ts">

defineProps({
  icon: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  subHeading: {
    type: String,
    required: true
  },

})
</script>

<template>
  <div class="w-full bg-white flex p-3 gap-3">
    <div
        class="flex items-center border-solid border-primary border-[3px] justify-center rounded-full p-[3px] w-[48px] h-[48px] ">
      <div class="w-full h-full bg-slate-800 flex rounded-full items-center justify-center text-white">
        <svg-icon type="mdi" :path="icon" :size="20"/>
      </div>
    </div>
    <div class="flex flex-col">
      <h6 class="font-bold text-[16px] mb-0">{{ heading }}</h6>
      <p class="opacity-70 text-[12px]">{{ subHeading }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>

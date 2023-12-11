<script setup lang="ts">

import {mdiGamepadCircle} from "@mdi/js";
</script>

<template>
  <div class="flex bg-white flex-col gap-4 flex-grow w-full text-slate-500 items-center justify-center">
    <svg-icon :path="mdiGamepadCircle" class="animate-spin text-primary" size="48"/>
    <span class="font-bold">Loading Please Wait....</span>
  </div>
</template>

<style scoped>

</style>

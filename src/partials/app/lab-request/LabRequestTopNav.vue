<script lang="ts" setup>
import {mdiChevronLeft} from "@mdi/js";
</script>

<template>
  <div class="w-full min-h-[40px] bg-white shadow px-4">
    <ul class="flex h-full gap-4">
      <li class="h-full">
        <router-link class="h-full flex items-center gap-[2px] cursor-pointer text-primary font-bold"
                     to="/app/requests">
          <svg-icon :path="mdiChevronLeft" :size="16" type="mdi"/>
          <span class="text-[12px] font-bold">All Requests</span>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<style scoped>

</style>

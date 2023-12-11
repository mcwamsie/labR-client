<script lang="ts" setup>

import RequestDetailsCard from "@/partials/app/lab-request/RequestDetailsCard.vue";
import RequestedTestsCard from "@/partials/app/lab-request/RequestedTestsCard.vue";
</script>

<template>
  <div class="w-[280px] min-w-[280px] gap-4 flex flex-col max-h-full overflow-hidden">
    <request-details-card/>
    <requested-tests-card/>
  </div>
</template>

<style scoped>

</style>

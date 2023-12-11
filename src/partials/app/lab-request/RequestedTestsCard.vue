<script lang="ts" setup>

import {useStore} from "vuex";
import {LabRequest} from "@/models/labRequest.model.ts";
import {computed, ComputedRef} from "vue";
import RequestTestList from "@/partials/app/lab-request/RequestTestList.vue";


const store = useStore()
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])

</script>

<template>
  <div class="bg-white flex-col flex-grow flex max-h-full overflow-hidden">
    <div class="border-b-[1px] text-[14px] font-bold border-[#dee2e6] border-solid px-4 py-2">
      Requested Tests
    </div>
    <div class="p-4 flex-grow max-h-full overflow-hidden">
      <request-test-list
          :tests="record.requestedTests"
      />
    </div>
  </div>
</template>

<style scoped>

</style>

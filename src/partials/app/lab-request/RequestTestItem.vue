<script lang="ts" setup>

import {mdiCheckboxMarkedCircle, mdiCheckboxMarkedCircleOutline} from "@mdi/js";
import {TestPanel} from "@/models/test_panel.model.ts";
import {useStore} from "vuex";

defineProps<{ test: TestPanel, active: boolean }>()

const store = useStore()
const handleSelectActive = (item: TestPanel) => {
  store.commit("labRequest/setRequestActive", item)
}
</script>

<template>
  <li>
    <button
        :class="active ? 'text-primary': 'text-slate-500'"
        :disabled="active"
        class="flex gap-4 items-center pb-2 border-b-[1px] transition-all font-bold border-[#dee2e6] border-solid w-full"
        @click="handleSelectActive(test)"
    >
      <div :class="active ? 'bg-primary': 'bg-slate-200'"
           class="w-40 h-40 rounded-full flex items-center justify-center  transition-all">
        <svg-icon v-if="active" :path="mdiCheckboxMarkedCircle" :size="20" class="text-white"/>
        <svg-icon v-else :path="mdiCheckboxMarkedCircleOutline" :size="20" class="text-slate-500"/>
      </div>
      <div class="flex items-start flex-col gap-0">
        <h6 class="font-bold text-[12px] text-left line-clamp-1">
          {{ test.name }}
        </h6>
        <p class="font-bold text-[11px]">
          {{ test.specimen.name }}
        </p>
      </div>
    </button>

  </li>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import {getAgeStr, getSex, titleCase} from "@/lib.ts";

defineProps<{ name: string, sex: string, dateOfBirth: string }>()


</script>

<template>
  <div class="flex items-start mb-4 pb-4 gap-3 border-b-[1px] border-[#dee2e6] border-solid">
    <img alt="Patient Photo" class="w-[56px] h-[56px] rounded-full" src="/images/default.png"/>
    <div class="flex flex-col">
      <h6 class="font-bold text-[16px]">
        {{ name }}
      </h6>
      <h6 class="font-bold">
        {{ titleCase(getSex(sex)) }},
        {{ titleCase(getAgeStr(dateOfBirth)) }}
      </h6>
    </div>
  </div>
</template>

<style scoped>

</style>

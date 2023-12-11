<script lang="ts" setup>

import {
  mdiAccountInjuryOutline,
  mdiCakeVariantOutline,
  mdiCheckboxMarkedCircleOutline,
  mdiClockOutline,
  mdiGenderMaleFemale,
  mdiPrinterOutline,
  mdiViewSequentialOutline
} from "@mdi/js";
import {formatDate, getAgeStr, getSex, titleCase} from "@/lib.ts";
import {useStore} from "vuex";
import {LabRequest} from "@/models/labRequest.model.ts";
import {computed, ComputedRef} from "vue";
import {AuthUser} from "@/models/auth.models.ts";

const store = useStore()
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])
const user: ComputedRef<AuthUser> = computed(() => store.getters["auth/user"])

const handleShow = () => {
  store.dispatch("labRequest/setApproveModalOpen", true)
}
</script>

<template>
  <div class="bg-white flex flex-wrap gap-2 p-4">
      <span class="flex items-center gap-1 w-full">
        <svg-icon :path="mdiAccountInjuryOutline" :size="16"/>
        <span class="capitalize text-[13px] font-bold">
          {{ `${titleCase(record.patient.lastName)} ${titleCase(record.patient.firstName)}` }}
        </span>
      </span>
    <span class="flex items-center gap-1 w-full">
        <svg-icon :path="mdiCakeVariantOutline" :size="10"/>
        <span class="capitalize text-[12px]">{{ titleCase(getAgeStr(record.patient.dateOfBirth)) }}</span>
      </span>
    <span class="flex items-center gap-1">
        <svg-icon :path="mdiGenderMaleFemale" :size="10"/>
        <span class="capitalize  text-[12px]">{{ titleCase(getSex(record.patient.sex)) }}</span>
      </span>


    <span class="flex items-center gap-1">
        <svg-icon :path="mdiViewSequentialOutline" :size="10"/>
        <span class="uppercase  text-[12px]">#{{ record.number }}</span>
      </span>

    <span class="flex items-center gap-1">
        <svg-icon :path="mdiClockOutline" :size="10"/>
        <span class=" text-[12px]">
          {{ titleCase(formatDate(record.createdAt)) }}
        </span>
      </span>
    <span class="flex w-full flex-col items-start">
      <span class="font-bold  text-[12px]">Clinical Data:</span>
    <span class="capitalize  text-[12px] w-full line-clamp-2 whitespace-pre-wrap">
        {{ record.clinicalData }}
      </span>
    </span>
    <div class="border-t-[1px] border-[#dee2e6] border-solid pt-2 w-full">
      <button
          :disabled="!(record.status == 'waiting approval' || record.status === 'approved' || record.status === 'collected' ) "
          class="h-[40px] w-full text-[14px] disabled:opacity-80 disabled:bg-gray-500 disabled:cursor-progress focus:bg-blue-700 bg-primary text-white gap-2 flex items-center justify-center"
          type="button"
          @click="handleShow"
      >
        <template v-if="record.status == 'approved' || record.status === 'collected'">
          <svg-icon :path="mdiPrinterOutline" :size="20"/>
          <span>Print</span>
        </template>
        <template v-else>
          <svg-icon :path="mdiCheckboxMarkedCircleOutline" :size="20"/>
          <span>Approve</span>
        </template>

      </button>
    </div>

  </div>
</template>

<style scoped>

</style>

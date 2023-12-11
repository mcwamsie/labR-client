<script lang="ts" setup>

import {formatDate, getAgeStr, getSex, titleCase, uppercase} from "@/lib.ts";
import {LabRequest} from "@/models/labRequest.model.ts";

defineProps<{ record: LabRequest }>()
</script>

<template>

  <div class="flex flex-col text-[13px]  mb-6">
    <div class="grid grid-cols-2 gap-1 justify-center">
      <span>
        <span class="font-bold mr-2">Patient Name:</span>
        <span>{{ titleCase(record.patient.firstName) }} {{ titleCase(record.patient.lastName) }}</span>
      </span>
      <span>
        <span class="font-bold mr-2">Ref Doctor:</span>
        <span>{{ uppercase(record.referredFrom.name) }}</span>
      </span>
      <span>
        <span class="font-bold mr-2">Gender:</span>
        <span>{{ getSex(record.patient.sex) }}</span>
      </span>
      <span>
                <span class="font-bold mr-2">Reporting Time:</span>
                <span>{{ formatDate(record.updatedAt, "DD/MM/YYYY HH:mm") }}</span>
              </span>

      <span>
        <span class="font-bold mr-2">DOB (Age):</span>
        <span> {{ formatDate(record.patient.dateOfBirth, "DD/MM/YYYY") }} ({{
            getAgeStr(record.patient.dateOfBirth)
          }})</span>
      </span>
      <span>
        <span class="font-bold mr-2">Collection Time:</span>
        <span>{{ formatDate(record.collectionTime, "DD/MM/YYYY HH:mm") }}</span>
      </span>

      <span>
                <span class="font-bold mr-2">ID Number/ Passport No.:</span>
                <span>{{ uppercase(record.patient.idNumber) }}</span>
              </span>
      <span>
                <span class="font-bold mr-2">Request Ref:</span>
                <span>#{{ record.number }}</span>
              </span>
    </div>
  </div>

  <div class="border-b-[1px] mb-6 border-t-[1px] py-4 border-solid border-black">
    <span class="font-bold">Requested Tests:</span> {{ record.requestedTests.map((i) => (i.name)).join(", ") }}
  </div>
</template>

<style scoped>

</style>

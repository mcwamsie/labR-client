<script lang="ts" setup>

import {formatDate, titleCase} from "@/lib.ts";
import EmptyRows from "@/components/misc/EmptyRows.vue";
import {useStore} from "vuex";
import {computed, ComputedRef} from "vue";
import {PaginatedLabRequests} from "@/models/labRequest.model.ts";
import sweetAlert from "@/sweetAlert.ts";

const store = useStore()
const data: ComputedRef<PaginatedLabRequests> = computed(() => store.getters["labRequest/labRequests"])

const handlePrint = async (recordId: string) => {
  await store.dispatch("labRequest/setApproveModalOpen", true)
  await store.dispatch("labRequest/getRequest", recordId)
}
const handleCollect = async (recordId: string) => {
  let willConfirm = await sweetAlert.willSubmit("Are you sure that these results are collected")

  if (willConfirm.isConfirmed) {
    await store.dispatch("labRequest/collectResult", recordId)
    await store.dispatch("labRequest/getRequests", {page: 1, limit: 20, pending: 1})
  }

}
</script>

<template>
  <div class="data-table striped">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>#</th>
        <th>Collection Time</th>
        <th>Name</th>
        <th>Tests Required</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="labRequest of data.results">
        <td class="w-[50px]">
          <button :disabled="labRequest.status !== 'approved'"
                  class="ml-2 mr-5 text-primary disabled:text-gray-500 font-bold"
                  @click="handlePrint(labRequest.id)">
            Print
          </button>
          <button :disabled="labRequest.status !== 'approved'"
                  class="ml-2 mr-5 text-primary disabled:text-gray-500 font-bold"
                  @click="handleCollect(labRequest.id)">
            Set To Collected
          </button>
        </td>
        <td class="text-right">
          {{ labRequest.number }}
        </td>
        <td class="text-right">
          {{ formatDate(labRequest.collectionTime, "DD/MM/YYYY HH:mm") }}
        </td>
        <td>
          {{ titleCase(labRequest.patient.lastName) }} {{ titleCase(labRequest.patient.firstName) }}
        </td>
        <td class="!whitespace-pre-wrap min-w-[240px]">
          {{ labRequest.requestedTests.map((item) => (item.name)).join(", ") }}
        </td>
        <td>
          {{ titleCase(labRequest.status) }}
        </td>
      </tr>
      <empty-rows
          v-if="data.results.length < 16"
          :col-span="6"
          :size="16 - data.results.length"
      />
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>

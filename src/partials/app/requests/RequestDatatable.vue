<script lang="ts" setup>

import {useStore} from "vuex";
import {computed, ComputedRef} from "vue";
import {PaginatedLabRequests} from "@/models/labRequest.model.ts";
import EmptyRows from "@/components/misc/EmptyRows.vue";
import {formatDate, titleCase, uppercase} from "@/lib.ts";

const store = useStore()
const data: ComputedRef<PaginatedLabRequests> = computed(() => store.getters["labRequest/labRequests"])

</script>

<template>
  <div class="data-table striped">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>#</th>
        <th>Date</th>
        <th>Collection Time</th>
        <th>Name</th>
        <th>Tests Required</th>
        <th>Status</th>
        <th>Referring Provider</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="labRequest of data.results">
        <td class="w-[50px]">
          <router-link
              :to="`/app/requests/record/${labRequest.id}`"
              class="ml-2 mr-5 text-primary font-bold"
          >
            Record
          </router-link>
        </td>
        <td class="text-right">
          {{ labRequest.number }}
        </td>
        <td class="text-right">
          {{ formatDate(labRequest.createdAt, "DD/MM/YYYY HH:mm") }}
        </td>
        <td class="text-right">
          {{ formatDate(labRequest.collectionTime, "DD/MM/YYYY HH:mm") }}
        </td>
        <td>
          {{ titleCase(labRequest.patient.lastName) }} {{ titleCase(labRequest.patient.firstName) }}
        </td>
        <td class="!whitespace-pre-wrap">
          {{ labRequest.requestedTests.map((item) => (item.name)).join(", ") }}
        </td>
        <td>
          {{ titleCase(labRequest.status) }}
        </td>
        <td class="!whitespace-pre-wrap">
          {{ uppercase(labRequest.referredFrom.name) }}
        </td>

      </tr>
      <empty-rows
          v-if="data.results.length < 20"
          :col-span="8"
          :size="20 - data.results.length"
      />
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import AppLayout from "@/layout/AppLayout.vue";
import {
  mdiAccountGroupOutline,
  mdiCalendarClockOutline,
  mdiCalendarSyncOutline,
  mdiHomeOutline,
  mdiTestTube
} from "@mdi/js";
import PageHeader from "@/components/misc/PageHeader.vue";
import {computed, ComputedRef, onMounted, Ref, ref} from "vue";
import HomeCardItem from "@/partials/app/homepage/HomeCardItem.vue";
import {CardItem} from "@/models/homepage.model.ts";
import {useStore} from "vuex";
import DatatableLoading from "@/components/datatable/DatatableLoading.vue";
import HomePendingDatatable from "@/partials/app/homepage/HomePendingDatatable.vue";
import ApproveRequestModal from "@/partials/app/lab-request/ApproveRequestModal.vue";
import {LabRequest} from "@/models/labRequest.model.ts";
import {Chart} from "@/models/misc.models.ts";


const store = useStore()
const loading: ComputedRef<boolean> = computed(() => store.getters["labRequest/loading"])
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])
const chart: ComputedRef<Chart> = computed(() => store.getters["misc/chart"])
const cardItems: Ref<CardItem[]> = ref([
  {
    count: chart.value.patients,
    title: "Patients",
    description: "Patients registered here",
    background: "bg-emerald-50",
    textColor: "text-emerald-700",
    icon: mdiAccountGroupOutline,
    iconColor: "text-emerald-700",
  },
  {
    count: chart.value.tests,
    title: "Tests",
    description: "Tests being done here",
    background: "bg-blue-50",
    textColor: "text-blue-700",
    icon: mdiTestTube,
    iconColor: "text-blue-700",
  },
  {
    count: 2,
    title: "Requests",
    description: "Requests being processed here",
    background: "bg-yellow-50",
    textColor: "text-yellow-700",
    icon: mdiCalendarSyncOutline,
    iconColor: "text-yellow-700",
  },
  {
    count: 2,
    title: "Overdue Requests",
    description: "Requests being overdue",
    background: "bg-red-50",
    textColor: "text-red-700",
    icon: mdiCalendarClockOutline,
    iconColor: "text-red-700",
  },
])


onMounted(async () => {
  await store.dispatch("labRequest/getRequests", {page: 1, limit: 20, pending: 1})
  await store.dispatch("misc/getChart")
})
</script>

<template>
  <app-layout>
    <template v-slot:body>
      <div class="p-4 flex flex-col flex-grow gap-4 max-h-full overflow-x-hidden overflow-y-auto">
        <page-header
            :icon="mdiHomeOutline"
            heading="Homepage"
            sub-heading="Overview"
        />
        <datatable-loading v-if="loading"/>
        <template v-else>
          <div class="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <home-card-item
                v-for="cardItem of cardItems"
                :card-item="cardItem"
            />
          </div>
          <div class="grid grid-cols-8 lg:overflow-hidden max-h-full flex-grow gap-4">
            <div class="bg-white flex flex-col col-span-8 lg:col-span-8 min-h-[240px] max-h-[300px] lg:max-h-full">
              <div class="px-2 font-bold py-2 border-b-[1px] border-solid border-b-[#dee2e6]">
                Pending Requests
              </div>
              <div class="p-2 flex flex-grow max-h-full overflow-hidden">
                <home-pending-datatable/>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-slot:modal>
      <approve-request-modal v-if="record"/>
    </template>
  </app-layout>

</template>

<style scoped>

</style>

<script lang="ts" setup>

import PatientListTopNav from "@/partials/app/patient-list/PatientListTopNav.vue";
import AppLayout from "@/layout/AppLayout.vue";
import PageHeader from "@/components/misc/PageHeader.vue";
import {mdiAccountGroup} from "@mdi/js";
import PatientModal from "@/partials/app/patient-list/PatientModal.vue";
import {computed, ComputedRef, onMounted, Ref, ref, UnwrapRef} from "vue";
import {useStore} from "vuex";
import PatientDatatable from "@/partials/app/patient-list/PatientDatatable.vue";
import DatatableFilter from "@/components/datatable/DatatableFilter.vue";
import DatatableLoading from "@/components/datatable/DatatableLoading.vue";
import DatatableFooter from "@/components/datatable/DatatableFooter.vue";
import {PaginatedPatients} from "@/models/patient.model.ts";
import RequestModal from "@/partials/app/requests/RequestModal.vue";

const searchTerm = ref("")
const page: Ref<UnwrapRef<number | string>> = ref(1)
const limit: Ref<UnwrapRef<number | string>> = ref(16)
const store = useStore()

const data: ComputedRef<PaginatedPatients> = computed(() => store.getters["patients/patients"])
const loading: ComputedRef<number> = computed(() => store.getters["patients/loading"] | store.getters["parameters/testPanels"])
onMounted(async () => {
  //await store.dispatch("patients/setRequestModalOpen", true)
  await getData()

  await store.dispatch("parameters/getTestPanels", {page: 1, limit: 9999})
})
const getData = async () => {
  await store.dispatch("patients/getPatients", {page: page.value, limit: limit.value, searchQuery: searchTerm.value})
}
const handleSearch = () => {
  if (searchTerm.value) {
    page.value = 1
    getData()
  }
}
const handleChangeLimit = async (value: number) => {
  page.value = 1
  limit.value = value
  await getData()
}

const handleChangePage = async (value: number) => {
  page.value = value
  await getData()
}
const handleReset = async () => {
  searchTerm.value = ""
  page.value = 1
  await getData()
}
</script>

<template>
  <app-layout>
    <template v-slot:body>
      <patient-list-top-nav/>
      <div class="p-4 flex flex-col flex-grow gap-4 max-h-full overflow-hidden">
        <page-header
            :icon="mdiAccountGroup"
            heading="Patient List"
            sub-heading="A list of all patients"
        />
        <div class="flex flex-col items-end max-h-full overflow-hidden flex-grow bg-white p-3">
          <datatable-loading v-if="loading"/>
          <template v-else>
            <datatable-filter
                v-model="searchTerm"
                @refresh="handleReset"
                @search="handleSearch"
            />
            <patient-datatable/>
            <datatable-footer
                :count="data.count"
                :filtered-count="data.results.length"
                :limit="limit"
                :next="data.next"
                :page="page"
                :previous="data.previous"
                @next="handleChangePage(parseInt(<string>page)+1)"
                @previous="handleChangePage(parseInt(<string>page)-1)"
                @update:limit="handleChangeLimit"
            />
          </template>
        </div>
      </div>
    </template>
    <template v-slot:modal>
      <patient-modal :limit="limit"/>
      <request-modal/>
    </template>
  </app-layout>
</template>


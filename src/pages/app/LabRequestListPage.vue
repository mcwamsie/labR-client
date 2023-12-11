<script lang="ts" setup>

import AppLayout from "@/layout/AppLayout.vue";
import {mdiTestTube} from "@mdi/js";
import PageHeader from "@/components/misc/PageHeader.vue";
import DatatableLoading from "@/components/datatable/DatatableLoading.vue";
import {useStore} from "vuex";
import {computed, ComputedRef, onMounted, Ref, ref, UnwrapRef} from "vue";
import DatatableFilter from "@/components/datatable/DatatableFilter.vue";
import DatatableFooter from "@/components/datatable/DatatableFooter.vue";
import {PaginatedLabRequests} from "@/models/labRequest.model.ts";
import RequestDatatable from "@/partials/app/requests/RequestDatatable.vue";

const searchTerm: Ref<UnwrapRef<string>> = ref("")
const page: Ref<UnwrapRef<number | string>> = ref(1)
const limit: Ref<UnwrapRef<number | string>> = ref(16)


const store = useStore()
const loading = computed(() => store.getters["labRequest/loading"])
const data: ComputedRef<PaginatedLabRequests> = computed(() => store.getters["labRequest/labRequests"])
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

const getData = async () => {
  await store.dispatch("labRequest/getRequests", {page: page.value, limit: limit.value, searchQuery: searchTerm.value})
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <app-layout>
    <template v-slot:body>
      <div class="p-4 flex flex-col flex-grow gap-4 max-h-full overflow-hidden ">
        <page-header
            :icon="mdiTestTube"
            heading="Lab Requests"
            sub-heading="Overview"
        />
        <div class="flex flex-col items-end max-h-full overflow-hidden flex-grow bg-white p-3">
          <datatable-loading v-if="loading"/>
          <template v-else>
            <datatable-filter
                v-model="searchTerm"
                @refresh="handleReset"
                @search="handleSearch"
            />
            <request-datatable/>
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

    </template>
  </app-layout>
</template>

<style scoped>

</style>

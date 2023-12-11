<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, ComputedRef, Ref, ref, UnwrapRef} from "vue";
import TextAreaInput from "@/components/form/TextAreaInput.vue";
import {handleErrors, titleCase} from "@/lib.ts";
import SearchSelect from "@/components/form/SearchSelect.vue";
import AsynchSearchSelect from "@/components/form/AsynchSearchSelect.vue";
import serviceProviderService from "@/services/service-provider.service.ts";
import {PaginatedServiceProvider} from "@/models/service_provider.model.ts";
import {SelectOptions} from "@/models/misc.models.ts";
import {LabRequestFormErrors} from "@/models/labRequest.model.ts";

defineProps({
  form: {
    type: Object,
    required: true
  }
})
const serviceProviderOptions: Ref<UnwrapRef<SelectOptions[]>> = ref([])


const store = useStore()

const errors: ComputedRef<LabRequestFormErrors> = computed(() => store.getters["labRequest/requestErrors"])

const requestedTestOptions: ComputedRef<SelectOptions[]> = computed(() => store.getters["parameters/testPanels"]
    .results.map((item) => ({
      id: item.id,
      text: titleCase(item.name)
    })))

const handleSearch = async (query: string) => {
  try {
    if (query.length < 3) {
      let response: PaginatedServiceProvider = await serviceProviderService.getServiceProviders(1, 999, query)
      serviceProviderOptions.value = response.results.map((i) => ({
        id: i.id,
        text: `${i.afhozNo}: ${i.name}`
      }))
    }

  } catch (e) {
    handleErrors(e)
  }

}

</script>

<template>
  <search-select
      id="requestedTests"
      v-model="form.requestedTests"
      :error="errors.requestedTests"
      :many="true"
      :options="requestedTestOptions"
      :required="true"
      label="Requested Tests"
      name="requestedTests"
  />
  <asynch-search-select
      id="requestedTests"
      v-model="form.referredFrom"
      :async-find="handleSearch"
      :error="errors.referredFrom"
      :many="false"
      :options="serviceProviderOptions"
      :required="true"
      label="Referred From"
      name="referredFrom"
  />
  <text-area-input
      id="clinicalData"
      v-model="form.clinicalData"
      :error="errors.clinicalData"
      :required="true"
      label="Clinical Data"
      name="nationalId"
  />
  <!--
  <pre><code>serviceProviderOptions:{{ serviceProviderOptions }}</code></pre>
  -->
</template>

<style scoped>

</style>
